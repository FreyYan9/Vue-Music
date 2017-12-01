import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'com/rank/rank'
import Singer from 'com/singer/singer'
import Search from 'com/search/search'
import Recommend from 'com/recommend/recommend'
import SingerDetail from 'com/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/recommend'
        }, {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/singer',
            component: Singer,
            children: [{
                path: ':id',
                component: SingerDetail
            }]
        },
        {
            path: '/rank',
            component: Rank
        },
        {
            path: '/search',
            component: Search
        }
    ]
})
