<template>	
    <div class="noscroll-outer">
    	<div class="noscroll-inner">
    		<div class="wrapper effect">
				<div class="user list">
					<chat-list :initial-type="type" :initial-list="user"></chat-list>
				</div>
				<div class="list" >
					<alpha-list :initial-type="func.listType" :initial-list="func.list"></alpha-list>
				</div>
		    </div>
    	</div>
    </div>
</template>

<script>
import ChatList from 'components/ChatList'
import AlphaList from 'components/AlphaList'
export default {

	props: ['initialUser'],

    route: {
        activate (transition) {
            this.$dispatch('page', 'me')
            transition.next()
        }
    },

	components: {
		ChatList,
		AlphaList
	},

	data () {
		return {
			type: 1,
			user: [
				{
					_uid: '0000000000000000',
					name: 'Andre爱喝抹茶拿铁',
	                avatar: "./static/profile/user/pic.jpg",
					vcid: 'A_Dreamliker',
					avatarRight: false
				}
			],
			func: {
				listType: '0-1-2-3',
				list: [
					{
						title: '相册',
						icon: ' item-icon-friendcircle',
						avatar: '',
						intro: '',
						hrefTo: '/me?page=friendcircle',
						category: '1'
					},{
						title: '收藏',
						icon: ' item-icon-scan',
						avatar: '',
						intro: '',
						hrefTo: '/me?page=scan',
						category: '1'
					},{
						title: '钱包',
						icon: ' item-icon-shake',
						avatar: '',
						intro: '',
						hrefTo: '/me?page=shake',
						category: '1'
					},{
						title: '卡包',
						icon: ' item-icon-buy',
						avatar: '',
						intro: '',
						hrefTo: '/me?page=buy',
						category: '1'
					},{
						title: '表情',
						icon: ' item-icon-game',
						avatar: '',
						intro: '',
						hrefTo: '/me?page=game',
						category: '2'
					},{
						title: '设置',
						icon: ' item-icon-program',
						avatar: '',
						intro: '',
						hrefTo: '/me?page=program',
						category: '3'
					}
				]
			}
		}
	}
}
</script>

<style lang="stylus">
.user
	padding-bottom: 24px
</style>
