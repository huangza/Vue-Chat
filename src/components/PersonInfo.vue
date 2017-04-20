<template>
	<div class="full-page vc-personinfo">
		<!-- 顶部信息 -->
		<div class="personinfo-hd flexbox">
			<header-bar></header-bar>
		</div>
		<!-- 对话 -->
		<div class="personinfo-bd">
			<div class="personinfo-container">
			</div>
		</div>
	</div>
</template>

<script>
import HeaderBar from 'components/Header'
export default {

	route: {
		activate (transition) {
            this.$parent.$emit('route-pipe', true)
            // this.$parent.$emit('to-personinfo', util.getLocal('chatfriend'))
            // console.log('person route', new Date())
            transition.next()
            // console.log('activate: ' + new Date())
        },
        data (transition) {
            setTimeout( () => {
                transition.next({})
	            this.$parent.$emit('to-personinfo', util.getLocal('contactfriend'))
                // console.log('data: ' + new Date())
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
			friend: {}
		}
	},

	computed: {
		hdOption () {
			return {
	            type: 7,
	            title: '详细资料',
	            backBtn: {
	                need: true,
	                // url: '/contact',
	                label: '返回'
	            },
	            action: {
	            	type: 2,
	            	// url: '',
	                icon: 'icon-more'
	            }
	        }
		}
	},

	events: {
		'getPersonInfo' (_person) {
			if (util.typeof(_person) === 'object') {
				this.friend = _person
	            this.$broadcast('set-header', this.hdOption)
			}
		},
		'goback' () {
			util.delLocal('contactfriend')
			this.$router.go({
				path: '/contact'
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
.vc-personinfo {
	z_index('sc')
	.personinfo-hd {
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
	.personinfo-bd {
		width: 100%
		height: 100%
		padding: $header-h 0 $footer-h 0
	}
}
</style>