<template>
	<div class="full-page vc-dialogue">
		<div class="dialogue-hd">
			<div class="hd-left back-arrow">
				<span class="back-label">微信</span>
			</div>
			<div class="hd-center dialogue-title">用户名20170401</div>
			<div class="hd-right">
				<span class="iconfont icon-chat-friends"></span>
			</div>
		</div>
		<div class="dialogue-bd">body</div>
		<div class="dialogue-ft"></div>
	</div>
</template>

<script>
export default {
	route: {
		activate (transition) {
            this.$parent.$emit('route-pipe', true)
            transition.next()
        },
		deactivate (transition) {
            this.$parent.$emit('route-pipe', false)
            transition.next()
        },
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
		display: flex
		height: $header-h
		// line-height: @height
		padding: $gap
		color: #fff
		z_index('sn')
	}
	.dialogue-ft {
		position: absolute
		bottom: 0
		left: 0
		right: 0
		height: $footer-h
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
		flex: 1
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
			left: 10px
			display: inline-block
			width: 8px
			height: 8px
			border-width: 0 0 2px 2px
			border-color: #C8C8CD
			border-style: solid
			margin-top: -4px
			background: transparent
			transform: rotateZ(45deg)
		}
	}
	.dialogue-title {
		font-size: 18px
	}
}
</style>