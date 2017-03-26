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
				hasNew: true,
				count: 100
			}
		}
	},
	components: {
		ActionBar
	}
}
</script>

<style lang="stylus">
.vc-header
	.action
		top: 0
		right: 0
</style>