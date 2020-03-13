<template>
  <div class="filterSection">
    日期 
    <el-radio-group v-model="current_select" size="medium" @change="selectChange">
      <el-radio-button :label="0">默认</el-radio-button>
      <el-radio-button v-for="item in data" :key="item.tname" :label="item.tid">{{item.tname}}</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "FilterSection",
  props: {
    data: {
      type: Array,
      default: true
    }
  },
  data() {
    return {
      current_select: 0
    };
  },
  methods: {
    selectChange(id) {
      this.$emit("handleSelectChange", id);
    }
  },
  create() {}
};
</script>
<style lang='scss' scope>
.filterSection {
  background: #ffffff;
}
</style>
