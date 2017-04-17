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
</template>

<script>
import ActionBar from './ActionBar'
export default {
	data () {
		return {
			msgTip: {
				hasNew: false,
				count: 0
			}
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
	}
}
</script>

<style lang="stylus">
@import "../assets/css/com/mixin.styl"
@import "../assets/css/com/value.styl"
.vc-header
    z_index('n');
    background: linear-gradient(180deg,#303036,#3c3b40);
	.action
		top: 0
		right: 0
</style>