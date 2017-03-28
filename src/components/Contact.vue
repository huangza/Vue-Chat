<template>
    <search-bar></search-bar>
    <div class="effect list">
    	<alpha-list :initial-type="func.listType" :initial-list="func.list"></alpha-list>
    	<alpha-list :initial-type="friends.listType" :initial-list="friends.list"></alpha-list>
    </div>
</template>

<script>
import SearchBar from './SearchBar'
import AlphaList from './AlphaList'
export default {

    components: {
        SearchBar,
        AlphaList
    },

    data () {
    	return {
    		func: {
	    		listType: '0-1-2-4-5',
	    		list: [
					{
						title: '新的朋友',
						icon: ' item-icon-newfriend',
						avatar: '',
						intro: '',
						hrefTo: '',
						category: 'func'
					},{
						title: '群聊',
						icon: ' item-icon-group',
						avatar: '',
						intro: '',
						hrefTo: '',
						category: 'func'
					},{
						title: '标签',
						icon: ' item-icon-tag',
						avatar: '',
						intro: '',
						hrefTo: '',
						category: 'func'
					},{
						title: '公众号',
						icon: ' item-icon-public',
						avatar: '',
						intro: '',
						hrefTo: '',
						category: 'func'
					}
	    		]
    		},
    		friends: {
	    		listType: '1-2-4-5',
	    		list: [
					{
						title: 'Uzumaki Naruto',
						icon: '',
						avatar: './static/images/chat/avatar-yellow.jpg',
						intro: '',
						hrefTo: '',
						category: 'U'
					},{
						title: 'Uchiha Itachi',
						icon: '',
						avatar: './static/images/chat/avatar-blue.jpg',
						intro: '',
						hrefTo: '',
						category: 'U'
					},{
						title: 'Dwyane Wade',
						icon: '',
						avatar: './static/images/chat/avatar-red.jpg',
						intro: '',
						hrefTo: '',
						category: 'D'
					},{
						title: '周杰伦',
						icon: '',
						avatar: './static/images/chat/avatar-yellow.jpg',
						intro: '',
						hrefTo: '',
						category: 'Z'
					},{
						title: '陈奕迅',
						icon: '',
						avatar: './static/images/chat/avatar-green.jpg',
						intro: '',
						hrefTo: '',
						category: 'C'
					},{
						title: 'Andre Huang',
						icon: '',
						avatar: './static/images/chat/avatar-red.jpg',
						intro: '',
						hrefTo: '/me',
						category: 'A'
					},{
						title: '林宥嘉',
						icon: '',
						avatar: './static/images/chat/avatar-green.jpg',
						intro: '',
						hrefTo: '',
						category: 'L'
					},{
						title: '村上春树',
						icon: '',
						avatar: './static/images/chat/avatar-yellow.jpg',
						intro: '',
						hrefTo: '',
						category: 'C'
					},{
						title: '东野圭吾',
						icon: '',
						avatar: './static/images/chat/avatar-blue.jpg',
						intro: '',
						hrefTo: '',
						category: 'D'
					},{
						title: '林俊杰',
						icon: '',
						avatar: './static/images/chat/avatar-blue.jpg',
						intro: '',
						hrefTo: '',
						category: 'L'
					}
	    		]
    		}
    	}
    }
}
</script>
