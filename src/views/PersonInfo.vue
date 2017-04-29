<template>
	<div class="full-page vc-personinfo">
		<!-- 顶部信息 -->
		<div class="personinfo-hd flexbox">
			<header-bar></header-bar>
		</div>
		<!-- 对话 -->
		<div class="personinfo-bd">
			<div class="personinfo-container">
				<div class="noscroll-outer">
			    	<div class="noscroll-inner">
			    		<div class="wrapper">
							<div class="user list" v-if="person.length>0">
								<chat-list :initial-type="type" :initial-list="person"></chat-list>
							</div>
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
	            this.$parent.$emit('to-personinfo', util.getLocal('contactfriend'))
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
			person: [],
			func: {
				listType: '0-1-2-3',
				list: [
					{
						content: '',
						avatar: '',
						title: '设置备注和标签',
						intro: '',
						hrefTo: 'javascript:;',
						category: '1'
					},{
						content: '广东 深圳',
						title: '地区',
						avatar: '',
						intro: '',
						hrefTo: '',
						category: '2'
					},{
						content: '',
						title: '更多',
						avatar: '',
						intro: '',
						hrefTo: 'javascript:;',
						category: '2'
					}
				]
			}
		}
	},

	computed: {
		hdOption () {
			return {
	            type: 7,
	            title: '详细资料',
	            backBtn: {
	                need: true,
	                label: '返回'
	            },
	            action: {
	            	type: 2,
	                icon: 'icon-more'
	            }
	        }
		},

	},

	events: {
		'getPersonInfo' (_person) {
			if (util.typeof(_person) === 'object') {
				let temp = util.extend({avatarRight: false}, _person)
				this.person.push( temp )
	            this.$broadcast('set-header', this.hdOption)
			}
		},
		'goback' () {
			util.delLocal('contactfriend')
			this.$router.go({
				path: '/contact'
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
.vc-personinfo {
	z_index('sc')
	.personinfo-hd {
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
	.personinfo-bd {
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