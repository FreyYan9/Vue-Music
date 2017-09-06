// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.config.productionTip = false

window.onerror = function (message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`)
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
    // render: (createElement) => createElement(App)
})
