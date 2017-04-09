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
					<div class="dialogue-item" :class="{'dialogue-left': item.from === 0, 'dialogue-right': item.from === 1}">{{item.content}}</div>
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
		deactivate (transition) {
            this.$parent.$emit('route-pipe', false)
            transition.next()
        },
	},

	data () {
		return {
			friend: {
				_uid: '',
				name: 'test',
				avatar: ''
			},
			me: {
				name: '',
				avatar: ''
			},
			usingVoice: true,
			typingMsg: '',
			focused: false,
			conversation: [
				{
					content: '成全 歌词',
					from: 1
				},
				{
					content: '我对你付出的青春这么多年，换来了一句谢谢你的成全。',
					from: 0
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
			this.$router.go({
				path: '/chat'
			})
		}
	},

	events: {
		'dialogue-friend' (obj) {

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
		padding-left: 2 * $gap
		span {
			display: inline-block
			text-align: left
			vertical-align: middle
			font-size: 16px
		}
	}
	.hd-center {
		// flex: 1
		text-align: center
	}
	.hd-right {
		padding-right: ($gap / 2)
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
}
</style>