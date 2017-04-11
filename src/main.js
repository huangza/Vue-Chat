import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './route-config'
import App from './App'
import VueResouce from 'vue-resource'
import zepto from 'webpack-zepto'
import fastclick from 'fastclick'
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
router.map(routerMap)

// 使用 fastclick 插件
fastclick.attach(document.body)

// 创建 vm 实例
const app = Vue.extend(App)

// 启动路由
router.start(app, 'app')

// 重定向
router.redirect({
    '/': '/chat'
})

// 过滤器
Vue
.filter('msgFormat', (val, limit) => {
	if (!val) {
		return
	}
	if (util.typeof(limit) !== 'number') {
		limit = 99
	}
	if (val > limit) {
		val = limit + '+'
	} else if (val === 0) {
		val = ''
	}
	return val
})

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
