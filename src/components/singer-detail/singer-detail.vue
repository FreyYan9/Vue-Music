<template>
  	<transition name="slide">
    	<div class="singer-detail">
	       {{this.singer.name}}
	    </div>
    </transition>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { getSingerDetail } from 'api/singer'

export default {
    data() {
        return {}
    },
    mounted(){
    	this._getSingerDetail()
    },
    methods:{
    	_getSingerDetail(){
            console.log(this.singer)
    		getSingerDetail(this.singer.id).then((res) => {
                if (res.code === ERR_OK) {
                    this.singerDetail = res
                }
            });


    	}
    },
    computed:{
    	...mapGetters([
    		'singer'
    	])
    }
}

</script>
<style type="stylesheet/stylus" lang="stylus">
@import "~common/stylus/variable"

.singer-detail
	position: fixed
	z-index: 100
	top: 0
	left: 0
	bottom: 0
	right: 0
	background: $color-background


.slide-enter-active, .slide-leave-active
	transition: all 0.3s

.slide-enter, .slide-leave-to
	transform: translate3d(100%, 0, 0)
</style>
