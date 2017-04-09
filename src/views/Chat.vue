<template>
    <div class="wrapper effect" :class="{'effect--30': fade}">
        <search-bar></search-bar>
        <div class="chat-list">
            <chat-list :initial-list="friends"></chat-list>
            <span v-show="needed">{{newMsgCount}}</span>
        </div>
    </div>
    <router-view keep-alive transition="cover"></router-view>
</template>

<script>
import ChatList from 'components/ChatList'
import SearchBar from 'components/SearchBar'

export default {

    created () {
        this.getFriends();
        // this.getFriends_PROD();
    },

    props: ['initialUser'],

    route: {
        activate (transition) {
            this.$dispatch('page', 'chat')
            transition.next()
        }
    },

    data () {
        return {
            friends: [],
            apiUrl: '/api/chat',
            apiUrl_PROD: './static/mock/data.json',
            fade: false
        }
    },

    computed: {
        newMsgCount () {
            var total = 0
            this.friends.forEach(function(item){
                if (item.newMsg && item.msgCount > 0) {
                    total += item.msgCount
                }
            })
            this.$dispatch('header-msg-count', total)
            // console.log(1)
            return total
        }
    },

    components: {
        ChatList,
        SearchBar
    },

    methods: {
        getFriends () {
            var vm = this;
            vm.$http.get(vm.apiUrl)
                .then( (res) => {
                    vm.$set('friends', res.body.data)
                    // console.log(this.friends)
                } )
        },
        getFriends_PROD () {
            var vm = this;
            vm.$http.get(vm.apiUrl_PROD)
                .then( (res) => {
                    vm.$set('friends', res.body.chat)
                } )
        }
    },

    events: {
        'route-pipe' (_fade) {
            console.log('chat fade')
            this.fade = _fade
            this.$parent.$emit('route-pipe', _fade)
        },
        'to-dialogue' (index) {
            console.log('*No: ' + index)
        }
    },
}
</script>

<style lang="stylus">
// .chat-list
//     img
//         width: 20px
// .alpha-search ~ .effect {
//     padding-top: 41px
// }
</style>
