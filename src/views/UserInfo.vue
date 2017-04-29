<template>
	<div class="full-page vc-userinfo">
		<!-- 顶部信息 -->
		<div class="userinfo-hd flexbox">
			<header-bar></header-bar>
		</div>
		<!-- 对话 -->
		<div class="userinfo-bd">
			<div class="userinfo-container">
				<div class="noscroll-outer">
			    	<div class="noscroll-inner">
			    		<div class="wrapper">
							<div class="list" >
								<alpha-list :initial-type="func.listType" :initial-list="func.list"></alpha-list>
							</div>
					    </div>
			    	</div>
			    </div>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderBar from 'components/Header'
import ChatList from 'components/ChatList'
import AlphaList from 'components/AlphaList'
export default {

	route: {
		activate (transition) {
			this.person = []
            this.$parent.$emit('route-pipe', true)
            transition.next()
        },
        data (transition) {
            setTimeout( () => {
                transition.next({})
	            this.$parent.$emit('to-userinfo')
            } )
        },
		deactivate (transition) {
            this.$parent.$emit('route-pipe', false)
            transition.next()
        },
	},

	components: {
		HeaderBar,
		ChatList,
		AlphaList
	},

	data () {
		return {
			type: 2,
			user: [{}]
		}
	},

	computed: {
		hdOption () {
			return {
	            type: 7,
	            title: '个人信息',
	            backBtn: {
	                need: true,
	                label: '我'
	            },
	            action: {
	            	type: 0
	            }
	        }
		},

		func () {
			return {
				listType: '0-1-2-3',
				list: [
					{
						content: '',
						avatar: this.user[0].avatar,
						title: '头像',
						intro: '',
						hrefTo: 'javascript:;',
						category: '1',
						avatarRight: true
					},{
						content: '',
						title: '名字',
						avatar: '',
						intro: this.user[0].name,
						hrefTo: 'javascript:;',
						category: '1'
					},{
						content: '',
						title: '微信号',
						avatar: '',
						intro: this.user[0].vcid,
						hrefTo: '',
						category: '1'
					},{
						content: '',
						title: '我的二维码',
						avatar: '',
						intro: '',
						hrefTo: 'javascript:;',
						category: '1'
					},{
						content: '',
						title: '我的地址',
						avatar: '',
						intro: '',
						hrefTo: 'javascript:;',
						category: '1'
					},{
						content: '',
						title: '性别',
						avatar: '',
						intro: this.user[0].gender === 1 ? '男' : '女',
						hrefTo: 'javascript:;',
						category: '2'
					},{
						content: '',
						title: '地区',
						avatar: '',
						intro: this.user[0].region,
						hrefTo: 'javascript:;',
						category: '2'
					},{
						content: '',
						title: '个性签名',
						avatar: '',
						intro: this.user[0].intro,
						hrefTo: 'javascript:;',
						category: '2'
					}
				]
			}
		}
	},

	events: {
		'getUserInfo' (_person) {
			if (util.typeof(_person) === 'object') {
				// let temp = util.extend({avatarRight: true}, _person)
				// console.log(_person)
				// console.log(temp.avatarRight)
				this.user = [];
				this.user.push(_person)
				// console.log(this.user)
	            this.$broadcast('set-header', this.hdOption)
			}
		},
		'goback' () {
			this.$router.go({
				path: '/me'
			})
		}
	},

	// methods: {
	// 	goBack () {
	// 		util.delLocal('contactfriend')
	// 		this.$router.go({
	// 			path: '/contact'
	// 		})
	// 	}
	// }
}
</script>

<style lang="stylus">
@import '../assets/css/com/mixin.styl'
@import '../assets/css/com/value.styl'
.vc-userinfo {
	z_index('sc')
	.userinfo-hd {
		position: absolute
		top: 0
		left: 0
		right: 0
		// display: flex
		height: $header-h
		// line-height: @height
		// padding: $gap
		color: #fff
	    background: linear-gradient(180deg,#303036,#3c3b40)
		z_index('sn')
	}
	.userinfo-bd {
		width: 100%
		height: 100%
		padding: $header-h 0 $footer-h 0
	}
	.item-bd-3 {
		.item-title {
			height: 24px
			line-height: @height
		}
		.item-txt {
			height: 18px
			line-height: @height
			color: #888
		}
	}
}
</style>