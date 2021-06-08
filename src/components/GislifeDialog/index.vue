<template>
  <el-dialog
    :visible.sync="config.createDialog"
    :top="config.top"
    :width="config.width"
    :show-close="config.showClose"
    :close-on-click-modal="config.closeOnClickModal"
    @closed="closed"
    @opened="opened"
  >
    <div v-loading="loading">
      <slot name="main">
        <slot name="top">
          <div class="title_box">
            <div class="text">
              {{ config.title ? config.title : "标题" }}
            </div>
          </div>
        </slot>

        <div class="container">
          <slot name="container"> 内容 </slot>
        </div>

        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          title: "标题",
          width: "50%",
          top: "15vh",
          showClose: true,
          destroyOnClose: true,
          createDialog: false,
          closeOnClickModal: false,
        };
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 关闭
    closed() {
      this.$emit("closed");
    },
    // 打开
    opened() {
      this.$emit("opened");
    },
  },
};
</script>

<style lang="less" scoped>
.el-dialog__wrapper {
  overflow: hidden;
}

.title_box {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px;
  margin-bottom: 16px;
  .text {
    flex: 1;
    font-size: 24px;
    font-weight: 700;
    color: #333333;
  }
}
.container {
  max-height: 650px !important;
  overflow-x: hidden;
  overflow-y: auto;
  .opetate_box {
    text-align: center;
  }
}

//当前页面element覆盖
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-radio__inner {
  width: 20px;
  height: 20px;
  background: #fff !important;
  border: 2px solid #316fd0 !important;
}
/deep/.el-radio__input.is-checked .el-radio__inner::after {
  width: 12px;
  height: 12px;
  background: #316fd0;
}
/deep/.el-radio__input.is-checked + .el-radio__label {
  color: #606266;
}

.dialog-footer {
  margin-top: 10px;
  text-align: right;
}
</style>
