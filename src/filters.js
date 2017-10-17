const _filters = {}

// 消息条数格式化，超过99的转为'99+'
_filters.msgFormat = function(val, limit) {
    if (!val) {
        return
    }
    if (util.typeof(limit) !== 'number') {
        limit = 99
    }
    if (val > limit) {
        val = limit + '+'
    } else if (val === 0) {
        val = ''
    }
    return val
}

export default (Vue) => {
    Object.keys(_filters).forEach(key => {
        Vue.filter(key, _filters[key])
    })
}