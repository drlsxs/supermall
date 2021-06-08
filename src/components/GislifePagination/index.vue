<template>
  <div class="pagination">
    <el-pagination
      :background="config.background !== undefined ? config.background : true"
      :small="config.small"
      :total="total"
      :page-size="pageParams.pageSize"
      :current-page="pageParams.pageNum"
      :page-sizes="
        config.pageSizes !== undefined ? config.pageSizes : [10, 15, 20]
      "
      :prev-text="config.prevText"
      :next-text="config.nextText"
      :layout="
        config.layout !== undefined
          ? config.layout
          : 'total, sizes, prev, pager, next, jumper'
      "
      :hide-on-single-page="config.hideOnSingle"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageParams: {
      type: Object,
      default: () => {
        return {};
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    sizeChange(val) {
      this.pageParams.pageNum = 1;
      this.pageParams.pageSize = val;
    },
    currentChange(val) {
      this.pageParams.pageNum = val;
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  width: 100%;
  height: 50px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/.el-pagination {
    .el-pagination__total,
    .el-input__inner,
    .el-pagination__jump {
      font-size: 16px;
    }
  }
}
</style>
