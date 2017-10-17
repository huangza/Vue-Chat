<template>
	<div class="full-page vc-album">
		<!-- 顶部信息 -->
		<div class="album-hd flexbox">
			<header-bar></header-bar>
		</div>
		<!-- 对话 -->
		<div class="album-bd">
			<div class="album-container">
				<div class="noscroll-outer">
			    	<div class="noscroll-inner">
			    		<div class="wrapper">
			    			<div class="album-cover">
			    				<div class="album-cover-pic">
			    					<img :src="cover" />
			    				</div>
			    				<div class="album-foot">
			    					<span class="album-name">Andre</span>
			    					<img class="album-avatar"
			    						:src="cover"
			    						v-link="{path: 'personinfo', query: {id: user._uid}, append: true}"
			    					/>
			    				</div>
			    			</div>
			    			<div class="album-personintro">有时你不努力一下都不知道什么叫绝望。</div>
			    			<div class="album-list">
			    				<div class="album-item">
			    					<div class="item-left">
			    						<span class="item-time-big">5</span><span>11月</span>
			    					</div>
			    					<div class="item-right">
			    						<div class="item-txt">经过无穷幻变天气 总不分离</div>
			    					</div>
			    				</div>
			    			</div>
					    </div>
			    	</div>
			    </div>
			</div>
		</div>

	    <router-view transition="cover"></router-view>
	</div>
</template>

<script>
import HeaderBar from 'components/Header'
import {header} from 'vx/actions'
import {getUser} from 'vx/getters'
export default {

    vuex: {
        actions: {
            updateHeader: header
        },
        getters: {
        	user: getUser
        }
    },

	route: {
		activate (transition) {
			// this.person = []
            this.$parent.$emit('route-pipe', true)
            transition.next()
        },
        data (transition) {
            setTimeout( () => {
            	const {query} = transition.to;
				let label = '我';
				query.from === 'friendcircle' && (label = '朋友圈')

				this.updateHeader({
		            type: 8,
		            title: '相册',
		            backBtn: {
		                need: true,
		                label: label
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
			// user: this.initialUser,
			cover: './static/profile/user/pic.jpg'
		}
	},

	// computed: {
	// 	hdOption () {
	// 		const query = this.$route.query;
	// 		let label = '我';
	// 		if (query.from) {
	// 			query.from === 'friendcircle' && (label = '朋友圈');
	// 		}
	// 		return {
	//             type: 8,
	//             title: '相册',
	//             backBtn: {
	//                 need: true,
	//                 label: label
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
			let path = '/me';
			const query = this.$route.query;
			if (query.from) {
				query.from === 'friendcircle' && (path = '/discover/friendcircle');
			}
			this.$router.go({
				path: path
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
.vc-album {
	z_index('sc')
	.album-hd {
		position: absolute
		top: 0
		left: 0
		right: 0
		height: $header-h
		color: #fff
	    background: linear-gradient(180deg,#303036,#3c3b40)
		z_index('sn')
	}
	.album-bd {
		width: 100%
		height: 100%
		// padding-top: $header-h
	}
	.album-container {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.album-cover {
		width: 100%;
		text-align: center;
		position: relative;
		margin-bottom: 30px;
	}
	.album-cover-pic {
		width: 100%;
		height: 5.62705rem;
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
	.album-personintro {    
		margin-bottom: 32px;
		text-align: right;
		font-size: 12px;
		color: #6f6d68;
	}
	.album-item {
		display: flex;
		padding: 0 9px 15px;
		.item-left {
			width: 55px;
			text-align: left;
			font-size: 12px;
			line-height: 1;
		}
		.item-time-big {
			font-size: 23px;
			vertical-align: sub;
			font-weight: bold;
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
			width: 4.68406rem;
			color: #000;
			font-size: 14px;
			line-height: 30px;
			text-indent: .5em;
			margin-bottom: 10px;
			background: #f3f3f5;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
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
			width: 18.67px;
			height: 13.34px;
			margin-left: 5px;
			line-height: @height;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>