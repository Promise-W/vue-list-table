<template>
  <div class="list-table">
    <el-table v-loading="customColumn.loading" :data="tableData" style="width: 100%;" :max-height="tableHeight" border>
      <el-table-column v-if="showDefaultIndex" label="序号" fixed="left" width="60">
        <!-- 如果是element-plus，这里是 <template #default="scope"> -->
        <template slot-scope="scope">
          <span :rowID="scope.row.id">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column v-for="(column, index) in customColumn.allColumn" :key="index" :prop="column.dataColumn" :label="column.name">
        <!-- 如果是element-plus，这里是 <template #default="scope"> -->
        <template slot-scope="scope">
          <slot :name="column.dataColumn" :row="scope.row" :index="index">
            <div class="column-item" v-html="columnBuilder(scope.row, column)" />
          </slot>
        </template>
      </el-table-column>

      <slot />
    </el-table>

    <div class="page-style">
      <pagination
        class="fr"
        :total="total"
        :page="currentPage"
        :limit="pageSize"
        @pagination="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Pagination from './components/Pagination'

export default {
  name: 'ListTable',
  components: { Pagination },
  props: {
    customColumn: { // 默认的列
      type: Object,
      require: true,
      default: () => {
        return {
          allColumn: []
        }
      }
    },
    tableData: { // table 数据
      type: Array,
      require: true,
      default: () => []
    },
    total: { // 总数
      type: Number,
      default: 0
    },
    currentPage: { // 当前页
      type: Number,
      default: 1
    },
    pageSize: { // 页大小
      type: Number,
      default: 10
    },
    showDefaultIndex: { // 是否显示 序号
      type: Boolean,
      default: true
    },
    scrollPartHeightOffset: {
      type: Number,
      default: 318
    }
  },
  data: function() {
    return {
      tableHeight: 0
    }
  },
  watch: {
    tableData: v => v
  },
  created() {
    this.tableHeight = document.body.clientHeight - (this.scrollPartHeightOffset || 0)
  },
  methods: {
    columnBuilder(row, column) {
      if (column.columnBuilder && typeof column.columnBuilder === 'function') {
        return column.columnBuilder(row, column)
      }
      return '<span>' + this.filterNull(row[column.dataColumn]) + '</span>'
    },
    filterNull(val) { // 空值过滤
      return val === null || val === undefined ? '-' : val
    },
    handleCurrentChange({ page, limit }) {
      this.$emit('updata:currentPage', page)
      this.$emit('updata:pageSize', limit)
      this.$emit('paginationFn', { page: page, limit: limit })
      // document.getElementById('listBody').scrollTop = 0
    }
  }
}
</script>

<style>
.page-style {
  line-height: 32px;
  height: 32px;
  margin-top: 15px;
  font-size: 14px;
  color: #8c8c8c;
  letter-spacing: -0.43px;
}
</style>
