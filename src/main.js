import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './route-config'
import App from './App'
import VueResouce from 'vue-resource'
import fastclick from 'fastclick'

Vue.use(VueRouter)

Vue.use(VueResouce)

const router = new VueRouter({
    hashbang:true,
    saveScrollPosition: true
})

router.map(routerMap)

fastclick.attach(document.body)

const app = Vue.extend(App)

router.start(app, 'app')

router.redirect({
    '*': '/chat'
})

window.router = router
window.Vue = Vue
