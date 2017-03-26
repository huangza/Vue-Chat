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

Vue.use(VueRouter)

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
