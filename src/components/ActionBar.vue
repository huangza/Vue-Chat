<template>
    <div class="vc-action">
        <span
         class="action-bar_open"
         @click="toggleList">
            <i class="fa fa-plus"></i>
        </span>
        <ul
         class="action-bar_list p-absolute"
         :class="tipsClass">
            <li
             class="action-bar_item"
             v-for="a in actions">
                <span class="nav-links_icon">
                    <i class="fa" :class="a.icon" aria-hidden="true"></i>
                </span>
                <p class="nav-links_label" v-text="a.label"></p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    ready () {
        console.dir(toString.call(this.$el))
        document.addEventListener('click', (e) => {
            if( !this.$el.contains(e.target) )  this.showList = false
        })
        document.addEventListener('touchend', (e) => {
            if( !this.$el.contains(e.target) )  this.showList = false
        })
    },
    data () {
        return {
            actions: [
                {
                    label: "发起群聊",
                    icon: "fa-comments",
                    link: "#"
                },
                {
                    label: "添加",
                    icon: "fa-plus",
                    link: "#"
                },
                {
                    label: "收付款",
                    icon: "fa-rmb",
                    link: "#"
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
        }
    }
}
</script>

<style lang="stylus">
.vc-action
    position: relative
    right: 21px
    height: 44px
    .action-bar_open
        display: inline-block
        font-size: 20px
    .action-bar_list
        background-color: #49484b
        font-size: 16px
        width: 133px
        padding: 0 15px
        border-radius: 4px
        top: 50px
        right: -10px
        transform-origin: 90% 0
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
</style>
