<template>
	<div class="vc-header p-relative">
		<div class="f18">
			Fake Wechat
			<span class="new-msg-count" data-role="new-msg-count" v-show="msgTip.hasNew">({{msgTip.count}})</span>
		</div>
		<div class="p-absolute action">
			<action-bar></action-bar>
		</div>
	</div>
	<!-- <div class="vc-header flexbox">
		<div class="hd-left back-arrow" @touchend="goBack">
			<span class="back-label">返回</span>
		</div>
		<div class="hd-center dialogue-title flex-1">
			{{option.title}}
			<span class="new-msg-count" data-role="new-msg-count" v-show="msgTip.hasNew">({{msgTip.count}})</span>
		</div>
		<div class="hd-right">
			<span class="iconfont icon-more"></span>
		</div>
	</div> -->
</template>

<script>
import ActionBar from './ActionBar'
export default {
	data () {
		return {
			msgTip: {
				need:  this.option.type === '1' ? true : false,
				hasNew: false,
				count: 0
			},
			// option 组件配置
			// -- type，表示为哪些页面的组件：
			//    0 - 默认
			//    1 - 首页
			//    2 - 通讯录
			//    3 - 聊天窗口
			//    4 - 聊天详情
			//    5 - 个人信息
			//    6 - 朋友圈
			option: {
				type: 1,
				title: 'Fake Wechat',
				backBtn: {
					need: false,
					url: '',
					label: '返回'
				},
				action: {
					icon: 'icon-more'
				}
			}
		}
	},
	// computed: {	
	// },
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
	}
}
</script>

<style lang="stylus">
@import "../assets/css/com/mixin.styl"
@import "../assets/css/com/value.styl"
.vc-header {
    // z_index('n');
    z_index(3);
    background: linear-gradient(180deg,#303036,#3c3b40);
	.action {
		top: 0
		right: 0
	}
}
</style>