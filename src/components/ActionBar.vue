<template>
    <div class="vc-action">
        <span
         class="action-bar_open"
         @click="toggleList">
            <i class="iconfont icon-tips-jia"></i>
        </span>
        <ul
         class="action-bar_list p-absolute"
         :class="tipsClass">
            <li
             class="action-bar_item"
             v-for="a in actions"
             @touchend="goPage(a.hrefTo)">
                <span class="nav-links_icon">
                    <i class="iconfont" :class="a.icon" aria-hidden="true"></i>
                </span>
                <p class="nav-links_label" v-text="a.label"></p>
            </li>
        </ul>
        <div class="action-bar_mask" v-show="showList" @click="toggleList"></div>
    </div>
</template>

<script>
export default {
    ready () {
        // window.addEventListener("click", function(event){
        //     console.log(event.target);
        // });
    },
    data () {
        return {
            actions: [
                {
                    label: "发起群聊",
                    icon: "icon-tips-xiaoxi",
                    hrefTo: "/contact/group-chat"
                },
                {
                    label: "添加",
                    icon: "icon-tips-add-friend",
                    hrefTo: "/contact/add-friends"
                },
                {
                    label: "收付款",
                    icon: "icon-tips-fukuan",
                    hrefTo: "/chat/receive-and-pay"
                },
            ],
            showList: false
        }
    },
    computed: {
        tipsClass () {
            return {
                'tips-open': this.showList,
                'tips-close': !this.showList
            }
        }
    },
    methods: {
        toggleList () {
            this.showList = !this.showList
        },
        goPage (_path) {
            if (util.typeof(_path) === 'string') {
                this.showList = false
                this.$router.go({
                    path: _path
                })
            }
        }
    }
}
</script>

<style lang="stylus">
@import '../assets/css/com/mixin.styl'
.vc-action
    position: relative
    // right: 21px
    // height: 44px
    .action-bar_open
        display: inline-block
        i {
            font-size: 20px
        }
    .action-bar_list
        background-color: #49484b
        font-size: 16px
        width: 133px
        padding: 0 15px
        border-radius: 4px
        top: 40px
        right: -8px
        transform-origin: 90% 0
        z_index('p')
        &:before
            content: ""
            width: 0
            height: 0
            position: absolute
            top: -8px
            right: 12px
            border-width: 0 6px 8px
            border-color: transparent transparent #49484b
            border-style: solid
    .action-bar_item
        line-height: 44px
        text-align: left
        position: relative
        &:not(:last-child):after
            content: ""
            width: 200%
            height: 1px
            position: absolute
            bottom: 0
            left: 0
            right: 0
            background-color: #5b5b5d
            transform: scale(.5)
            transform-origin: 0 100%
    .nav-links_icon
    .nav-links_label
        display: inline-block
        vertical-align: middle
    .nav-links_icon
        width: 16px
        margin-right: 10px
        text-align: center
    .nav-links_label
        font-size: 14px
    .action-bar_mask
        position: absolute
        width: 6.4rem
        height: 11.38rem
        right: -15px
        top: 34px
        z_index('m')
.tips-open
    opacity: 1
    transition: initial
.tips-close
    opacity: 0
    transform: scale(0)
    transition: opacity .2s ease, transform .4s ease
</style>
