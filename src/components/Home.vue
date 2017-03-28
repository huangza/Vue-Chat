<template>
    <search-bar></search-bar>
    <div class="effect list chat-list">
        <chat-list :initial-list="friends"></chat-list>
    </div>
</template>

<script>
import ChatList from './ChatList'
import SearchBar from './SearchBar'

export default {
    data () {
        return {
            friends: [
                {
                    name: 'Uzumaki Naruto',
                    avatar: './static/images/chat/avatar-yellow.jpg',
                    latestWord: '笔直向前，说到做到',
                    latestTime: '17:29',
                    newMsg: true,
                    msgCount: 2
                },
                {
                    name: 'Sakuragi Hanamichi',
                    avatar: './static/images/chat/avatar-red.jpg',
                    latestWord: '我果然是个天才',
                    latestTime: '13:49',
                    newMsg: true,
                    msgCount: ''
                },
                {
                    name: 'Dwyane Wade',
                    avatar: '/static/images/chat/avatar-blue.jpg',
                    latestWord: 'This is my house',
                    latestTime: '09:21',
                    newMsg: false,
                    msgCount: ''
                },
                {
                    name: '周杰伦',
                    avatar: '/static/images/chat/avatar-green.jpg',
                    latestWord: '哎哟，不错喔~',
                    latestTime: '01:22',
                    newMsg: true,
                    msgCount: '99+'
                }
            ]
        }
    },
    components: {
        ChatList,
        SearchBar
    }
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
