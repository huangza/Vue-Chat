// 引入模块
var path = require('path')
var config = require('../config')
var utils = require('./utils')

// 获取项目的根目录，设为此文件的上级目录（绝对路径）
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  // webpack 编译任务的入口
  entry: {
    app: './src/main.js'
  },
  // 配置 webpack 的输出路径和命名规则
  output: {
    // 输出的目标文件夹路径（在 config/index.js 设置）
    path: config.build.assetsRoot,
    // webpack 编译输出后的发布路径
    // 如果要单独拿出 dist 目录发布的话，就要在这里修改
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // bundle 文件命名格式
    filename: '[name].js'
  },
  // 配置模块 resolve 的规则
  resolve: {
    // 自动 resolve 的扩展名
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    // 模块别名
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'store': path.resolve(__dirname, '../src/store')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  // 引入不同文件编译所需的加载器
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
