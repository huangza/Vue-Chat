import Vue from 'vue'
import Vuex from 'vuex'

// 安装Vuex模块
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
    // 用户信息
    user: {
        // 'content': 'Andre Huang',
        'icon': '',
        'avatar': './static/profile/user/pic.jpg',
        'intro': '',
        // 'hrefTo': '/me',
        'category': 'A',
        '_uid': '0000000000000000',
        'name': 'Andre在向前走',
        'vcid': 'A_Dreamliker',
        'gender': 1,
        'region': '广东 深圳',
    },
    // 顶部栏位的配置
    header: {
        type: 0,
        title: '假WeChat',
        backBtn: {
            need: false,
            url: '',
            label: '返回'
        },
        action: {
            type: 0,
            icon: 'icon-more',
            url: ''
        }
    },
    // 导航
    nav: [
        {
            label: "首页",
            icon: " icon-wechat",
            link: "/chat",
            isOn: true
        },
        {
            label: "通讯录",
            icon: " icon-contact",
            link: "/contact",
            isOn: false
        },
        {
            label: "发现",
            icon: " icon-find",
            link: "/discover",
            isOn: false
        },
        {
            label: "我",
            icon: " icon-me",
            link: "/me",
            isOn: false
        }
    ],
    // 聊天
    chat: {
        list: [],
        newMsgCount: 0,
        current: null
    },
    // 通讯录
    contact: {
        // 特殊集合
        specialGroup: {
            type: '0-1-2-4-5',
            list: [
                {
                    content: '新的朋友',
                    avatar: '#item-icon-newfriend',
                    intro: '',
                    hrefTo: '/contact/add-friends',
                    category: 'func'
                },{
                    content: '群聊',
                    avatar: '#item-icon-group',
                    intro: '',
                    hrefTo: '/contact/group-chat',
                    category: 'func'
                },{
                    content: '标签',
                    avatar: '#item-icon-tag',
                    intro: '',
                    hrefTo: '/contact/tag',
                    category: 'func'
                },{
                    content: '公众号',
                    avatar: '#item-icon-public',
                    intro: '',
                    hrefTo: '/contact/public',
                    category: 'func'
                }
            ]
        },
        friends: {
            type: '1-2-4-5',
            list: []
        },
        current: null
    },
    discover: {
        func: {
            type: '0-1-2-3',
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
    },
    me: {
        func: {
            type: '0-1-2-3',
            list: [
                {
                    content: '相册',
                    avatar: '#item-icon-friendcircle',
                    intro: '',
                    hrefTo: '/me/album',
                    category: '1'
                },{
                    content: '收藏',
                    avatar: '#item-icon-scan',
                    intro: '',
                    hrefTo: '/me?page=scan',
                    category: '1'
                },{
                    content: '钱包',
                    avatar: '#item-icon-shake',
                    intro: '',
                    hrefTo: '/me?page=shake',
                    category: '1'
                },{
                    content: '卡包',
                    avatar: '#item-icon-buy',
                    intro: '',
                    hrefTo: '/me?page=buy',
                    category: '1'
                },{
                    content: '表情',
                    avatar: '#item-icon-game',
                    intro: '',
                    hrefTo: '/me?page=game',
                    category: '2'
                },{
                    content: '设置',
                    avatar: '#item-icon-program',
                    intro: '',
                    hrefTo: '/me?page=program',
                    category: '3'
                }
            ]
        }
    }
}

// 创建一个对象存储一系列我们要写的 mutation 函数
const mutations = {
    // TODO: 放置我们的状态变更函数

    // header
    HD: (state, header) => state.header = Object.assign({}, state.header, header),
    HD_TYPE: (state, type) => state.header.type = type,
    HD_TITLE: (state, title) => state.header.title = title,
    HD_BACK: (state, backBtn) => state.header.backBtn = backBtn,
    BACK_PAGE: (state, url) => {
        state.header.backBtn.url = url
    },
    HD_ACTION: (state, action) => state.header.action = action,

    // chat
    // @: 这里的数据是要覆盖，还是在原数据中增加
    CHAT_ADD: (state, chatItem) => state.chat.list = util.array.unique(state.chat.list.concat(chatItem)),
    CHAT_MSG_COUNT: (state, num) => state.chat.newMsgCount = num,
    SET_CHATTING_FRIEND: (state, id) => {
        // log('store', id)
        state.chat.current = state.chat.list.filter(item => item._uid == id)[0]
        // log('store current', state.chat.current)
    },

    // nav
    // NAV: (state, nav) => state.nav = nav,

    // contact
    FRIENDLIST: (state, item) => state.contact.friends.list = util.array.unique(state.contact.friends.list.concat(item)),
    SET_FRIENDINFO: (state, id) => state.contact.current = state.contact.friends.list.filter(item => item._uid == id)[0],
}


// demo
// const state = {
//     count: 0
// }

// const mutations = {
//     INCREMENT(state, amount) {
//         state.count += amount
//     }
// }



// 整合初始状态和变更函数，就得到了所需的 store
// 至此，这个 store 就可以连接到应用中
export default new Vuex.Store({
    state,
    mutations
})