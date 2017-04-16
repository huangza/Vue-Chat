import Chat from './views/Chat'
import Contact from './views/Contact'
import Discover from './views/Discover'
import Me from './views/Me'

export default {
	'/chat': {
		component: Chat,
		subRoutes: {
			'/dialogue': {
				component: require('./components/Dialogue')
			}
		}
	},
	'/contact': {
		component: Contact,
		subRoutes: {
			'/personinfo': {
				component: require('./components/PersonInfo')
			}
		}
	},
	'/discover': {
		component: Discover
	},
	'/me': {
		component: Me
	},
	'*': {
		name: '404',
		component: require('./views/404')
	}
}
