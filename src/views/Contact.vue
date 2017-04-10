<template>
    <div class="wrapper effect" :class="{'effect--30': fade}">
    	<search-bar></search-bar>
	    <div class="list">
	    	<alpha-list :initial-type="func.listType" :initial-list="func.list"></alpha-list>
	    	<alpha-list :initial-type="contactListType" :initial-list="contactList"></alpha-list>
	    </div>
    </div>
    <router-view keep-alive transition="cover"></router-view>
</template>

<script>
import SearchBar from 'components/SearchBar'
import AlphaList from 'components/AlphaList'
export default {

	created () {
		this.getFriends()
		// this.getFriends_PROD()
	},

    route: {
        activate (transition) {
            // console.log('contact activate')
            this.$dispatch('page', 'contact')
            transition.next()
        }
    },

	props: ['initialUser'],

    components: {
        SearchBar,
        AlphaList
    },

    computed: {
    	contactList () {
    		return this.friends.concat(this.user)
    	}
    },

    data () {
    	return {
    		func: {
	    		listType: '0-1-2-4-5',
	    		list: [
					{
						title: '新的朋友',
						icon: ' item-icon-newfriend',
						avatar: '',
						intro: '',
						hrefTo: '',
						category: 'func'
					},{
						title: '群聊',
						icon: ' item-icon-group',
						avatar: '',
						intro: '',
						hrefTo: '',
						category: 'func'
					},{
						title: '标签',
						icon: ' item-icon-tag',
						avatar: '',
						intro: '',
						hrefTo: '',
						category: 'func'
					},{
						title: '公众号',
						icon: ' item-icon-public',
						avatar: '',
						intro: '',
						hrefTo: '',
						category: 'func'
					}
	    		]
    		},
    		contactListType: '1-2-4-5',
    		friends: [],
    		user: this.initialUser,
    		apiUrl: '/api/contact',
    		apiUrl_PROD: './static/mock/data.json',
            fade: false
    	}
    },

    events: {
        'route-pipe' (_fade) {
            this.fade = _fade
            this.$parent.$emit('route-pipe', _fade)
        },
        'to-personinfo' (index) {
            var fields = ['_uid', 'name', 'vcid', 'region', 'avatar']
            // console.log('*No: ' + index)
            if (util.typeof(index) === 'string') {
                var res = this.friends.filter(function(item){
                    if (item._uid === index) {
                        return item
                    }
                })[0]
                var person = {};
                for(var k in res) {
                    if (res.hasOwnProperty(k) && fields.indexOf(k) > -1) {
                        person[k] = res[k]
                    }
                }
                // console.log('contact', person)
                // console.log('contact', new Date())
                this.$broadcast('getPersonInfo', person)
            }
        }
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
    				vm.$set('friends', res.body.contact)
    			} )
    	}
    }
}
</script>
