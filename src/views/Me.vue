<template>	
    <div class="noscroll-outer">
    	<div class="noscroll-inner">
    		<div class="wrapper effect">
				<div class="user list">
					<chat-list :initial-type="type" :initial-list="user"></chat-list>
				</div>
				<div class="list" >
					<alpha-list :initial-type="func.type" :initial-list="func.list" :handle-click="toPage"></alpha-list>
				</div>
		    </div>
    	</div>
    </div>
    <router-view transition="cover"></router-view>
</template>

<script>
import ChatList from 'components/ChatList'
import AlphaList from 'components/AlphaList'

import {header} from 'vx/actions'
import {meFuncs} from 'vx/getters'

export default {

	props: ['initialUser'],

    vuex: {
        actions: {
            updateHeader: header
        },
        getters: {
        	func: meFuncs
        }
    },

    route: {
        activate (transition) {
            // this.$dispatch('page', 'me')
            // console.log('me activate')
            transition.next()
        },
        data (transition) {
        	// console.log('me data')
	    	this.updateHeader({
	    		type: 4,
		        title: '我',
		        backBtn: {
		            need: false
		        },
		        action: {
		            type: 0
		        }
	    	})
            transition.next()
        }
    },

    ready() {
    	// console.log('me ready')
    },

	components: {
		ChatList,
		AlphaList
	},

	data () {
		return {
			type: 1,
			// user: [
			// 	{
			// 		_uid: '0000000000000000',
			// 		name: 'Andre爱喝抹茶拿铁',
	  //               avatar: "./static/profile/user/pic.jpg",
			// 		vcid: 'A_Dreamliker',
			// 		gender: 1,
			// 		intro: '',
			// 		region: '广东 深圳',
			// 		avatarRight: false
			// 	}
			// ],
			user: this.initialUser,
		}
	},

	// computed: {
		// user () {
		// 	let tempName = this.initialUser[0].name;
		// 	let temp = util.extend({}, this.initialUser[0]);
		// 	temp.name = undefined;
		// 	let arr = [];
		// 	arr.push( util.extend({content: tempName}, temp) );
		// 	return arr;
		// }
	// },

	events: {
		'to-userinfo' () {
			let tempName = this.user[0].name;
			let temp = util.extend({}, this.user[0]);
			temp.name = undefined;
			// let arr = [];
			// arr.push( util.extend({content: tempName}, temp) );
			// return arr;
			this.$broadcast('getUserInfo', util.extend({content: tempName}, temp));
			// this.$broadcast('getUserInfo', util.extend({}, this.user[0]));
		}
	},

	methods: {
		toPage(item) {
			let _path = '/404'

            if (item.hrefTo) { 
                if (item.hrefTo === 'javascript:;') {
                    return
                } 
                _path = item.hrefTo
            } else {
                return
            }

            this.$router.go({
                path: _path
            })
		}
	}
}
</script>

<style lang="stylus">
.user
	padding-bottom: 24px
</style>
