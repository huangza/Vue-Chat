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

							<div class="action">
								<a v-link="{ path: 'dialogue', query: {id: person[0]._uid}, append: true }" class="btn btn-normal">发消息（三级页）</a>
								<a v-link="{ path: '/chat/dialogue' }" class="btn btn-default">chat二级页</a>
								<a class="btn btn-warning">警告按钮</a>
							</div>
					    </div>
			    	</div>
			    </div>
			</div>
		</div>

	    <router-view transition="cover"></router-view>
	</div>
</template>

<script>
import HeaderBar from 'components/Header'
import ChatList from 'components/ChatList'
import AlphaList from 'components/AlphaList'

import {header, updateFriendInfo} from 'vx/actions'
import {friendInfo} from 'vx/getters'

export default {
	ready () {
		// console.log('ready', this.friendInfo)
		console.log('暂时不能跳到自己的详情页')
	},

    vuex: {
        actions: {
            updateHeader: header,
            updateFriendInfo
        },
        getters: {
        	friendInfo
        }
    },

	route: {
		activate (transition) {
            this.$parent.$emit('route-pipe', true)
            transition.next()
        },
        data ({
        	to: {query: {id}},
        	next
        }) {
        	let me = this
        	return Promise.all([
        		(new Promise(resolve => {
	        		me.updateHeader({
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
		        	})
		        	resolve()
	        	})),
	        	(new Promise(resolve => {
		        	me.updateFriendInfo(id)
		        	// console.log('data')
		        	resolve()
	        	}))
        	]).then(() => ({}))


        	// return next({})
        },
        // data ({next}) {
            // setTimeout( () => {
            //     transition.next({})
	           //  this.$parent.$emit('to-personinfo', util.getLocal('contactfriend'))

            // 	this.updateHeader({
            // 		type: 7,
		          //   title: '详细资料',
		          //   backBtn: {
		          //       need: true,
		          //       label: '返回'
		          //   },
		          //   action: {
		          //   	type: 2,
		          //       icon: 'icon-more'
		          //   }
            // 	})
            // } )
        // },
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
			// person: [{}]
		}
	},

	computed: {
		// hdOption () {
		// 	return {
	 //            type: 7,
	 //            title: '详细资料',
	 //            backBtn: {
	 //                need: true,
	 //                label: '返回'
	 //            },
	 //            action: {
	 //            	type: 2,
	 //                icon: 'icon-more'
	 //            }
	 //        }
		// },
		func () {
			// console.log(this.person.length)
			return {
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
						content: (this.person[0] && this.person[0].region) || '',
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
		},
		person() {
			// console.log(this.friendInfo ? this.friendInfo._uid : '???')
			// let me = this
			let p = [], obj = {}
			const fields = ['_uid', 'name', 'vcid', 'region', 'avatar', 'remark']

			if (this.friendInfo) {
				fields.forEach(k => obj[k] = this.friendInfo[k])
			}

			obj.avatarRight = false

			p.push(obj)
			return p

			// let p = []
			// p.push(this.friendInfo || {})
			// return p
		},
	},

	events: {
		'getPersonInfo' (_person) {
			if (util.typeof(_person) === 'object') {
				let temp = util.extend({avatarRight: false}, _person)
				// this.person.pop()
				// this.person.push( temp )
				this.person.splice(0, 1, temp)
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
	img {
	    background: #cdcdcd;
	}
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
	.action {
		text-align: center
		padding: 0 15px
		margin-top: 24px
		& .btn {
			width: 100%
			&+.btn {
				margin-top: 15px
			}
		}
	}
}
</style>