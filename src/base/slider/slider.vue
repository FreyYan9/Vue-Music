<template>
    <div id="slider">
        <div class="slider" ref="slider">
            <div class="slider-group" ref="sliderGroup">
                <slot>
                </slot>
            </div>
            <div class="slider-dots">
                <span v-for="(i, index) in dots" :class="{active:currentPageIndex == index}"></span>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { addClass } from 'common/js/dom'
import BScroll from 'better-scroll'

export default {
    name: 'Slider',
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth();
            this._initDots();
            this._initScroll();

            if (this.autoPlay) {
                this._play()
            }
        }, 20)


        window.addEventListener('resize',() => {
        	if (this.sliderScroll) {
        		this._setSliderWidth(true)
        		this.sliderScroll.refresh()
        	}
        })
    },
    methods: {
        _setSliderWidth(isResize) {
            this.children = this.$refs.sliderGroup.children
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')

                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            if (this.loop && !isResize) {
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initScroll() {

            this.sliderScroll = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                snapLoop: this.loop,
                snapThreshold: 0.3,
                snapSpeed: 400
            });

            this.sliderScroll.on('scrollEnd', () => {
                let pageIndex = this.sliderScroll.getCurrentPage().pageX

                if (this.loop) {
                    pageIndex -= 1
                }

                this.currentPageIndex = pageIndex

                if (this.autoPlay) {
                    this._play();
                }
            });

            this.sliderScroll.on('beforeScrollStart', () => {
            	if (this.autoPlay) {
            		clearTimeout(this.timer)
            	}
            });

 
        },
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        _play() {
            let pageIndex = this.currentPageIndex + 1

			if (this.loop) {
		          pageIndex += 1
	        }	

            this.timer = setTimeout(() => {
                this.sliderScroll.goToPage(pageIndex, 0, 400)
            }, this.interval)
        }
    },
    destroyed(){
    	clearTimeout(this.timer)
    }
}
 
</script>

<style scoped type="stylesheet/stylus" lang="stylus">
  	@import "~common/stylus/variable"
	.slider
		min-height: 1px
		position: relative
		width: 100%
		overflow: hidden
		.slider-group
			position: relative
			overflow: hidden
			white-space: nowrap
			.slider-item
				float: left
				box-sizing: border-box
				overflow: hidden
				text-align: center
				a
					display: block
					width: 100%
					overflow: hidden
					text-decoration: none
				img
					display: block
					width: 100%
		.slider-dots
			width: 100%
			height: 15px
			position: absolute
			text-align: center
			bottom: 10px
			span
				display: inline-block
				width: 10px
				height: 10px
				margin: 0 3px
				border-radius: 50%
				background-color: $color-text-l
			.active
				width: 15px
				border-radius: 30%
				background: $color-text-ll
</style>