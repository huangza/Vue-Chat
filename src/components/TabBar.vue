<template>
    <div class="vc-tabbar">
        <ul class="nav-links">
            <li
             v-for="item in tab"
             class="nav-links_item "
             data-role="nav-links_item"
             v-link="item.link">
                <span class="nav-links_icon">
                    <i class="iconfont" :class="item.icon" aria-hidden="true"></i>
                </span>
                <p class="nav-links_label" v-text="item.label"></p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    created () {
    },
    data () {
        return {
            tab: [
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
            ]
        };
    },
    methods: {
    }
}
</script>

<style lang="stylus">
.vc-tabbar{
    .nav-links {
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }
    .nav-links_item {
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        font-size: 0;
        color: #999;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding: 2px 0 0;
        &:hover {
            cursor: pointer;
        }
    }
    .nav-links_item.v-link-active {
        color: #09BB07
    }
    .nav-links_item_on {
        color: #09BB07;
    }
    .nav-links_icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        font-size: 24px;
        line-height: 24px;
        i {
            font-size: 26px;
        }
    }
    .nav-links_label {
        font-size: 10px;
        margin-top: 3px;
        margin-bottom: 2px;
    }
}
</style>
