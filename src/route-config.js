import store from 'vx/store'

import Chat from './views/Chat'
import Contact from './views/Contact'
import Discover from './views/Discover'
import Me from './views/Me'

export default function(router) {
	// 聊天窗口
	const dialogue = {
		// name: 'dialogue',
		component: require('./views/Dialogue')
	}

	// 个人资料
	const personInfo = {
		component: require('./views/PersonInfo'),
		subRoutes: {
			'/dialogue': dialogue
		}
	}

	// 个人相册
	const album = {
		component: require('./views/Album'),
		subRoutes: {
			'/personinfo': personInfo
		}
	}

	// 朋友圈
	const friendCircle = {
		component: require('./views/FriendCircle'),
		subRoutes: {
			'/album': album,
			'/personinfo': personInfo
		}
	}

	// 相互引用
	personInfo.album = album
	dialogue.personinfo = personInfo

	// 路由表
	router.map({
		'/chat': {
			component: Chat,
			subRoutes: {
				'/dialogue': dialogue
			}
		},
		'/contact': {
			component: Contact,
			subRoutes: {
				'/personinfo': personInfo
			}
		},
		'/discover': {
			component: Discover,
			subRoutes: {
				'/friendcircle': friendCircle
			}
		},
		'/me': {
			component: Me,
			subRoutes: {
				'/userinfo': {
					component: require('./views/UserInfo')
				},
				'/album': album
			}
		},
		'*': {
			name: '404',
			component: require('./views/404')
		}
	})

	router.redirect({
		'/': '/chat'
	})

	router.afterEach(({from, to}) => {
		let toPath = to.path
		let toPath_end = toPath.lastIndexOf('/')
		let backPath = toPath.slice(0, toPath_end)
		store.dispatch('BACK_PAGE', backPath)
	})
}

// export default {
// 	'/chat': {
// 		component: Chat,
// 		subRoutes: {
// 			'/dialogue': {
// 				component: require('./views/Dialogue')
// 			}
// 		}
// 	},
// 	'/contact': {
// 		component: Contact,
// 		subRoutes: {
// 			'/personinfo': {
// 				component: require('./views/PersonInfo')
// 			}
// 		}
// 	},
// 	'/discover': {
// 		component: Discover,
// 		subRoutes: {
// 			'/friendcircle': {
// 				component: require('./views/FriendCircle')
// 			}
// 		}
// 	},
// 	'/me': {
// 		component: Me,
// 		subRoutes: {
// 			'/userinfo': {
// 				component: require('./views/UserInfo')
// 			},
// 			'/album': {
// 				component: require('./views/Album')
// 			}
// 		}
// 	},
// 	'*': {
// 		name: '404',
// 		component: require('./views/404')
// 	}
// }
