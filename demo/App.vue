<template>
  <div id="app">
    <ListTable :custom-column="customColumn" :table-data="tableData" :total="total" :current-page="currentPage" :page-size.sync="pageSize" @paginationFn="paginationFn">
      <template v-slot:remark="scope">
        {{ '具名插槽 - ' + scope.row.remark }}
      </template>

      <el-table-column label="操作(我在listTable默认插槽)" min-width="130" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
          <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除吗？" placement="top" @onConfirm="delete(scope.row)">
            <el-button slot="reference" type="text" size="small" style="margin-left: 10px;">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </ListTable>
  </div>
</template>

<script>
// import { ListTable } from './../src/' // 局部导入

export default {
  name: 'App',
  // components: { ListTable },
  data() {
    return {
      customColumn: {
        loading: false,
        allColumn: [
          {
            name: '名字',
            dataColumn: 'name'
          },
          {
            name: '公司',
            dataColumn: 'company',
            columnBuilder(row, column) { // 可以不重写，默认取值 row[column.dataColumn]
              return `<h2>${row[column.dataColumn]}</h2>`
            }
          },
          {
            name: '备注(我在listTalbe列的具名插槽)', // 使用列的具名插槽
            dataColumn: 'remark'
          },
          {
            name: '操作(我在配置上)', // 使用默认插槽，使用一个完整的列标签 <el-table-column>
            dataColumn: 'operate'
          }
        ]
      },
      tableData: [
        { name: 'mock1', company: '华为', 'remark': '我是华为公司人员' },
        { name: 'mock2', company: '海思', 'remark': '我是海思公司人员' }
      ],
      total: 0,
      currentPage: 1,
      pageSize: 30
    }
  },
  methods: {
    edit(row) {
      console.log('edit', row)
    },
    delete(row) {
      debugger
      console.log('delete', row)
    },
    paginationFn(data) {
      this.currentPage = data.page // 当前页
      this.pageSize = data.limit // 每页数量
      this.getList() // 重新获取数据
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
