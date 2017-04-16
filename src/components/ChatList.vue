<template>
	<div class="vc-chat-list">
		<template v-if="isUser">
			<div class="chat-item user-item item-arrow">
				<a href="javascript:;">
					<div class="item-hd">
						<img :src="list[0].avatar" class="chat-avatar" v-if="!list[0].avatarRight">
					</div>
					<div class="item-bd">
						<div class="item-title">{{list[0].name}}</div>
						<div class="item-txt">微信号:&nbsp;{{list[0].vcid}}</div>
					</div>
					<div class="item-ft"></div>
				</a>
			</div>
		</template>
		<template v-else>
			<div class="chat-item" v-for="item in list" :class="{' brd-bottom': $index < list.length-1}">
				<a href="javascript:;" @touchend="toDialogue(item)">
					<div class="item-hd" :class="{' chat-badge': item.newMsg}">
						<img :src="item.avatar" class="chat-avatar">
						<span class="item-badge" :class="{' item-badge-dot': item.msgCount === 0}" v-if="item.newMsg">{{item.msgCount | msgFormat}}</span>
					</div>
					<div class="item-bd">
						<div class="item-title">{{item.name}}</div>
						<div class="item-txt">{{item.latestWord}}</div>
					</div>
					<div class="item-ft">{{item.latestTime}}</div>
				</a>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	props: ['initialType', "initialList"],

	computed: {
		list () {
			return this.initialList;
		}
	},
	
	data () {
		return {
			isUser: this.initialType ? this.initialType : false,
			// list: this.initialList,
			test: this.initialList[0]
		}
	},

	methods: {
		toDialogue (item) {
			// console.log(item)
			// alert(item.name)
			// this.target = $index
			// this.$parent.$emit('to-dialogue', index)
			let id = item._uid
			// alert(1)
			util.setLocal('chatfriend', id)
			// localStorage['chatfriend'] = id
			// alert(localStorage['chatfriend'])
			this.$router.go({
				path: '/chat/dialogue'
			})
		}
	}
}
</script>

<style lang="stylus">
@import '../assets/css/com/value.styl'
$userHeight = 60px

.vc-chat-list
	.brd-bottom:after
		left: 10px
	.chat-item
		padding: 8px $gap
		background: #fff
		a
			display: flex
	.item-hd
		display: inline-block
		padding-right: 10px
	.item-bd
		flex: 1
		overflow: hidden
	.item-ft
		font-size: 12px
		color: #b2b2b2
		padding-left: $gap
		line-height: ($chatAvatar / 2) + 2
	.chat-avatar
		display: inline-block
		width: $chatAvatar
		height: @width
		border-radius: 5px
	.item-title
		font-size: 15px
		color: #000
		// height: 26px
		height: ($chatAvatar / 2) + 2
		line-height: @height
	.item-txt
		font-size: 13px
		color: #9c9c9c
		height: ($chatAvatar / 2) - 2
		line-height: @height
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
	.chat-badge
		position: relative
	.item-badge
		display: inline-block
		padding: .15em .4em
		min-width: 8px
		border-radius: 18px
		background-color: #F43530
		color: #FFFFFF
		line-height: 1.2
		text-align: center
		font-size: 12px
		vertical-align: middle
		// 写死的定位
		position: absolute
		top: -6px
		right: 6px
	.item-badge-dot
		padding: .4em
		min-width: 0
		// 写死的定位
		position: absolute
		top: -3px
		right: 6px
	.item-arrow
		.item-ft
			position: relative
			padding-right: 25px
			&:after
				content: ' '
				position: absolute
				top: 50%
				right: 8px
				display: inline-block
				width: 8px
				height: 8px
				border-width: 2px 2px 0 0
				border-color: #C8C8CD
				border-style: solid
				margin-top: -4px
				background: transparent
				transform: rotateZ(45deg)
	.user-item
		.chat-avatar
			width: $userHeight
			height: @width
			line-height: @height
			border-radius: 0
		.item-title
			height: ($userHeight / 2) + 2
			line-height: @height
		.item-txt
			color: #000
			height: ($userHeight / 2) - 2
			line-height: @height
			overflow: hidden
			text-overflow: ellipsis
			white-space: nowrap
</style>