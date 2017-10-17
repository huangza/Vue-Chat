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

			    			<div class="album-cover">
			    				<div class="album-cover-pic">
			    					<img :src="cover" />
			    				</div>

			    				<div class="album-foot">
			    					<span class="album-name">Andre</span>
			    					<img :src="cover" class="album-avatar" v-link="{ path: '/discover/friendcircle/album', query: { from: 'friendcircle'}}" />
			    				</div>
			    			</div>

			    			<div class="friendcircle-list">

			    				<div class="friendcircle-item">
			    					<div class="item-left">
			    						<img :src="cover" alt="" class="item-avatar" />
			    					</div>

			    					<div class="item-right">
			    						<div class="item-name">ABC君</div>

			    						<div class="item-txt">测试<br>第二行<br>Line Three</div>

			    						<div class="item-img item-img-multi col-3">
			    							<img :src="cover">
			    							<img :src="cover">
			    							<img :src="cover">
			    							<img :src="cover">
			    						</div>

			    						<div class="item-ft">
			    							<div class="item-time">7分钟前</div>

			    							<div class="item-comment">
				    							<img src="../assets/images/comment.png" @click="toggleCommentActive">

				    							<div class="item-actions" :class="{' active': commentActive}">
				    								<div class="actions-wrapper">
				    									<div class="action">□ 赞</div>
					    								<div class="action">□ 评论</div>
				    								</div>
				    							</div>
				    						</div>
			    						</div>
			    					</div>
			    				</div>

			    				<div class="friendcircle-item">
			    					<div class="item-left">
			    						<img :src="cover" alt="" class="item-avatar" />
			    					</div>

			    					<div class="item-right">
			    						<div class="item-name">XYZ君</div>
			    						<div class="item-txt">测试<br>第二行<br>Line Three</div>
			    						<div class="item-img item-img-single">
			    							<img :src="cover">
			    						</div>
			    						<div class="item-ft">
			    							<div class="item-time">27分钟前</div>
			    							<div class="item-comment"><img src="../assets/images/comment.png"></div>
			    						</div>
			    					</div>
			    				</div>

			    			</div><!-- friendcircle-list end -->
					    </div>
			    	</div>
			    </div>
			</div><!-- friendcircle-container end -->
		</div>

	    <router-view transition="cover"></router-view>
	</div>
</template>

