<template>
    <div class="noscroll-outer">
        <div class="noscroll-inner">
            <div class="wrapper effect" :class="{'effect--30': fade}">
                <search-bar></search-bar>
                <div class="chat-list">
                    <chat-list :initial-list="friends" :handle-click="toDialogue"></chat-list>
                    <!-- <span v-show="needed">{{newMsgCount}}</span> -->
                </div>
            </div>
        </div>
    </div>
    <router-view transition="cover"></router-view>
</template>

<script>
import ChatList from 'components/ChatList'
import SearchBar from 'components/SearchBar'

import {header, addChatList, newMsgCount} from 'vx/actions'
import {getChatList} from 'vx/getters'


export default {

    created () {
        // this.getFriends();
        this.getFriends_PROD();
        console.log('chat created')
    },

    props: ['initialUser'],

    vuex: {
        actions: {
            updateHeader: header,
            // updateHeaderType: headerType
            addChatList,
            newMsgCount
        },
        getters: {
            chatList: getChatList
        }
    },

    route: {
        activate (transition) {
            // this.$dispatch('page', 'chat')
            transition.next()
        },
        data (transition) {
            this.updateHeader({
                type: 1,
                title: 'Fake Wechat',
                backBtn: {
                    need: false
                },
                action: {
                    type: 1
                }
            })
            transition.next()
        }
    },

    ready() {
    },

    data () {
        // console.log(this.$store.state)
        return {
            friends: [],
            apiUrl: '/api/chat',
            apiUrl_PROD: './static/mock/data.json',
            fade: false
        }
    },

    computed: {
        friends () {
            this.updateMsgCount()

            return this.chatList
        },
        // newMsgCount () {
        //     var total = 0
        //     this.friends.forEach(function(item){
        //         if (item.newMsg && item.msgCount > 0) {
        //             total += item.msgCount
        //         }
        //     })
        //     this.$dispatch('header-msg-count', total)
        //     // console.log(1)
        //     return total
        // }
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
                    // before using Vuex
                    vm.$set('friends', res.body.data)

                    // Vuex

                    // console.log(this.friends)
                } )
        },
        getFriends_PROD () {
            var vm = this;
            vm.$http.get(vm.apiUrl_PROD)
                .then( (res) => {
                    // vm.$set('friends', res.body.chat)
                    vm.addChatList(res.body.chat)
                } )
        },
        updateMsgCount () {
            let total = 0
            this.chatList.forEach(item =>{
                if (item.newMsg && item.msgCount > 0) {
                    total += item.msgCount
                }
            })
            this.newMsgCount(total)
        },
        toDialogue (item) {
            // console.log(item)
            // alert(item.name)
            // this.target = $index
            // this.$parent.$emit('to-dialogue', index)
            let id = item._uid
            // alert(1)
            util.setLocal('chatfriend', id)
            // localStorage['chatfriend'] = id
            // alert(localStorage['chatfriend'])

            // @：怎么实现具名路径，且带参数
            this.$router.go({
                path: '/chat/dialogue',
                // name: 'dialogue',
                query: {
                    id
                }
            })
        },
    },

    events: {
        updateData() {
            console.log('chat updateData')
        },
        'route-pipe' (_fade) {
            // console.log('chat fade')
            this.fade = _fade
            this.$parent.$emit('route-pipe', _fade)
        },
        'to-dialogue' (index) {
            // console.log('*No: ' + index)
            var fields = ['_uid', 'name', 'avatar']
            // console.log('*No: ' + index)
            if (util.typeof(index) === 'string') {
                var res = this.friends.filter(function(item){
                    if (item._uid === index) {
                        return item
                    }
                })[0]
                // console.log(res)
                var person = {};
                for(var k in res) {
                    if (res.hasOwnProperty(k) && fields.indexOf(k) > -1) {
                        person[k] = res[k]
                    }
                }
                // console.log('contact', person)
                // console.log('contact', new Date())
                this.$broadcast('getChatFriend', person)
            }
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
