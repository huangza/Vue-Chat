<template>
	<div class="full-page vc-friendcircle">
		<!-- 顶部信息 -->
		<div class="friendcircle-hd flexbox">
			<header-bar></header-bar>
		</div>
		<!-- 对话 -->
		<div class="friendcircle-bd">
			<div class="friendcircle-container">
				<div class="noscroll-outer">
			    	<div class="noscroll-inner">
			    		<div class="wrapper">
					    </div>
			    	</div>
			    </div>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderBar from 'components/Header'
export default {

	route: {
		activate (transition) {
			this.person = []
            this.$parent.$emit('route-pipe', true)
            transition.next()
        },
        data (transition) {
            setTimeout( () => {
                transition.next({})
	            this.$parent.$emit('to-userinfo')
            } )
        },
		deactivate (transition) {
            this.$parent.$emit('route-pipe', false)
            transition.next()
        },
	},

	components: {
		HeaderBar
	},

	data () {
		return {
			type: 2,
			user: [{}]
		}
	},

	computed: {
		hdOption () {
			return {
	            type: 8,
	            title: '朋友圈',
	            backBtn: {
	                need: true,
	                label: '发现'
	            },
	            action: {
	            	type: 8
	            }
	        }
		}
	},

	events: {
		'getUserInfo' (_person) {
			if (util.typeof(_person) === 'object') {
				this.user = [];
				this.user.push(_person)
				// console.log(this.user)
	            this.$broadcast('set-header', this.hdOption)
			}
		},
		'goback' () {
			this.$router.go({
				path: '/discover'
			})
		}
	},

	// methods: {
	// 	goBack () {
	// 		util.delLocal('contactfriend')
	// 		this.$router.go({
	// 			path: '/contact'
	// 		})
	// 	}
	// }
}
</script>

<style lang="stylus">
@import '../assets/css/com/mixin.styl'
@import '../assets/css/com/value.styl'
.vc-friendcircle {
	z_index('sc')
	.friendcircle-hd {
		position: absolute
		top: 0
		left: 0
		right: 0
		// display: flex
		height: $header-h
		// line-height: @height
		// padding: $gap
		color: #fff
	    background: linear-gradient(180deg,#303036,#3c3b40)
		z_index('sn')
	}
	.friendcircle-bd {
		width: 100%
		height: 100%
		padding: $header-h 0 $footer-h 0
	}
	.item-bd-3 {
		.item-title {
			height: 24px
			line-height: @height
		}
		.item-txt {
			height: 18px
			line-height: @height
			color: #888
		}
	}
}
</style>