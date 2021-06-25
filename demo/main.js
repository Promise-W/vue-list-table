import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

import ListTable from './../src/' // 全局导入
Vue.use(ListTable)
// import { ListTable } from './../src/' // 全局导入
// Vue.component('ListTable', ListTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
