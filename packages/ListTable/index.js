// 导入组件，组件必须声明 name
import ListTable from './src/index.vue'
// 为组件提供 install 安装方法，供按需引入
ListTable.install = function(Vue) {
  Vue.component(ListTable.name, ListTable)
}
// 导出组件
export default ListTable
