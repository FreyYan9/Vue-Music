// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import 'babel-polyfill'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'


import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.config.productionTip = false

// 图片懒加载
Vue.use(vueLazyLoad, {
    loading: require('common/image/default.png')
});

window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`)
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
    // render: (createElement) => createElement(App)
})
