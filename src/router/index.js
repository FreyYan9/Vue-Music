import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'com/rank/rank'
import Singer from 'com/singer/singer'
import Search from 'com/search/search'
import Recommend from 'com/recommend/recommend'

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
            component: Singer
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
