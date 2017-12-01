<template>
    <Scroll 
    :data="data" 
    :listenScroll="true" 
    class="listview" 
    ref="listview" 
    @scroll="scroll">
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
                :class="{current :currentIndex === index}" 
                v-for="(shortcut, index) in shortcutList" 
                :data-index="index" 
                @touchstart.stop.prevent="onShortcutTouchStart" 
                @touchmove.stop.prevent="onShortcutTouchMove" 
                @touchend.stop.prevent="onShortcutTouchEnd">
                    {{shortcut}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
          <div class="fixed-title">{{fixedTitle}} </div>
        </div>
    </Scroll>
</template>
<script type="text/javascript">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getData } from 'common/js/dom'

// 每一个右边导航栏的高度
var SHORTCUT_HEIGHT = 18;
// 固定Title 的高度
const TITLE_HEIGHT = 30

export default {
    name: 'Listview',
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    created() {
        this.touch = {}
        this.listHeight = []
    },
    data() {
        return {
            currentIndex: 0,
            scrollY: -1,
            diff: -1
        }
    },
    mounted() {

    },
    methods: {
        onShortcutTouchStart(e) {
            let index = getData(e.target, 'index')
            this.touch.firstIndex = index
            this.touch.firstTouch = e.touches[0].pageY

            this._scrollTo(index);
        },
        onShortcutTouchMove(e) {
            this.touch.lastTouch = e.touches[0].pageY
            let delta = (this.touch.lastTouch - this.touch.firstTouch) / SHORTCUT_HEIGHT | 0
            let lastIndex = parseInt(this.touch.firstIndex) + delta

            this._scrollTo(lastIndex);
        },
        onShortcutTouchEnd(e){
            // let delta = (this.touch.lastTouch - this.touch.firstTouch) / SHORTCUT_HEIGHT | 0
            // console.log(delta)
            // let lastIndex = parseInt(this.touch.firstIndex) + delta

            // this._scrollTo(lastIndex);

            // console.log(lastIndex)
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        _scrollTo(index) {
            // console.clear()
            if (!index && index!= 0) return

            if (index < 0) {
                index = 0
            }else if(index > this.listHeight.length - 2){
                index = this.listHeight.length - 2
            }

            this.scrollY = -this.listHeight[index]
            this.currentIndex = index
            // console.log(this.currentIndex)
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 500)
        },
        _calculateHeight(){

            this.listHeight = []
            let height = 0
            const LIST = this.$refs.listGroup
            this.listHeight.push(height)
            console.log(LIST.length)

            for (var i = 0; i < LIST.length; i++) {
                let item = LIST[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }

        }
    },
    computed: {
        shortcutList() {
            return this.data.map((g) => {
                return g.title.substr(0, 1)
            })
        },
        fixedTitle(){
            if (this.scrollY > 0) {
                return ''
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
    },
    components: {
        Scroll,
        Loading
    },
    watch: {
        data() {
            setTimeout(()=>{
                this._calculateHeight()
            },20)
        },
        scrollY(newY){
            const LIST_HEIGHT = this.listHeight

            if (newY > 0) {
                this.currentIndex = 0
                return
            }

            for (var i = 0; i < LIST_HEIGHT.length; i++) {
                let height = LIST_HEIGHT[i]
                let height2 = LIST_HEIGHT[i + 1]

                if (-newY >= height && -newY < height2) {
                    this.currentIndex = i
                    this.diff = height2 + newY
                    return
                }
            }

            // 当滚动到底部，且-newY大于最后一个元素的上限
            this.currentIndex = LIST_HEIGHT.length - 2
        },
        diff(newVal){
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
            if (this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    }
}

</script>
<style lang="stylus" type="text/stylus">
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
