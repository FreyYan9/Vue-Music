<template>
    <div id="singer">
        <Listview :data="singerList"></Listview>
        <div class="loading-wrapper" v-if="!singerList.length">
			<Loading></Loading>
		</div>
    </div>
</template>
<script>
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import Listview from 'base/listview/listview'

export default {
    name: 'Singer',
    data() {
        return {
            singerList: []
        }
    },
    mounted() {
        this._getSingerList();
    },
    methods: {
        _getSingerList() {
            getSingerList().then((res) => {
                if (res.code === ERR_OK) {
                    this.singerList = this._normalizeSinger(res.data.list)
                    // console.log(this.singerList);
                }
            });
        },
        _normalizeSinger(list) {
            if (!list.length) return
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }

            list.forEach((item, index) => {

            	// 添加到热门
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                }

                // 标签分类A-Z
                const key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }

                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }))
            })

            var ret = []
            var hot = []
            var oht = []

            for(let key in map){
            	var val = map[key]
            	if (val.title.match(/[a-zA-Z]/)) {
            		ret.push(val)
            	}else if(val.title === HOT_NAME){
            		hot.push(val)
            	}else{
            		oht.push(val)
            	}
            }

            ret.sort((a, b) => {
            	return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })

            return hot.concat(ret);
            return hot.concat(ret, oht);
        }
    },
    components: {
        Loading,
        Listview
    }
}

</script>
<style lang="stylus" scoped>
#singer
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;

</style>
