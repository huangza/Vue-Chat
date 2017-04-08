function Store(opts) {

	var data = {
		user: {
			// unique id（16位）
			_uid: '0000000000000000',
			// 昵称
			nickname: 'Andre Huang',
			// vue-chat id
			vcid: 'vcid_2017040622140000',
			// 性别：1为男，0为女
			gender: 1,
			// 地址
			address: '',
			// 地区
			region: '',
			// 个性签名
			whatsup: '',
			// 头像
			avatar: './static/images/user/uid0000000000000000/avatar.jpg',
		},
		chatList: [
			{
	            "name": "Uzumaki Naruto",
	            "avatar": "./static/images/chat/avatar-yellow.jpg",
	            "latestWord": "笔直向前，说到做到",
	            "latestTime": "17:29",
	            "newMsg": true,
	            "msgCount": 2
		    },{
	            "name": "樱木花道",
	            "avatar": "./static/images/chat/avatar-red.jpg",
	            "latestWord": "我果然是个天才",
	            "latestTime": "13:49",
	            "newMsg": true,
	            "msgCount": 0
		    },{
	            "name": "Dwyane Wade",
	            "avatar": "./static/images/chat/avatar-blue.jpg",
	            "latestWord": "This is my house",
	            "latestTime": "09:21",
	            "newMsg": false,
	            "msgCount": 0
		    },{
	            "name": "周杰伦",
	            "avatar": "./static/images/chat/avatar-green.jpg",
	            "latestWord": "哎哟，不错喔~",
	            "latestTime": "01:22",
	            "newMsg": true,
	            "msgCount": 123
		    }
	    ],

	    friends: []
	}

	if (_typeof(opts) === 'object') {

	}

	function _typeof(params) {
		return Object.prototype.toString.call(params).slice(8, -1).toLowerCase()
	}
}

export default Store