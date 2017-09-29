<template>
    <Scroll :data="data" 
            :listenScroll="true" 
            class="listview" 
            ref="listview" >
        <ul>
            <li class='list-group' v-for="group in data" ref="listGroup">
                <h2 class="list-group-title">{{ group.title }}</h2>
                <ul>
                    <li class="list-group-item" v-for="item in group.items">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut">
            <ul>
                <li class="item" 
                :class="{current :currentIndex == index}" 
                v-for="(shortcut, index) in shortcutList" 
                :data-index="index" 
                @touchstart.stop.prevent="onShortcutTouchStart" 
                @touchmove.stop.prevent="onShortcutTouchMove">
                    {{shortcut}}
                </li>
            </ul>
        </div>
    </Scroll>
</template>
<script type="text/javascript">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getData } from 'common/js/dom'

// 每一个右边导航栏的高度
var SHORTCUT_HEIGHT = 18;

export default {
    name: 'Listview',
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    created(){
        this.touch = {}
    },
    data() {
        return {
            currentIndex: 0
        }
    },  
    mounted() {

    },
    methods: {
        onShortcutTouchStart(e){
            let index = getData(e.target, 'index')
            this.touch.firstIndex = index
            this.touch.firstTouch = e.touches[0].pageY

            this._scrollTo(index);
        },
        onShortcutTouchMove(e){
            this.touch.lastTouch = e.touches[0].pageY
            let delta = (this.touch.lastTouch - this.touch.firstTouch) / SHORTCUT_HEIGHT | 0
            let lastIndex = parseInt(this.touch.firstIndex) + delta

            this._scrollTo(lastIndex);
        },
        _scrollTo(index){
            this.currentIndex = index
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 500)
        }
    },
    computed: {
        shortcutList() {
            return this.data.map((g) => {
                return g.title.substr(0, 1)
            })
        }
    },
    components: {
        Scroll,
        Loading
    }
}

</script>
<style lang="stylus">
    @import '~common/stylus/variable'
    
    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
