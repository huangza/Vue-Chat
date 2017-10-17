<template>
    <div class="noscroll-outer">
        <div class="noscroll-inner">
            <div class="wrapper effect" :class="{'effect--30': fade}">
                <search-bar></search-bar>
                <div class="list">
                    <alpha-list :initial-type="specialGroup.type" :initial-list="specialGroup.list" :handle-click="toPage"></alpha-list>
                    <alpha-list :initial-type="friends.type" :initial-list="contactList" :handle-click="toPersonInfo"></alpha-list>
                </div>
            </div>
        </div>
    </div>
    <router-view transition="cover"></router-view>
</template>

<script>
import SearchBar from 'components/SearchBar'
import AlphaList from 'components/AlphaList'

import {header, friendList} from 'vx/actions'
import {getUser, getSpecialGroup, getFriendList} from 'vx/getters'

export default {

	created () {
		// this.getFriends()
		this.getFriends_PROD()
	},

    route: {
        activate (transition) {
            // console.log('contact activate')
            // this.$dispatch('page', 'contact')
            transition.next()
        },
        data (transition) {
            this.updateHeader({
                type: 2,
                title: '通讯录',
                backBtn: {
                    need: false
                },
                action: {
                    type: 2,
                    url: '/contact/add-friends',
                    icon: 'icon-tips-add-friend'
                }
            })
            transition.next()
        }
    },

	props: ['initialUser'],

    vuex: {
        actions: {
            updateHeader: header,
            updateFriendList: friendList
        },
        getters: {
            user: getUser,
            specialGroup: getSpecialGroup,
            friends: getFriendList
        }
    },

    ready() {
        // console.log(this.initialUser)
        // console.log(this.contactList)
        // console.log(new Date())
        // console.log('ready', this.user._uid)
    },

    components: {
        SearchBar,
        AlphaList
    },

    data () {
    	return {
    	// 	func: {
	    // 		listType: '0-1-2-4-5',
	    // 		list: [
					// {
					// 	content: '新的朋友',
					// 	avatar: '#item-icon-newfriend',
					// 	intro: '',
					// 	hrefTo: '/contact/add-friends',
					// 	category: 'func'
					// },{
					// 	content: '群聊',
					// 	avatar: '#item-icon-group',
					// 	intro: '',
					// 	hrefTo: '/contact/group-chat',
					// 	category: 'func'
					// },{
					// 	content: '标签',
					// 	avatar: '#item-icon-tag',
					// 	intro: '',
					// 	hrefTo: '/contact/tag',
					// 	category: 'func'
					// },{
					// 	content: '公众号',
					// 	avatar: '#item-icon-public',
					// 	intro: '',
					// 	hrefTo: '/contact/public',
					// 	category: 'func'
					// }
	    // 		]
    	// 	},
    		// contactListType: '1-2-4-5',
    		// friends: [],
    		// user: this.initialUser,
    		apiUrl: '/api/contact',
    		apiUrl_PROD: './static/mock/data.json',
            fade: false
    	}
    },

    computed: {
        contactList () {
            // console.log(new Date())
            // console.log('com', this.user._uid)
            return this.friends.list.concat(this.user)
        }
    },

    events: {
        'route-pipe' (_fade) {
            this.fade = _fade
            this.$parent.$emit('route-pipe', _fade)
        },
        // 'to-personinfo' (index) {
        //     var fields = ['_uid', 'name', 'vcid', 'region', 'avatar', 'remark']
        //     // console.log('*No: ' + index)
        //     if (util.typeof(index) === 'string') {
        //         var res = this.contactList.filter(function(item){
        //             // if (item._uid === index) {
        //                 // return item
        //             // }
        //             return item._uid === index
        //         })[0]
        //         var person = {};
        //         for(var k in res) {
        //             if (res.hasOwnProperty(k) && fields.indexOf(k) > -1) {
        //                 person[k] = res[k]
        //             }
        //         }
        //         // console.log('contact', res)
        //         // console.log('contact', person)
        //         // console.log('contact', new Date())
        //         this.$broadcast('getPersonInfo', person)
        //     }
        // }
    },

    methods: {
    	getFriends () {
    		var vm = this;
    		vm.$http.get(vm.apiUrl)
    			.then( (res) => {
    				vm.$set('friends', res.body.data)
    			} )
    	},
    	getFriends_PROD () {
    		var vm = this;
    		vm.$http.get(vm.apiUrl_PROD)
    			.then( (res) => {
    				// vm.$set('friends', res.body.contact)
                    this.updateFriendList(res.body.contact)
                    // console.log('update', new Date(), this.contactList.)
    			} )
    	},
        toPersonInfo (item) {
            let id = item._uid
            var _path = '/contact/personinfo'

            // 将数据存在localStorage
            util.setLocal('contactfriend', id)

            this.$router.go({
                path: _path,
                query: {
                    id
                }
            })
        },
        toPage (item) {
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
