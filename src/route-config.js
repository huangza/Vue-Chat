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
		component: Contact
	},
	'/discover': {
		component: Discover
	},
	'/me': {
		component: Me
	}
}
