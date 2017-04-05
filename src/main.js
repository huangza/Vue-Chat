import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './route-config'
import App from './App'
import VueResouce from 'vue-resource'
import fastclick from 'fastclick'

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
    '*': '/chat'
})

// 自定义组件
/*Vue.directive('focus', {
	update (el, binding) {
		console.log(this)
		console.log('el: '+el, 'binding: '+binding)
		// if (el === true) {
		// 	this.focus()
		// }
	}
})*/
Vue.directive('focus', function(value) {
	console.log(this)
	console.log('value: ' + value)
})

// 挂载到全局对象中
window.router = router
window.Vue = Vue
