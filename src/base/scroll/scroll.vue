<template>
    <div class="com-scorll">
        <div class="com-scorll-wrapper" ref="wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 3
        },
        click: {
            type: Boolean,
            default: true
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: null
        },
        pullup: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {

            if (!this.$refs.wrapper) return

            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                // probeType: 2
            });

            this.scroll.on('beforeScrollStart', () => {
            })

            this.scroll.on('scrollEnd', () => {
                if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                }
            })
            
           

            if (this.listenScroll) {
                let me = this
                this.scroll.on('scroll', (pos) => {
                    me.$emit('scroll', pos)
                })
            }

        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    }
}

</script>
<style lang="stylus">
    .com-scorll-wrapper
        height: 100%
        overflow: hidden
</style>