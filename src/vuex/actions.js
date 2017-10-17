// actions 用来修改 store 中相应的属性

export const userInfo = ({dispatch, state}) => {
    dispatch('USER', 1)
}

export const header = ({dispatch, state}, header) => {
    dispatch('HD', header)
}
export const headerType = ({dispatch, state}, type) => {
    dispatch('HD_TYPE', type)
}
export const headerTitle = ({dispatch, state}, title) => {
    dispatch('HD_TITLE', title)
}
export const headerBack = ({dispatch, state}, backBtn) => {
    dispatch('HD_BACK', backBtn)
}
export const headerAction = ({dispatch, state}, action) => {
    dispatch('HD_ACTION', action)
}

export const addChatList = ({dispatch, state}, item) => {
    dispatch('CHAT_ADD', item)
}
export const newMsgCount = ({dispatch, state}, num) => {
    dispatch('CHAT_MSG_COUNT', num)
}
export const updateChattingFriend = ({dispatch, state}, id) => {
    dispatch('SET_CHATTING_FRIEND', id)
}


// export const nav = ({dispatch, state}, nav) => {
//     dispatch('NAV', nav)
// }

export const friendList = ({dispatch, state}, item) => {
    dispatch('FRIENDLIST', item)
}
export const updateFriendInfo = ({dispatch, state}, id) => {
    dispatch('SET_FRIENDINFO', id)
}

// demo
export const incrementCounter = ({dispatch, state}) => {
    dispatch('INCREMENT', 1)
}