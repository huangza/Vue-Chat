<template>
    <div class="wrapper effect">
    	<div class="list">
	    	<alpha-list :initial-type="func.listType" :initial-list="func.list"></alpha-list>
	    </div>
    </div>
</template>

<script>
import AlphaList from 'components/AlphaList'
export default {

	props: ['initialUser'],

    route: {
        activate (transition) {
            // console.log('discover activate')
            this.$dispatch('page', 'discover')
            transition.next()
        } 
    },

    components: {
        AlphaList
    },

    data () {
    	return {
    		func: {
	    		listType: '0-1-2-3',
	    		list: [
					{
						title: '朋友圈',
						icon: ' item-icon-friendcircle',
						avatar: '',
						intro: '',
						hrefTo: '/discover?page=friendcircle',
						category: '1'
					},{
						title: '扫一扫',
						icon: ' item-icon-scan',
						avatar: '',
						intro: '',
						hrefTo: '/discover?page=scan',
						category: '2'
					},{
						title: '摇一摇',
						icon: ' item-icon-shake',
						avatar: '',
						intro: '',
						hrefTo: '/discover?page=shake',
						category: '2'
					},{
						title: '购物',
						icon: ' item-icon-buy',
						avatar: '',
						intro: '',
						hrefTo: '/discover?page=buy',
						category: '3'
					},{
						title: '游戏',
						icon: ' item-icon-game',
						avatar: '',
						intro: '',
						hrefTo: '/discover?page=game',
						category: '3'
					},{
						title: '小程序',
						icon: ' item-icon-program',
						avatar: '',
						intro: '',
						hrefTo: '/discover?page=program',
						category: '4'
					}
	    		]
    		}
    	}
    }
}
</script>
