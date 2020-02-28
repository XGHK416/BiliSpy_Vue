<template>
  <div class="block">
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage1: 1,
        currentPage2: 2,
        currentPage3: 3,
        currentPage4: 4
      };
    }
  }
</script> 
<style lang='scss' scoped>
.block{
  padding:0 32px 20px 32px;
  height: 80px;
  background-color: rgb(240, 242, 245);
  .pagination{
    padding: 30px 0;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    background-color: #ffffff;
  }

}
</style>