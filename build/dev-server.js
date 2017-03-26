// 引入模块
var path = require('path')
var express = require('express')
var webpack = require('webpack')

// 获取 Node 配置
var config = require('../config')

// 一个 express 中间件，用来将 http 请求代理到其他服务器上
// 例：localhost:8080/api/xxx  --->  localhost:2333/api/xxx
// 这里使用该插件可以将前端开发中涉及到的请求代理到 API 服务器上，方便与服务器对接 
var proxyMiddleware = require('http-proxy-middleware')

// 根据 Node 的环境来引入相应的 webpack 配置
// 如果 Node 环境是 testing 的话，引用 生产环境的配置
// 否则就引入开发环境的配置
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// dev server（也就是通过本命令开启的服务器）的端口号。
// 默认就是 config.dev.port，也就是 8080
var port = process.env.PORT || config.dev.port

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 定义 HTTP 代理表，以此代理到 API 服务器
var proxyTable = config.dev.proxyTable

// 创建一个 express 实例
var app = express()
// 根据指定的 webpack 配置文件来创建一个 compiler 对象
var compiler = webpack(webpackConfig)

// 引入 webpack-dev-middleware 中间件
// 通过它使用 compiler 对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给 express 使用之后即可访问这些编译后的产品文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

// 引入 webpack-hot-middleware，用于实现热重载功能的中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// 把 proxyTable 代理表中的代理请求配置挂载到 express 服务器
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  // 格式化options，例如将'www.example.com'变成{ target: 'www.example.com' }
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
// 匹配资源，如果不匹配就可以重定向到指定地址（结合 vue-router 来开发 SPA）
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 使用webpack开发中间件
// 即将webpack编译后输出到内存中的文件资源挂到express服务器上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 将热重载中间件挂在到express服务器上
app.use(hotMiddleware)

// serve pure static assets
// 静态资源的路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 启动 express 服务器并监听相应的端口
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
