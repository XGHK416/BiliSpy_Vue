<template>
  <div class="list-wrapper">
    <div class="filter-option">
      <div class="left-filter">
        <el-radio-group v-model="filter_option">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="wait">未开始</el-radio-button>
          <el-radio-button label="active">以开始</el-radio-button>
          <el-radio-button label="close">已结束</el-radio-button>
        </el-radio-group>
      </div>
      <div class="right-filter">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="search_input" placeholder="按up主名称查找"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="list">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="detectId" label="id"></el-table-column>
        <el-table-column prop="uploaderName" label="监控对象"></el-table-column>
        <el-table-column prop="uploaderId" label="监控对象id"></el-table-column>
        <el-table-column prop="time" label="次数"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="during" label="起始时间"></el-table-column>
        <el-table-column prop="rate" label="侦测频率"></el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="onInfo(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploaderList",
  data() {
    return {
      search_input: "",
      filter_option: "all",
      tableData: [
        {
          detectId: "201602",
          uploaderName: "王小虎",
          uploaderId: "89888",
          state: "开始",
          time:5,
          during: "2020-1-32--3221-213 1518 弄",
          rate: "10分钟"
        },
        {
          detectId: "201602",
          uploaderName: "王小虎",
          uploaderId: "89888",
          state: "开始",
          time:5,
          during: "2020-1-32--3221-213 1518 弄",
          rate: "10分钟"
        },
        {
          detectId: "201602",
          uploaderName: "王小虎",
          uploaderId: "89888",
          state: "开始",
          time:5,
          during: "2020-1-32--3221-213 1518 弄",
          rate: "10分钟"
        },
        {
          detectId: "201602",
          uploaderName: "王小虎",
          uploaderId: "89888",
          state: "开始",
          time:5,
          during: "2020-1-32--3221-213 1518 弄",
          rate: "10分钟"
        }
      ]
    };
  },
  methods: {
    onSearch() {},
    onInfo(row) {}
  },
  created() {}
};
</script>

<style lang='scss' scoped>
.filter-option {
  .left-filter {
    float: left;
  }
  .right-filter {
    float: right;
  }
}
</style>