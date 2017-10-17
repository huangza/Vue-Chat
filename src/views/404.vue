<template>
    <div class="wrapper page-404">
        <div class="content">
            <div class="bubble">作者太懒，这个页面还没开发</div>
            <div class="mood">
                <img :src="pic" />
            </div>
        </div>
    </div>
</template>

<script>
import {header} from 'vx/actions'
export default {
    props: ['initialUser'],

    vuex: {
        actions: {
            updateHeader: header
        }
    },

    route: {
        data (transition) {
            this.updateHeader({
                type: 8,
                title: '404',
                backBtn: {
                    need: true,
                    label: '返回'
                },
                action: {
                    type: 0
                }
            })
            transition.next()
        }
    },

    data() {
        return {
            pic: './static/images/404.png'
        }
    }
}
</script>

<style lang="stylus">
$bubble-bg = #a2e759
.page-404 {
    height: 100%
    // background: #fff
    .content {
        width: 100%
        transform: translateY(20%)
        text-align: center
    }
    .bubble {
        position: relative
        display: inline-block
        width: 3rem
        background: $bubble-bg
        color: #333
        text-align: left
        padding: 10px
        border-radius: 4px
        transform: translate(-60px, 0)
        &:after {
            content: ' '
            position: absolute
            bottom: -18px
            right: 25px
            display: block
            width: 0
            height: 0
            border-style: solid
            border-width: 10px
            border-color: $bubble-bg transparent transparent
        }
    }
    .mood {
        display: inline-block
        width: 4.5rem
        transform: translate(30px, 15px)
        img {
            width: 100%
            background: transparent
        }
    }
}
</style>
