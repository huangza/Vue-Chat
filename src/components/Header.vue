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
			<!-- <div class="wrapper back-arrow" v-if="option.backBtn.need" v-link="option.backBtn.url"> -->
				<span class="back-label">{{option.backBtn.label}}</span>
			</div>
		</div>
		<div class="hd-center hd-title flex-1">
			{{option.title}}
			<span class="new-msg-count" data-role="new-msg-count" v-if="needMsgTip" v-show="newMsgCount > 0">({{newMsgCount}})</span>
		</div>
		<div class="hd-right">
			<!-- <span class="iconfont icon-more"></span> -->
			<action-bar :initial-option="option.action"></action-bar>
		</div>
	</div>
</template>

<script>
import ActionBar from './ActionBar'
// import store from 'vx/store'
import {getHdOption, getNewMsgCount} from 'vx/getters'
export default {
	// props: ['initialOption'],
	vuex: {
		getters: {
			option: getHdOption,
			newMsgCount: getNewMsgCount
		}
	},
	data () {
		// console.log(this.$store.state.header.backBtn)
		return {
			// option 组件配置
			// |-- type，表示为哪些页面的组件：
			//    0 - 默认
			//    1 - 首页
			//    2 - 通讯录
			//    3 - 发现
			//    4 - 我
			//    5 - 聊天窗口
			//    6 - 聊天详情
			//    7 - 个人信息
			//    8 - 朋友圈
			// |-- title，表示头部中间的文字
			// |-- backBtn，左侧后退操作对应的对象
			// 			|-- need - 是否需要后退按钮
			// 			|-- url - 跳转操作指向的路径
			// 			|-- label - 显示文字
			// |-- action，右侧功能按钮
			// 			|-- type - 类型
			// 			|-- url - 跳转路径
			// 			|-- icon - 图标

			// defaultOpt: {
			// 	type: 0,
			// 	title: 'Fake Wechat',
			// 	backBtn: {
			// 		need: false,
			// 		url: '',
			// 		label: '返回'
			// 	},
			// 	action: {
			// 		type: 0,
			// 		icon: 'icon-more',
			// 		url: ''
			// 	}
			// },
			initialOption: null
		}
	},
	computed: {
		// option () {
		// 	console.log(getHdOption)
		// 	return util.extend(this.defaultOpt, this.initialOption)
		// },
		// msgTip () {
		// 	return {
		// 		hasNew: false,
		// 		count: newMsgCount
		// 	}
		// },
		needMsgTip () {
			return this.option.type === 1 ? true : false
		}
	},
	components: {
		ActionBar
	},

	events: {
		// 'set-header' (opt) {
		// 	if (util.typeof(opt) === 'object') {
		// 		this.initialOption = opt
		// 		// console.log(opt)
		// 	}
		// },
		// 'set-msg-count' (count) {
		// 	if (util.typeof(count) === 'number') {
		// 		this.msgTip.hasNew = count > 0 ? true : false;
		// 		this.msgTip.count = count
		// 	}
		// }
	},

	methods: {
		goBack () {
			// this.$parent.$emit('goback')
			// console.log(this);
			window.history.go(-1)
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
		width: 65px
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
		width: 65px
		padding-right: ($gap / 2)
		text-align: right
		span {
			font-size: 18px
			text-align: right
			// vertical-align: middle
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
	.hd-title {
		font-size: 18px
	}
}
</style>