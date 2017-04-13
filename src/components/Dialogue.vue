<template>
	<div class="full-page vc-dialogue">
		<!-- 顶部信息 -->
		<div class="dialogue-hd flexbox">
			<div class="hd-left back-arrow" @touchend="goBack">
				<span class="back-label">微信</span>
			</div>
			<div class="hd-center dialogue-title flex-1">{{friend.name}}</div>
			<div class="hd-right">
				<span class="iconfont icon-chat-friends"></span>
			</div>
		</div>
		<!-- 对话 -->
		<div class="dialogue-bd">
			<div class="dialogue-container">
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
		<!-- 底部输入框 -->
		<div class="dialogue-ft flexbox">
			<div class="ft-left">
				<label class="dialogue-btn dialogue-switch iconfont"
				 :class="{'icon-dialogue-voice': usingVoice, 'icon-dialogue-jianpan': !usingVoice}"
				 @touchend="toggleInputVoice"
				 for="msg"
				 ></label>
			</div>
			<div class="ft-center flex-1">
				<input type="text" name="msg" id="msg" class="dialogue-input" 
				v-model="typingMsg" 
				v-show="!usingVoice" >
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

	data () {
		return {
			// friend: {
			// 	_uid: '0000000000000004',
			// 	name: '周杰伦',
			// 	avatar: './static/images/chat/avatar-yellow.jpg'
			// },
			friend: {},
			me: {
				name: 'Andre Huang',
				avatar: './static/images/chat/avatar-red.jpg'
			},
			usingVoice: true,
			typingMsg: '',
			conversation: [
				{
					content: '晴天 歌词',
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

	methods: {
		toggleInputVoice () {
			this.usingVoice = !this.usingVoice
			this.focused = !this.usingVoice
		},
		offFocus () {
			this.focused = false
		},
		goBack () {
			util.delLocal('chatfriend')
			this.$router.go({
				path: '/chat'
			})
		}
	},

	events: {
		'getChatFriend' (_person) {
			console.log('dia', _person)
			if (util.typeof(_person) === 'object') {
				this.friend = _person
			}
		}
	},

	transition: {
		'cover' : {
			enter () {
				console.log('cover-enter-')
			},
			leave () {
				console.log('cover-leave')
			}
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
		padding: $gap
		color: #fff
	    background: linear-gradient(180deg,#303036,#3c3b40)
	    background: pink
		z_index('sn')
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
	.hd-left,
	.hd-center,
	.hd-right {
		height: ($header-h - 2 * $gap)
		line-height: @height
	}
	.hd-left {
		width: 52px
		padding-left: 2 * $gap
		text-align: left
		span {
			display: inline-block
			text-align: left
			vertical-align: middle
			font-size: 15px
		}
	}
	.hd-center {
		// flex: 1
		text-align: center
	}
	.hd-right {
		width: 52px
		padding-right: ($gap / 2)
		text-align: right
		span {
			font-size: 18px
			text-align: right
			vertical-align: middle
		}
	}
	.back-arrow {
		position: relative
		&:after {
			content: ' '
			position: absolute
			top: 50%
			left: 8px
			display: inline-block
			width: 12px
			height: 12px
			border-width: 0 0 3px 3px
			border-color: #fff
			border-style: solid
			margin-top: -6px
			background: transparent
			transform: rotateZ(45deg)
		}
	}
	.dialogue-title {
		font-size: 18px
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