<template>
	<div class="full-page vc-personinfo">
		<!-- 顶部信息 -->
		<div class="dialogue-hd flexbox">
			<div class="hd-left back-arrow" @touchend="goBack">
				<span class="back-label">返回</span>
			</div>
			<div class="hd-center dialogue-title flex-1">详细资料</div>
			<div class="hd-right">
				<span class="iconfont icon-more"></span>
			</div>
		</div>
		<!-- 对话 -->
		<div class="dialogue-bd">
			<div class="dialogue-container">
			</div>
		</div>
	</div>
</template>

<script>
export default {

	route: {
		activate (transition) {
            this.$parent.$emit('route-pipe', true)
            // this.$parent.$emit('to-personinfo', util.getLocal('chatfriend'))
            // console.log('person route', new Date())
            transition.next()
            // console.log('activate: ' + new Date())
        },
        data (transition) {
            setTimeout( () => {
                transition.next({})
	            this.$parent.$emit('to-personinfo', util.getLocal('chatfriend'))
                // console.log('data: ' + new Date())
            } )
        },
		deactivate (transition) {
            this.$parent.$emit('route-pipe', false)
            transition.next()
        },
	},

	data () {
		return {
			friend: {}
		}
	},

	events: {
		'getPersonInfo' (_person) {
			if (util.typeof(_person) === 'object') {
				this.friend = _person
			}
		}
	},

	methods: {
		goBack () {
			util.delLocal('chatfriend')
			this.$router.go({
				path: '/contact'
			})
		}
	},

	// transition: {
	// 	'cover' : {
	// 		enter () {
	// 			console.log('cover-enter-')
	// 		},
	// 		leave () {
	// 			console.log('cover-leave')
	// 		}
	// 	}
	// }
}
</script>

<style lang="stylus">
@import '../assets/css/com/mixin.styl'
@import '../assets/css/com/value.styl'
.vc-personinfo {
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
}
</style>