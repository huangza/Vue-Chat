<template>
    <header class="header t-center">
        <div class="effect" :class="{' effect--50': fade}">
            <header-bar></header-bar>
        </div>
    </header>
    <footer class="footer t-center" :class="{'hide': !showFooter}">
        <div class="effect" :class="{'effect--50': fade}">
            <tab-bar></tab-bar>
        </div>
    </footer>
    <div class="page" :style="pageStyle">
        <router-view :initial-user="user"></router-view>
    </div>
</template>

<script>
import HeaderBar from 'components/Header'
import TabBar from 'components/TabBar'
import SearchBar from 'components/SearchBar'

require('assets/css/reset.css')
require('assets/css/com/util.styl')
require('assets/css/iconfont.css')


if(window.addEventListener) {
    window.addEventListener("load",function() {
        // Set a timeout...
        setTimeout(function(){
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 0);
    });
    // window.addEventListener("click", function(event){
    //     console.log(event.target);
    // });
}

export default {

    created () {},

    ready () {
        if (util.isPC()) {
            this.addMargin = true
        } else {
            this.addMargin = false
        }
    },

    components: {
        HeaderBar,
        TabBar,
        SearchBar
    },

    data () {
        return {
            user: [{
                "title": "Andre Huang",
                "icon": "",
                "avatar": "./static/images/chat/avatar-red.jpg",
                "intro": "",
                "hrefTo": "/me",
                "category": "A"
            }],
            addMargin: false,
            showFooter: true,
            fade: false
        }
    },

    computed: {
        pageStyle () {
            return util.isPC() ? { marginRight: '-17px' } : null
        }
    },

    methods: {
        getUser () {
            var vm = this
            vm.$http.get('/api/getuser')
                .then( (res) => {
                    if (res && res.body && res.body.data) {
                        vm.$set('user', [].push(res.body.data))
                    }
                } )
        },
        test () {
            this.fade = !this.fade
        }
    },

    events: {
        'page' (name) {
            var pageWithNav = ['chat', 'contact', 'discover', 'me']
            var pageWithSearch = ['chat', 'contact', 'subContact', 'newFriend']
            if (!name) {
                return
            }
            if (pageWithNav.indexOf(name) >= 0) {
                // console.log('page: ' + new Date())
                this.showFooter = true
            } else {
                this.showFooter = false
            }
        },

        'route-pipe' (_fade) {
            console.log('app fade')
            this.fade = _fade
        },

        'header-msg-count' (count) {
            // console.log('header-msg-count: ' + count)
            util.typeof(count) === 'number' && this.$broadcast('set-msg-count', count)
        }
    }
}
</script>

<!-- <style src="./assets/css/reset.css"></style> -->
<!-- <style src="./assets/css/common.css"></style> -->
<!-- <style src="./assets/css/lib/font-awesome-4.7.0/css/font-awesome.min.css"></style> -->
<!-- <style src="./assets/css/iconfont.css"></style> -->
<style lang="stylus" src="assets/css/pages/app.styl"></style>
