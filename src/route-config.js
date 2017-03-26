import Home from './components/Home'
import Contact from './components/Contact'
import Discover from './components/Discover'
import Me from './components/Me'

export default {
	'/home': {
		component: Home
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
