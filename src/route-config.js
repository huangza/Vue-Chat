import Chat from './views/Chat'
import Contact from './views/Contact'
import Discover from './views/Discover'
import Me from './views/Me'

export default {
	'/chat': {
		component: Chat,
		subRoutes: {
			'/dialogue': {
				component: require('./views/Dialogue')
			}
		}
	},
	'/contact': {
		component: Contact,
		subRoutes: {
			'/personinfo': {
				component: require('./views/PersonInfo')
			}
		}
	},
	'/discover': {
		component: Discover,
		subRoutes: {
			'/friendcircle': {
				component: require('./views/FriendCircle')
			}
		}
	},
	'/me': {
		component: Me,
		subRoutes: {
			'/userinfo': {
				component: require('./views/UserInfo')
			},
			'/album': {
				component: require('./views/Album')
			}
		}
	},
	'*': {
		name: '404',
		component: require('./views/404')
	}
}
