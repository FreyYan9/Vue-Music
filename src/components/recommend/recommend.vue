<template>
    <div class="recommend">
        <Scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div class="slider-wrapper" v-if="recommends.length">
                    <Slider>
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
								<img class="needsclick" @load="_loadImage" :src="item.picUrl" />
							</a>
                        </div>
                    </Slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul v-if="discList.length">
                        <li v-for="item in discList" class="item">
                            <div class="icon">
                                <img v-lazy="item.imgurl">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-text="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="loading-wrapper" v-if="!discList.length">
            	<Loading>            		
            	</Loading>
            </div>
        </Scroll>
    </div>
</template>
<script>
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'

export default {
    name: 'recommend',
    data() {
        return {
            recommends: [],
            discList: []
        }
    },
    created() {
        this._getRecommend();

        this._getDiscList();
    },
    methods: {
        _getRecommend() {
            getRecommend().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider
                }
            })
        },
        _getDiscList() {
            getDiscList().then((res) => {
                if (res.code === ERR_OK) {
                    this.discList = res.data.list
                }
            });
        },
        _loadImage() {
            if (!this.checkloaded) {
                this.checkloaded = true
                this.$refs.scroll.refresh()
            }
        }
    },
    components: {
        Slider,
        Scroll,
        Loading
    }
}

</script>
<style lang="stylus" scoped type="stylesheet/stylus">
	@import "~common/stylus/variable"
	

	.recommend
		position: fixed
		width: 100%
		top: 88px
		bottom: 0
		.recommend-content
			height: 100%
			overflow: hidden
		.slider-wrapper
			margin-bottom: 5px
		.recommend-list
			.list-title
				height: 65px
				line-height: 65px
				text-align: center
				font-size: $font-size-medium
				color: $color-theme
			.item
				display: flex
				box-sizing: border-box
				align-items: center
				padding: 0 20px 20px 20px
				no-wrap()
				.icon
					flex: 0 0 60px
					width: 60px
					padding-right: 20px
					img
						width: 60px
						height: 60px
				.text
					display: flex
					flex-direction: column
					justify-content: center
					flex: 1
					line-height: 20px
					overflow: hidden
					font-size: $font-size-medium
					.name
						margin-bottom: 10px
						color: $color-text
					.desc
						color: $color-text-d
		.loading-wrapper
			position: fixed
			left: 0
			right: 0
			top: 0
			bottom: 0
			background: rgba(0,0,0,0.8)
</style>