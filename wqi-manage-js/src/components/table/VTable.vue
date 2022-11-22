<template>
  <div>
    <el-table
      v-show="tableData.length || !loading"
      ref="vTable"
      v-loading="loading"
      :data="tableData"
      :empty-text="emptyMessage"
      style="width: 100%"
      border
      :row-class-name="tableRowClassName"
      header-row-class-name="custom-header"
      header-cell-class-name="custom-header-cell"
      :cell-class-name="cellClassName"
      :resizable="false"
      @selection-change="changeSelection"
    >
      <slot name="columns">
        <el-table-column v-if="colType === 'selection'" type="selection" width="55" />

        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :width="column.width"
          :sortable="column.sortable ? 'custom' : false"
          :fixed="column.fixed ? column.fixed : false"
          :type="column.type ? column.type : ''"
          v-bind="column"
        >
          <template slot-scope="{ row }">
            <slot :name="column.prop || column.label" :row="row">{{ row[column.prop] }}</slot>
          </template>
        </el-table-column>
      </slot>
    </el-table>

    <el-pagination
      :key="reloadPagination"
      :hide-on-single-page="true"
      align="center"
      background
      :total="total"
      :page-size="limit"
      :current-page="page"
      layout="prev, pager, next"
      class="mt-1-em"
      @current-change="changePage"
    />
  </div>
</template>

<script>
export default {
  name: 'VTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 20
    },
    page: {
      type: Number,
      default: 1
    },
    emptyMessage: {
      type: String,
      default: ''
    },
    tableRowClassName: {
      type: Function,
      default: () => ''
    },
    colType: {
      type: String,
      default: ''
    },
    cellClassName: {
      type: Function,
      default: () => {}
    },
    handleSelectionChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      sortParams: [],
      filters: [],
      currentPage: 1,
      reloadPagination: 1
    }
  },
  watch: {
    page(val) {
      this.currentPage = val
      this.reloadPagination += 1
    }
  },
  methods: {
    changePage(page) {
      this.$emit('onChangePage', page)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.vTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.vTable.clearSelection()
      }
    },
    changeSelection(val) {
      this.$emit('handleSelectionChange', val)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}

::v-deep .custom-header-cell {
  color: #333;
  background-color: $headerTableColor !important;
  text-align: center;
  padding: 12px !important;
}

::v-deep .cell {
  white-space: break-spaces;
}
</style>
