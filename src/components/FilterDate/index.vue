<template>
  <div class="filterDate">
      分类 
    <el-date-picker
      v-model="val"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions"
      @change="selectChange"
      value-format="yyyy-MM-dd"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: "FilterDate",
  props: {
      defaultDate:{
          type:Date,
          default:Date()
      }
  },
  data() {
    return {
      val: this.defaultDate,
      pickerOptions: {
        disabledDate(time) {
          // console.log(time.getTime()>this.limit_date.getTime())
          return (
            time.getTime() < new Date("2020/2/20").getTime() ||
            time.getTime() > Date.now()-24*60*60*1000
          );
        }
      }
    };
  },
  methods: {
    selectChange(date) {
      this.$emit("handleDateChange", date);
    }
  },
  create() {}
};
</script>
<style lang='scss' scope>
.filterDate {
  background: #ffffff;
}
</style>
