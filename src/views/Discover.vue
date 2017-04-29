<template>
    <div class="noscroll-outer">
    	<div class="noscroll-inner">
    		<div class="wrapper effect">
		    	<div class="list">
			    	<alpha-list :initial-type="func.listType" :initial-list="func.list"></alpha-list>
			    </div>
		    </div>
    	</div>
    </div>
    <router-view transition="cover"></router-view>
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
						content: '朋友圈',
						avatar: '#item-icon-friendcircle',
						intro: '',
						hrefTo: '/discover/friendcircle',
						category: '1'
					},{
						content: '扫一扫',
						avatar: '#item-icon-scan',
						intro: '',
						hrefTo: '/discover?page=scan',
						category: '2'
					},{
						content: '摇一摇',
						avatar: '#item-icon-shake',
						intro: '',
						hrefTo: '/discover?page=shake',
						category: '2'
					},{
						content: '购物',
						avatar: '#item-icon-buy',
						intro: '',
						hrefTo: '/discover?page=buy',
						category: '3'
					},{
						content: '游戏',
						avatar: '#item-icon-game',
						intro: '',
						hrefTo: '/discover?page=game',
						category: '3'
					},{
						content: '小程序',
						avatar: '#item-icon-program',
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