<script>
import HeaderBar from 'components/Header'
import {header} from 'vx/actions'
export default {

	props: ['initialUser'],

    vuex: {
        actions: {
            updateHeader: header
        }
    },

	route: {
		activate (transition) {
			console.log(1)
			// this.person = []
            this.$parent.$emit('route-pipe', true)
            // this.$broadcast('set-header', this.hdOption)
            transition.next()
        },
        data (transition) {
			console.log(2)
            setTimeout( () => {
            	this.updateHeader({
					type: 8,
		            title: '朋友圈',
		            backBtn: {
		                need: true,
		                label: '发现'
		            },
		            action: {
		            	type: 0
		            }
				})
                transition.next({})
	            // this.$parent.$emit('to-userinfo')
            } )
        },
		deactivate (transition) {
			console.log(3)
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
			user: this.initialUser,
			cover: './static/profile/user/pic.jpg',
			myAlbum: '/me/album?back=discover',
			commentActive: false
		}
	},

	// computed: {
	// 	hdOption () {
	// 		return {
	//             type: 8,
	//             title: '朋友圈',
	//             backBtn: {
	//                 need: true,
	//                 label: '发现'
	//             },
	//             action: {
	//             	type: 0
	//             }
	//         }
	// 	}
	// },

	events: {
		// 'getUserInfo' (_person) {
		// 	if (util.typeof(_person) === 'object') {
		// 		this.user = [];
		// 		this.user.push(_person)
		// 		// console.log(this.user)
	 //            this.$broadcast('set-header', this.hdOption)
		// 	}
		// },
		'goback' () {
			this.$router.go({
				path: '/discover'
			})
		}
	},

	methods: {
		toggleCommentActive() {
			this.commentActive = !this.commentActive
		}
	// 	goBack () {
	// 		util.delLocal('contactfriend')
	// 		this.$router.go({
	// 			path: '/contact'
	// 		})
	// 	}
	}
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
		height: $header-h
		color: #fff
	    background: linear-gradient(180deg,#303036,#3c3b40)
		z_index('sn')
	}
	.friendcircle-bd {
		width: 100%
		height: 100%
		// padding-top: $header-h
	}
	.friendcircle-container {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.album-cover {
		width: 100%;
		text-align: center;
		position: relative;
		margin-bottom: 49px;
	}
	.album-cover-pic {
		width: 100%;
		height: 4.63768rem;
		position: relative;
		text-align: left;
		overflow: hidden;
		img {
			position: absolute;
			bottom: 0;
			display: inline-block;
			width: 100%;
		}
	}
	.album-foot {
		position: absolute;
		bottom: -24px;
		right: 9.3px;
	}
	.album-name {
		font-size: 16px;
		color: #fff;
		text-shadow: 0 3px 3px #333;
		margin-right: 17px;
	}
	.album-avatar {
		display: inline-block;
		width: 78px;
		height: @width;
		padding: 3px;
		border: 1px solid #d4d4d4;
		background-color: #fff;
	}
	.friendcircle-item {
		display: flex;
		padding: 0 20px 15px;
		&+.friendcircle-item {
			position: relative;
			padding-top: 15px;
			&:before {
				content: " ";
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				height: 1px;
				border-top: 1px solid #dfdfdd;
				color: #dfdfdd;
				trans-origin(0 0);
				trans-scaleY(0.5);
			}
		}
		.item-left {
			padding-right: 10px;
		}
		.item-right {
			flex: 1;
		}
		.item-avatar {
			width: 42px;
			height: @width;
		}
		.item-name {
			color: #576a95;
			font-size: 14px;
			line-height: 20px;
		}
		.item-txt {
			color: #000;
			font-size: 14px;
			line-height: 18.3px;
			margin-bottom: 10px;
		}
		.item-img {
			margin-bottom: 10px;
		}
		.item-img-single {
			width: 2.67440rem;
			img {
				width: 100%;
			}
		}
		.item-img-multi {
			font-size: 0;
			img {
				width: 1.32947rem;
				margin-right: 5px;
				margin-bottom: 5px;
			}
		}
		.col-2 {
			max-width: 2.9rem;
		}
		.col-3 {
			max-width: 4.3rem;
		}
		.item-ft {
			display: flex;
			align-items: center;
		}
		.item-time {
			flex: 1;
			font-size: 12px;
			color: #737373;
		}
		.item-comment {
			position: relative
			width: 18.67px
			height: 13.34px
			margin-left: 5px
			line-height: @height
			img {
				width: 100%
				height: 100%
			}
		}
		.item-actions {
			position: absolute
			// top: 0
			// right: 0
			// transform: translate(-21px, -11px)
			// top: -11px
			top: -((37.33px - 13.34px) / 2)
			right: 21px
			width: 174px
			// width: 1.314rem * 2 + 0.1rem
			text-align: center
			overflow: hidden
			.actions-wrapper {
				transition: transform .15s linear
				transform: translateX((@width))
				border-radius: 4px
				background: #4e5255
			}
			.action {
				display: inline-block
				width: 85px
				// width: $actionW = 1.314rem
				// width: ((@width - 0.1rem) / 2)
				height: 37.33px
				// height: 0.577rem
				line-height: @height
				color: #fff
				&+.action {
					position: relative
					&:before {
						content: ' '
						position: absolute
						top: ((@height - 15px) / 2)
						left: 0
						display: block
						width: 1px
						height: 15px
						background: #3a4043
					}
				}
			}
			&.active {
				.actions-wrapper {
					transform: translateX(0)
				}
			}
		}
	}
}
</style>