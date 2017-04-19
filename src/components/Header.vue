<template>
	<!-- <div class="vc-header p-relative">
		<div class="f18">
			Fake Wechat
			<span class="new-msg-count" data-role="new-msg-count" v-show="msgTip.hasNew">({{msgTip.count}})</span>
		</div>
		<div class="p-absolute action">
			<action-bar></action-bar>
		</div>
	</div> -->
	<div class="vc-header flexbox">
		<div class="hd-left">
			<div class="wrapper back-arrow" v-if="option.backBtn.need" @touchend="goBack">
				<span class="back-label">{{option.backBtn.label}}</span>
			</div>
		</div>
		<div class="hd-center dialogue-title flex-1">
			{{option.title}}
			<span class="new-msg-count" data-role="new-msg-count" v-show="msgTip.hasNew">({{msgTip.count}})</span>
		</div>
		<div class="hd-right">
			<!-- <span class="iconfont icon-more"></span> -->
			<action-bar></action-bar>
		</div>
	</div>
</template>

<script>
import ActionBar from './ActionBar'
export default {
	props: ['initialOption'],
	data () {
		return {
			msgTip: {
				hasNew: false,
				count: 0
			},
			// option 组件配置
			// |-- type，表示为哪些页面的组件：
			//    0 - 默认
			//    1 - 首页
			//    2 - 通讯录
			//    3 - 聊天窗口
			//    4 - 聊天详情
			//    5 - 个人信息
			//    6 - 朋友圈
			// |-- title，表示头部中间的文字
			// |-- backBtn，左侧后退操作对应的对象
			// 			|-- need - 是否需要后退按钮
			// 			|-- url - 跳转操作指向的路径
			// 			|-- label - 显示文字
			// |-- action，右侧功能按钮
			// 			|-- icon - 图标
			defaultOpt: {
				type: 0,
				title: 'Fake Wechat',
				backBtn: {
					need: false,
					url: '',
					label: '返回'
				},
				action: {
					type: 0,
					icon: 'icon-more',
					url: ''
				}
			}
		}
	},
	computed: {
		option () {
			return util.extend(this.defaultOpt, this.initialOption)
		},
		needMsgTip () {
			return this.option.type === 1 ? true : false
		}
	},
	components: {
		ActionBar
	},

	events: {
		'set-msg-count' (count) {
			if (util.typeof(count) === 'number') {
				this.msgTip.hasNew = count > 0 ? true : false;
				this.msgTip.count = count
			}
		}
	},

	methods: {
		goBack () {
			this.$parent.$emit('goback')
		}
	}
}
</script>

<style lang="stylus">
@import "../assets/css/com/mixin.styl"
@import "../assets/css/com/value.styl"
.vc-header {
	width: 100%
	height: $header-h
	padding: $gap
	color: #fff
    z_index(3);
    background: linear-gradient(180deg,#303036,#3c3b40);
	.action {
		top: 0
		right: 0
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
			left: -14px
			display: inline-block
			width: 12px
			height: 12px
			border-width: 0 0 3px 3px
			border-color: #fff
			border-style: solid
			margin-top: -8px
			background: transparent
			transform: rotateZ(45deg)
		}
	}
	.dialogue-title {
		font-size: 18px
	}
}
</style>