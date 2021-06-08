<template>
  <el-form
    :style="formStyle"
    :model="ruleForm"
    :rules="init.rules"
    ref="ruleForm"
    :label-width="init.labelWidth || '100px'"
    class="ruleForm"
    :disabled="isDisabled"
  >
    <div
      v-for="(item, index) in init.itemList"
      :key="index"
      :style="{
        width: item.width || '100%',
        paddingRight: '12px',
        boxSizing: 'border-box',
      }"
    >
      <el-form-item :label="item.label" :prop="item.prop" v-if="!item.itemSlot">
        <!-- lable后插槽，替换input -->
        <slot :name="item.key">
          <div class="item_input">
            <el-input
              v-if="!item.slot && item.type == 'number'"
              :style="{ width: item.inputWidth || '100%' }"
              v-model.number="ruleForm[item.key]"
              :placeholder="item.placeholder || ''"
              :suffix-icon="item.suffixIcon"
              :prefix-icon="item.prefixIcon"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :type="item.type"
              clearable
            >
              <!--  input 组件尾部增加文字 -->
              <template slot="suffix" v-if="item.suffix">
                <slot :name="`${item.key}_suffix`">{{ item.suffix }}</slot>
              </template>
              <!--  input 组件头部增加文字 -->
              <template slot="prefix" v-if="item.prefix">
                <slot :name="`${item.key}_prefix`">{{ item.prefix }}</slot>
              </template>
            </el-input>

            <el-input
              v-else
              :style="{ width: item.inputWidth || '100%' }"
              v-model.trim="ruleForm[item.key]"
              :placeholder="item.placeholder || ''"
              :type="item.type"
              :suffix-icon="item.suffixIcon"
              :prefix-icon="item.prefixIcon"
              :disabled="item.disabled"
              :readonly="item.readonly"
              clearable
            >
              <!--  input 组件尾部增加文字 -->
              <template slot="suffix" v-if="item.suffix">
                <slot :name="`${item.key}_suffix`">{{ item.suffix }}</slot>
              </template>
              <!--  input 组件头部增加文字 -->
              <template slot="prefix" v-if="item.prefix">
                <slot :name="`${item.key}_prefix`">{{ item.prefix }}</slot>
              </template>
            </el-input>
            <!-- input后添加 -->
            <slot :name="`${item.key}_append`" v-if="item.append">
              <div class="append">{{ item.append }}</div>
            </slot>
          </div>
        </slot>
      </el-form-item>
      <slot :name="item.itemSlot" v-if="item.itemSlot"></slot>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    // 配置
    init: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 是否保持默认参数
    keepDefaultParams: {
      type: Boolean,
      default: true,
    },
    // 是否禁用
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    //保持默认参数，先备份
    if (this.keepDefaultParams) {
      this.ruleFormCopy = Object.assign({}, this.init.ruleForm);
    }
    // 合并form样式
    if (this.init.formStyle) {
      this.formStyle = Object.assign(this.formStyle, this.init.formStyle);
    }
  },
  data() {
    return {
      ruleForm: this.init.ruleForm,
      ruleFormCopy: null,
      formStyle: {
        width: "100%",
        justifyContent: "flex-start",
      },
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      let flag;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          console.log("验证成功");
          flag = this.ruleForm;
        } else {
          console.log("验证失败");
          flag = false;
          return false;
        }
      });
      return flag;
    },
    // 重置表单
    resetForm() {
      this.$refs["ruleForm"].resetFields();
      // 防止element只清空有prop验证的参数
      Object.keys(this.init.ruleForm).forEach((key) => {
        let type = this.getDataType(this.init.ruleForm[key]);

        switch (type) {
          case "Array":
            this.init.ruleForm[key] = [];
            break;
          case "boolean":
            this.init.ruleForm[key] = false;
            break;
          default:
            this.init.ruleForm[key] = "";
            break;
        }
      });
      // keepDefaultParams为true保持带值默认参数。为false带值默认参数也清空
      if (this.keepDefaultParams) {
        Object.keys(this.init.ruleForm).forEach((key) => {
          this.init.ruleForm[key] = this.ruleFormCopy[key];
        });
      }
    },
    // 获取对象数据类型
    getDataType(obj) {
      let type = typeof obj;
      if (type != "object") {
        return type;
      }
      return Object.prototype.toString
        .call(obj)
        .replace(/^\[object (\S+)\]$/, "$1");
    },
  },
};
</script>

<style lang="less" scoped>
.ruleForm {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .item_input {
    display: flex;
    .append {
      white-space: nowrap;
      margin-left: 8px;
    }
  }
}
</style>
