# 环境配置
```
// 先全局安装 vue-cli，才可以通过 cli 来构建项目
$ npm install -g vue-cli
// 由于一些原因，可能下载速度龟速，
// 可以使用淘宝镜像来安装
$ cnpm install -g vue-cli

// 创建一个基于 webpack 模版的新项目
// 命令：vue init <template-name> <project-name>
$ vue init webpack demo
// 注意：这个命令默认使用最新的 Vue2.0 版本，要使用 1.X 版本的话，命令应该为：
// vue init webpack#1.0 demo

// 进入项目根目录
$ cd demo

// 安装项目所需依赖（当然，之后可以自己继续补充安装其他包）
$ npm install

// 下面的命令可以开启服务器，检查是否成功配置
// 默认端口为8080
$ npm run dev
```
使用 Vue 来做应用，更多的就是做 SPA 应用。  
而既然是做 SPA 应用，那么前端路由和 AJAX 就是必须的。

所以还要再安装这两个模块
```
$ npm i --save-dev vue-router vue-resource
```

# Package.json 命令
在这个文件中有个 scripts 属性，定义了若干命令，供在命令行执行。
```
"scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js"
},
```
使用 "npm run dev" 就是执行 build/dev-server.js 文件；同理，build 命令就是执行 build.js。

# 项目目录
- build: 配置了 webpack 的基本配置、开发环境配置、生产环境配置
- config: 配置了路径端口值等等
- node_modules: 依赖的模块
- src: 放置组件和入口文件
- static: 放置静态资源文件
- index.html 项目入口文件
- [.babelrc] babel 的配置文件

## /build/
首先来看 build 路径下的文件
### build/dev-server.js
执行 dev 命令时，这个文件会被执行。这是用于开发环境的编译打包。在这个文件中，主要负责下列任务：
1. 引入相关模块和配置
2. 创建 express 服务器和 webpack 编译器
3. 配置中间件（包括：开发中间件 webpack-dev-middleware 和 热加载中间件 webpack-hot-middleware）
4. 挂载代理服务和中间件 proxyMiddleware
5. 配置静态资源
6. 启动服务器并监听端口

    （具体源码笔记在对应文件中，下同。 -o-）

### build/webpack.base.conf.js
在上面的 dev-server.js 文件中，不管是引用 webpack.dev.conf 还是 webpack.prod.conf 配置文件，它们都是依赖于这个基础配置。在这个文件中，主要完成下列任务：
1. 配置 webpack 编译入口
2. 配置 webpack 输出路径
3. 配置模块 resolve 规则
4. 配置不同类型的加载器的处理规则

---





















# 项目入口文件( main.js ) 及主模块( App.vue )
**main.js**
```
// 引入 Vue 和相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResouce from 'vue-resource'

// 引入路由表
import routeMap from './router'

// 引入主模块(最大的组件)
import App from './App'

// 安装模块
Vue.use(VueRouter)
Vue.use(VueResouce)

// 创建路由实例
const router = new VueRouter()

// 加载路由表
router.map(routeMap)

// 路由表外的访问地址都重定向到首页
router.redirect({
    '*': '/home'
})

// 把应用挂载到指定元素
router.start(App, '#app')
```
另外修改一下 **index.html**
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>demo</title>
    <link href="https://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <div id="app"><app></app></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
**App.vue**
```
<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><a v-link="'/home'">首页</a></li>
          <li><a v-link="'/contact'">通讯录</a></li>
          <li><a v-link="'/discover'">发现</a></li>
          <li><a v-link="'/me'">我</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>
```
在模版 template 中，这些 html 代码都是应用的公共部分，而对于路由不同而动态切换的部分，都在 \<router-view\> 里面。

# 各二级组件

## "首页" 组件
Home.vue:
```
<template>
    <div class="jumbotron">
        <h1>说点什么</h1>
        <p>
            <strong>
                <a v-link="{path:'/me'}">to Me</a>
            </strong>
        </p>
    </div>
</template>
<script>
export default {}
</script>

```

## "通讯录" 组件
Contact.vue:
```
<template>
    <ul>
        <li v-for="item in list"><a href="javascript:;">{{item.name}}</a></li>
    </ul>
</template>
<script>
export default {
    data () {
        return {
            list: [
                {
                    name: "asd"
                },
                {
                    name: "dsa"
                }
            ]
        }
    }
}
</script>

```
其中的 data(){} 写法是 ES6 的标准规定。

## "发现" 组件
Discover.vue:
```
<template>
    <h1>Discover</h1>
</template>
<script>
export default {}
</script>
```

## "我" 组件
Me.vue:
```
<template>
    <h1>Me</h1>
</template>
<script>
export default {}
</script>
```

# 路由表
router.js:
```
import Home from './components/Home'
import Contact from './components/Contact'
import Discover from './components/Discover'
import Me from './components/Me'

export default {
    '/home': {
        component: Home
    },
    '/contact': {
        component: Contact 
    },
    '/discover': {
        component: Discover
    },
    '/me': {
        component: Me
    }
}
```
配置好路由表之后，就会根据路径加载不同的组件。













