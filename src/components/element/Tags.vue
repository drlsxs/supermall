<!--
 * @Description:
 * @FilePath:
 * @Author: 杨世林
 * @Date: 2021-05-03 11:39:20
 * @LastEditTime:
-->
<template>
  <div id="componentTags">
    <el-tag
      v-for="(tag,index) in tags"
      :key="tag.name"
      :class="tagIndex === index ? 'active':''"
      @click="getTag($event,index)"
      :type="tag.type">
      {{tag.name}}
    </el-tag>
  </div>
</template>

<script>
export default {
  props:{
    tags:{
      type: Array,
      default: () => []
    }
  },
  name: "componentTags",
  data() {
    return {
      tagIndex:null,
    };
  },
  created() {
  },
  methods: {
    getTag(e,index){
      const value = e.target.innerHTML
      this.tagIndex = index
      this.$emit('choose',{value,index})
    },
  }
}
</script>

<style lang="less" scoped>
#componentTags{

}

</style>
