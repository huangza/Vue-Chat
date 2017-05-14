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
    <router-view transition="cover"></router-view>
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
			// user: [
			// 	{
			// 		_uid: '0000000000000000',
			// 		name: 'Andre爱喝抹茶拿铁',
	  //               avatar: "./static/profile/user/pic.jpg",
			// 		vcid: 'A_Dreamliker',
			// 		gender: 1,
			// 		intro: '',
			// 		region: '广东 深圳',
			// 		avatarRight: false
			// 	}
			// ],
			user: this.initialUser,
			func: {
				listType: '0-1-2-3',
				list: [
					{
						content: '相册',
						avatar: '#item-icon-friendcircle',
						intro: '',
						hrefTo: '/me/album',
						category: '1'
					},{
						content: '收藏',
						avatar: '#item-icon-scan',
						intro: '',
						hrefTo: '/me?page=scan',
						category: '1'
					},{
						content: '钱包',
						avatar: '#item-icon-shake',
						intro: '',
						hrefTo: '/me?page=shake',
						category: '1'
					},{
						content: '卡包',
						avatar: '#item-icon-buy',
						intro: '',
						hrefTo: '/me?page=buy',
						category: '1'
					},{
						content: '表情',
						avatar: '#item-icon-game',
						intro: '',
						hrefTo: '/me?page=game',
						category: '2'
					},{
						content: '设置',
						avatar: '#item-icon-program',
						intro: '',
						hrefTo: '/me?page=program',
						category: '3'
					}
				]
			}
		}
	},

	computed: {
		// user () {
		// 	let tempName = this.initialUser[0].name;
		// 	let temp = util.extend({}, this.initialUser[0]);
		// 	temp.name = undefined;
		// 	let arr = [];
		// 	arr.push( util.extend({content: tempName}, temp) );
		// 	return arr;
		// }
	},

	events: {
		'to-userinfo' () {
			let tempName = this.user[0].name;
			let temp = util.extend({}, this.user[0]);
			temp.name = undefined;
			// let arr = [];
			// arr.push( util.extend({content: tempName}, temp) );
			// return arr;
			this.$broadcast('getUserInfo', util.extend({content: tempName}, temp));
			// this.$broadcast('getUserInfo', util.extend({}, this.user[0]));
		}
	}
}
</script>

<style lang="stylus">
.user
	padding-bottom: 24px
</style>
