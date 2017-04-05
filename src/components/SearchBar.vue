<template>
	<div class="vc-search-bar brd-bottom">
		<div 
		class="search-box"
		v-show="showInput">
			<i class="search-icon iconfont icon-search"></i>
			<input 
			type="search" 
			id="searchInput" 
			class="search-input" 
			placeholder="搜索" 
			v-model="query"
			required>
			<a href="javascript:;" class="iconfont icon-clear search-clear" id="searchClear" v-show="showClear" @touchend="clearQuery">X</a>
		</div>
		<label 
		for="searchInput" 
		id="searchTxt" 
		class="search-label"
		v-show="!showInput"
		@touchend="toggleInput">
			<i class="search-icon iconfont icon-search"></i>
			<span>&nbsp;搜索&nbsp;</span>
		</label>
		<a href="javascript:;" id="searchCancel" 
		class="search-cancel"
		v-show="showInput"
		@touchend="toggleInput">取消</a>
	</div>
</template>

<script>
export default {
	ready () {
	},
	data () {
		return {
			showInput: false,
			query: ''
		}
	},

	computed: {
		showClear () {
			if (this.query) {
				return this.query.length > 0 ? true : false
			} else {
				return false
			}
		}
	},

	methods: {
		toggleInput (flag) {
			this.showInput = !this.showInput
		},
		clearQuery () {
			this.showClear = false
			this.query = ''
		}
	}
}
</script>

<style lang="stylus">
@import '../assets/css/com/mixin.styl'
@import '../assets/css/com/value.styl'
.vc-search-bar {
	position: relative
	display: flex
	height: 44px
	padding: 8px
	line-height: 1
	.search-icon {
		color: #8d8e92
	}
	.search-label {
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
		z_index(2)
		span {
			display: inline-block
		}
		i,
		span {
			vertical-align: middle
			height: 26px
			line-height: 24px
		}
	}
	.search-box {
		position: relative
		flex: 1
		line-height: 28px
		background: #fff
		padding: 0 30px
		border-radius: 3px
		z_index(1)
		.search-icon {
			position: absolute
			top: 0
			left: $gap
			line-height: 28px
			vertical-align: middle
		}
	}
	.search-input {
		width: 100%
		height: 28px
		line-height: @height
		padding: 4px 0
		border: none
		font-size: 14px
		&::-webkit-input-placeholder {
			color: #8d8e92
		}
		&:-moz-placeholder {
			color: #8d8e92
		}
		&::-moz-placeholder {
			color: #8d8e92
		}
		&:-ms-input-placeholder {
			color: #8d8e92
		}
	}
	.search-clear {
		position: absolute
		top: 6px
		right: $gap
		width: 16px
		height: @width
		line-height: @height
		font-size: 14px
		text-align: center
		border-radius: 50%
		color: #fff
		background: $app-bg
	}
	.search-cancel {
		margin-left: 10px
		line-height: 28px
		color: #09BB07;
		white-space: nowrap
	}
}
</style>