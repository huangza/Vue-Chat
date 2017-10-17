// getter 用来返回状态的值

// All
export function getUser(state) {
    return state.user
}
export function getHdOption(state) {
    return state.header
}
export function getNav(state) {
    return state.nav
}
export function backPage(state) {
    return state.backPage
}

// Chat
export function getNewMsgCount(state) {
    return state.chat.newMsgCount
}
export function getChatList(state) {
    return state.chat.list
}
export function chattingFriend(state) {
    // log('getters', state.chat.current)
    return state.chat.current
}

// contact
export function getSpecialGroup(state) {
    return state.contact.specialGroup
}
export function getFriendList(state) {
    return state.contact.friends
}
export function friendInfo(state) {
    return state.contact.current
}

// discover
export function discoverFuncs(state) {
    return state.discover.func
}

// me
export function meFuncs(state) {
    return state.me.func
}

// demo
export const getCount = state => state.count