/*import Vue from 'vue'
import App from './App'

new Vue({
  el: 'body',
  components: { App }
})*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './route-config'
import App from './App'
import VueResouce from 'vue-resource'

Vue.use(VueRouter)

Vue.use(VueResouce)

const router = new VueRouter({
    hashbang:true,
    saveScrollPosition: true
})

router.map(routerMap)

const app = Vue.extend(App)

router.start(app, 'app')

router.redirect({
    '*': '/home'
})

window.router = router
window.Vue = Vue
