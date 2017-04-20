<template>
	<div class="full-page vc-dialogue">
		<!-- 顶部信息 -->
		<div class="dialogue-hd flexbox">
			<!-- <div class="hd-left back-arrow" @touchend="goBack">
				<span class="back-label">微信</span>
			</div>
			<div class="hd-center dialogue-title flex-1">{{friend.name}}</div>
			<div class="hd-right">
				<span class="iconfont icon-chat-friends"></span>
			</div> -->
			<header-bar></header-bar>
		</div>
		<!-- 对话 -->
		<div class="dialogue-bd noscroll-outer">
			<div id="conversation" class="dialogue-container noscroll-inner">
				<div class="wrapper">
					<template v-for="item in conversation">
						<div class="dialogue-item" :class="{'dialogue-left': item.from === 0, 'dialogue-right': item.from === 1}">
							<div class="dialogue-img">
								<img :src="item.from > 0 ? me.avatar : friend.avatar">
							</div>
							<div class="dialogue-msg">
								<div class="dialogue-msg-txt" v-if="item.type === 1">{{item.content}}</div>
								<img :src="item.content" class="dialogue-msg-emoji" v-if="item.type === 2">
								<img :src="item.content" class="dialogue-msg-img" v-if="item.type === 3">
							</div>
						</div>
					</template>
				</div>
			</div>
		</div>
		<!-- 底部输入框 -->
		<div class="dialogue-ft flexbox">
			<div class="ft-left">
				<label class="dialogue-btn dialogue-switch iconfont"
				 :class="{'icon-dialogue-voice': usingVoice, 'icon-dialogue-jianpan': !usingVoice}"
				 @touchend="toggleInputVoice"
				 ></label>
			</div>
			<div class="ft-center flex-1">
				<input type="text" name="msg" id="msg" class="dialogue-input" 
				v-model="typingMsg" 
				v-show="!usingVoice" 
				@keyup.enter="sendMsg">
				<div class="dialogue-voice" v-show="usingVoice">按住&nbsp;说话</div>
			</div>
			<div class="ft-right">
				<span class="dialogue-btn dialogue-func iconfont icon-dialogue-smile"></span>
				<span class="dialogue-btn dialogue-emoji iconfont icon-dialogue-jia"></span>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderBar from 'components/Header'

export default {

	ready () {
		// console.log(this.$router)
	},

	route: {
		activate (transition) {
            this.$parent.$emit('route-pipe', true)
            // this.$dispatch('dialogue-get-friend')
            transition.next()
        },
        data (transition) {
            setTimeout( () => {
                transition.next({})
	            this.$parent.$emit('to-dialogue', util.getLocal('chatfriend'))
            } )
        },
		deactivate (transition) {
            this.$parent.$emit('route-pipe', false)
            transition.next()
        },
	},

	components: {
		HeaderBar
	},

	data () {
		return {
			friend: {},
			me: {
				name: 'Andre Huang',
                avatar: "./static/profile/user/pic.jpg"
			},
			usingVoice: false,
			typingMsg: '',
			conversation: [
				{
					content: '晴天 歌词',
					// 消息来源：1-用户自己；0-好友
					from: 1,
					// 消息类型：1-文字；2-表情；3.图片
					type: 1
				},
				{
					content: '刮风这天我试过握着你手，但偏偏雨渐渐大到我看你不见。',
					from: 0,
					type: 1
				}
			]
		}
	},

	computed: {
		hdOption () {
			return {
	            type: 3,
	            title: this.friend.name,
	            backBtn: {
	                need: true,
	                // url: '/chat',
	                label: '返回'
	            },
	            action: {
	            	type: 2,
	            	url: '/chat/detail',
	                icon: 'icon-chat-friends'
	            }
	        }
		}
	},

	methods: {
		toggleInputVoice () {
			this.usingVoice = !this.usingVoice
			this.focused = !this.usingVoice
		},
		offFocus () {
			this.focused = false
		},
		sendMsg () {
			this.conversation.push({
				content: this.typingMsg,
				from: 1,
				type: 1
			})
			this.typingMsg = ''
		}
		
	},

	events: {
		'getChatFriend' (_person) {
			// console.log('dia', _person)
			if (util.typeof(_person) === 'object') {
				this.friend = _person
	            this.$broadcast('set-header', this.hdOption)
			}
		},
		'goback' () {
			util.delLocal('chatfriend')
			this.$router.go({
				path: '/chat'
			})
		}
	},

	watch: {
	    conversation () {
	    	// console.log('change')
	        document.getElementById('conversation').scrollTop = document.getElementById('conversation').scrollHeight;
	    }
	}
}
</script>

<style lang="stylus">
@import '../assets/css/com/mixin.styl'
@import '../assets/css/com/value.styl'
.vc-dialogue {
	z_index('sc')
	.dialogue-hd {
		position: absolute
		top: 0
		left: 0
		right: 0
		// display: flex
		height: $header-h
		// line-height: @height
		// padding: $gap
		color: #fff
	    // background: linear-gradient(180deg,#303036,#3c3b40)
		z_index('sn')
		transform: translateZ(1px)
	}
	.dialogue-bd {
		width: 100%
		height: 100%
		padding: $header-h 0 $footer-h 0
	}
	.dialogue-ft {
		position: absolute
		bottom: 0
		left: 0
		right: 0
		height: $footer-h
		padding: 8px $gap
	    border-top: 1px solid #b7b7b7
	    background: #f2f1f0
		z_index('sn')
	}
	.ft-left,
	.ft-center,
	.ft-right {
		display: inline-block
		vertical-align: middle
		line-height: 33px
	}
	.ft-center {
		padding-left: $gap
		padding-right: $gap
	}
	.dialogue-input {
		width: 100%
		height: 33px
		line-height: (@height - 2)
		padding-left: $gap
		padding-right: $gap
		border: 1px solid #b7b7b7
		border-radius: 5px
		background: #fff
	}
	.dialogue-voice {
		height: 33px
		line-height: (@height - 2)
		border: 1px solid #b7b7b7
		border-radius: 5px
		text-align: center
		color: #333
	}
	.dialogue-btn {
		display: inline-block
		font-size: 28px
		color: #999
	}
	.dialogue-item {
		width: 100%
		padding: $gap
	}
	.dialogue-img {
		width: $chatAvatar
		height: @width
		img {
			width: 100%
			height: 100%
		}
	}
	.dialogue-msg-txt {
		position: relative
		font-size: 15px
		line-height: 22px
		padding: 12px
		max-width: 220px
		border-radius: 5px
		&:before {
			content: ' '
			position: absolute
			top: $gap
			width: 0
			height: 0
			border-width: $gap
			border-color: transparent
			border-style: solid
		}
	}
	.dialogue-left,
	.dialogue-right {
		position: relative
	}
	.dialogue-left {
		.dialogue-msg {
			width: 100%
			padding-left: ($gap * 2 + $chatAvatar) 
			text-align: left
		}
		.dialogue-msg-txt {
			display: inline-block
			background: #fff
			&:before {
				left: -($gap * 2)
				border-right-color: #fff
			}
		}
		.dialogue-img {
			position: absolute
			top: $gap
			left: $gap
		}
	}
	.dialogue-right {
		.dialogue-msg {
			width: 100%
			padding-right: ($gap * 2 + $chatAvatar) 
			text-align: right
		}
		.dialogue-msg-txt {
			display: inline-block
			background: #a2e759
			text-align: left
			&:before {
				right: -($gap * 2)
				border-left-color: #a2e759
			}
		}
		.dialogue-img {
			position: absolute
			top: $gap
			right: $gap
		}
	}
}
</style>