<template>
	<div class="vc-search-bar brd-bottom">
		<label 
		for="searchInput" 
		id="searchTxt" 
		class="search-label"
		v-show="!showInput"
		@click="toggleInput">
			<i class="search-icon fa fa-search"></i>
			<span>&nbsp;搜索&nbsp;</span>
		</label>
		<div 
		class="search-box"
		v-show="showInput">
			<i class="search-icon fa fa-search"></i>
			<input 
			type="search" 
			id="searchInput" 
			class="search-input" 
			placeholder="搜索" 
			required>
			<a href="javascript:;" class="icon icon-clear search-clear" id="searchClear"></a>
		</div>
		<a href="javascript:;" id="searchCancel" 
		class="search-cancel"
		v-show="showInput"
		@click="toggleInput">取消</a>
	</div>
</template>

<script>
export default {
	ready () {
		console.dir(toString.call(this.$el))
		// document.addEventListener('click', (e) => {
		//     if( !this.$el.contains(e.target) )  this.showInput = false
		// })
		// document.addEventListener('touchend', (e) => {
		//     if( !this.$el.contains(e.target) )  this.showInput = false
		// })
	},
	data () {
		return {
			showInput: false
		}
	},
	methods: {
		toggleInput (flag) {
			this.showInput = !this.showInput
		}
	}
}
</script>

<style lang="stylus">
.vc-search-bar
	position: relative
	display: flex
	height: 44px
	padding: 8px
	line-height: 1
	.search-icon
		color: #8d8e92
	.search-label
		// display: none
		position: absolute
		left: 8px
		right: 8px
		height: 28px
		line-height: @height - 2
		background: #fff
		border-radius: 3px
		border: 1px solid #e5e5ea
		text-align: center
		color: #8f8d94
		font-size: 14px
		span
			display: inline-block
		i,
		span
			vertical-align: middle
			height: 26px
			line-height: 24px
	.search-box
		flex: 1
		line-height: 28px
		background: #fff
		padding: 0 30px
		border-radius: 3px
		.search-icon
			position: absolute
			top: 8px
			left: 18px
			line-height: 28px
	.search-input
		height: 28px
		line-height: @height
		padding: 4px 0
		border: none
		font-size: 14px
		&::-webkit-input-placeholder
			color: #8d8e92
		&:-moz-placeholder
			color: #8d8e92
		&::-moz-placeholder
			color: #8d8e92
		&:-ms-input-placeholder
			color: #8d8e92
	.search-cancel
		margin-left: 10px
		line-height: 28px
		color: #09BB07;
		white-space: nowrap;
</style>