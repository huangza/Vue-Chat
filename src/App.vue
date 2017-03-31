<template>
    <header class="header t-center">
        <div class="effect">
            <header-bar></header-bar>
        </div>
    </header>
    <!-- <section class="header-sub">
        <search-bar></search-bar>
    </section> -->
    <footer class="footer t-center">
        <div class="effect">
            <tab-bar></tab-bar>
        </div>
    </footer>
    <div class="page" :style="pageStyle">
        <div class="wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeaderBar from './components/Header'
import TabBar from './components/TabBar'
import SearchBar from './components/SearchBar'

require('assets/css/reset.css')
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
    components: {
        HeaderBar,
        TabBar,
        SearchBar
    },

    computed: {
        pageStyle () {
            return isPC() ? { marginRight: '-17px' } : null
        }
    }
}

function isPC() {  
    var userAgentInfo = navigator.userAgent;  
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]; 
    var flag = true;  
    for (var v = 0, len = Agents.length; v < len; v++) {  
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
}
</script>

<!-- <style src="./assets/css/reset.css"></style> -->
<!-- <style src="./assets/css/common.css"></style> -->
<!-- <style src="./assets/css/lib/font-awesome-4.7.0/css/font-awesome.min.css"></style> -->
<!-- <style src="./assets/css/iconfont.css"></style> -->
<style lang="stylus" src="assets/css/pages/app.styl"></style>
