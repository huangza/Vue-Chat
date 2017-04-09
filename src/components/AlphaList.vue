<template>
	<div class="alpha-list" :class="{' alpha-list-ava': isAvatar}">
		<div class="alpha-group brd-bottom" :class="{' group-notag': noTag}" v-for="(index, item) in list">
			<div class="group-tag" v-if="!noTag">
				<span>{{index}}</span>
			</div>
			<template v-for="subItem in item">
				<div class="alpha-item" :class="{' alpha-item-arrow': !noArrow}" @touchend="toPersonInfo(subItem)">
					<div class="item-hd" v-if="withIcon">
						<span class="item-icon" v-if="subItem.icon" :class="subItem.icon"></span>
						<img class="item-img" v-if="subItem.avatar" :src="subItem.avatar">
					</div>
					<div class="item-bd">
						<div class="item-title">{{subItem.title || subItem.name}}</div>
					</div>
					<div class="item-ft">
						<span>{{subItem.intro}}</span>
					</div>
				</div>
				<!-- <template v-if="subItem.hrefTo">
					<a class="alpha-item" v-link="subItem.hrefTo" :class="{' alpha-item-arrow': !noArrow}">
						<div class="item-hd" v-if="withIcon">
							<span class="item-icon" v-if="subItem.icon" :class="subItem.icon"></span>
							<img class="item-img" v-if="subItem.avatar" :src="subItem.avatar">
						</div>
						<div class="item-bd">
							<div class="item-title">{{subItem.title}}</div>
						</div>
						<div class="item-ft">
							<span>{{subItem.intro}}</span>
						</div>
					</a>
				</template> -->
				<!-- <template v-else>
					<div class="alpha-item" >
						<div class="item-hd" v-if="withIcon">
							<span class="item-icon" v-if="subItem.icon" :class="subItem.icon"></span>
							<img class="item-img" v-if="subItem.avatar" :src="subItem.avatar">
						</div>
						<div class="item-bd">
							<div class="item-title">{{subItem.title}}</div>
						</div>
						<div class="item-ft">
							<span>{{subItem.intro}}</span>
						</div>
					</div>
				</template> -->
			</template>
		</div>
	</div>
</template>

<script>
export default {
	props: ['initialType', 'initialList'],

	computed:{
		noTag () {
			return this.type.indexOf('0') >= 0;
		},
		withIcon () {
			return this.type.indexOf('1') >= 0;
		},
		withTxt () {
			return this.type.indexOf('2') >= 0;
		},
		withHref () {
			return this.type.indexOf('3') >= 0;
		},
		noArrow () {
			return this.type.indexOf('4') >= 0 || this.type.indexOf('3') < 0;
		},
		isAvatar () {
			return this.type.indexOf('5') >= 0;
		},
		list () {
			return setGroup(this.initialList);
		}
	},

	data () {
		return {
			type: this.initialType.split('-')
		}
	}
}

function setGroup(arr) {
	var retObj = {};
	if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
		return arr;
	}
	arr.forEach(function(item, index, array) {
		var cate = item.category;
		if (retObj[cate] === undefined) {
			retObj[cate] = [];
		}
		retObj[cate].push(item);
	});

	retObj = sortObj(retObj);

	return retObj;
}

function sortObj(obj) {
	var arr = [];
	var retObj = {};
	for(var k in obj) {
		if (obj.hasOwnProperty(k)) {
			arr.push(k);
		}
	}
	arr.sort(function(a, b){
		return a > b ? 1 : (a < b ? -1 : 0);
	});
	for(var i = 0, len = arr.length; i < len; i++) {
		retObj[ arr[i] ] = obj[ arr[i] ];
	}
	obj = null;
	return retObj;
}

// window.setGroup = setGroup;
</script>

<style lang="stylus">
@import "../assets/css/com/mixin.styl"
@import "../assets/css/com/value.styl"
$avatarHeight = 34px
$iconHeight = 24px
.alpha-list
	.group-notag ~ .group-notag
		margin-top: $iconHeight 
	// alpha-group 依赖公共样式的 brd-bottom
	.group-tag
		padding-left: $gap
		span
			display: inline-block
			height: $iconHeight
			line-height: @height
	.alpha-item
		display: flex
		padding: 8px $gap
		background: #fff
		color: #000
		&+.alpha-item
			position: relative
		&+.alpha-item:before
			content: " "
			position: absolute
			left: $gap
			right: 0
			height: 1px
			border-top: 1px solid #dfdfdd
			color: #dfdfdd
			transform: scaleY(0.5)
			top: 0
			transform-origin: 0 0
	.alpha-item.brd-top:before
		left: $gap
	.item-gap
		height: 20px
	.item-hd
		padding-right: $gap
		line-height: 0
	.item-bd
		flex: 1
		height: $iconHeight
		line-height: @height
	.item-ft
		padding-left: $gap
		color: #b2b2b2
		text-align: right
		span
			line-height: $iconHeight
	.item-title
		font-size: 15px
		color: #000
	.alpha-item-arrow
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
	.item-icon
		display: inline-block
		width: $iconHeight
		height: @width
		line-height: @height
		border-radius: ($iconHeight / 10)
		// background-size: cover
	.item-img
		display: inline-block
.alpha-list-ava
	.item-bd
		height: $avatarHeight
		line-height: @height
	.item-img,
	.item-icon
		width: $avatarHeight
		height: @width
		line-height: @height
		border-radius: ($avatarHeight / 10)
</style>