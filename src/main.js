import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './route-config'
import filters from './filters'
import App from './App'
import VueResouce from 'vue-resource'
import zepto from 'webpack-zepto'
import fastclick from 'fastclick'
// import store from 'vx/store'
require('assets/js/util.js')

// 安装模块
Vue.use(VueRouter)
Vue.use(VueResouce)

// 创建路由实例
const router = new VueRouter({
    hashbang:true,
    saveScrollPosition: true
})

// 使用路由表
// router.map(routerMap)
routerMap(router)

// 使用 fastclick 插件
fastclick.attach(document.body)

// 创建 vm 实例
const app = Vue.extend(App)

// 启动路由
router.start(app, 'app')

// 重定向
// router.redirect({
//     '/': '/chat'
// })
// router.afterEach(function({ from, to }) {
//     let fromPath = from.path || '/'
//     let toPath = to.path
//     let toPath_end = toPath.lastIndexOf('/')
//     let backPath = toPath.slice(0, toPath_end)
//     store.dispatch('BACK_PAGE', backPath)
// 	// console.log(store)
// })

// 过滤器
filters(Vue)

// 指令
Vue
.directive('focus', (el) => {
	console.log('focus',el)
	if (el && el.nodeType === '1') {
		el.focus()
	}
})

// 挂载到全局对象中
window.router = router
window.Vue = Vue
window.$ = zepto
window.log = console.log.bind(console)
