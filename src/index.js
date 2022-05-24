import Pagination from './components/Pagination/index.js'
import ListTable from './components/ListTable/index.js'

const components = [
  Pagination,
  ListTable
]

const install = function(Vue) {
  if (install.installed) return

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  install.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// export {
//   Pagination,
//   ListTable,
// }

export default {
  version: '0.0.1',
  install,
  Pagination,
  ListTable
}
