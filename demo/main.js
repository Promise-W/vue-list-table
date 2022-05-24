import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

import '../lib/vue-list-table.css'
import ListTable from '../lib/vue-list-table.umd' // lib 引入测试
// import ListTable from '../src' // 源码 引入测试
Vue.use(ListTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
