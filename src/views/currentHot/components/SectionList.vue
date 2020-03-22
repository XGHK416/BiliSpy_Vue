<template>
  <el-table :data="tableData" style="width: 100%" :show-header="false">
    <el-table-column width="90">
      <template slot-scope="scope">
        <div style="margin-left: 10px;color:#666;height:60px;line-height:60px">
            <span style="font-size:45px">{{scope.$index+1}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column  >
      <template slot-scope="scope">
        <!-- <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover> -->
        <list-item :row="scope.row"></list-item>
      </template>
    </el-table-column>
    <el-table-column width="90">
      <template slot-scope="scope" >
        <div style="text-align: right;">
          <el-button size="medium" type="info" plain @click="handlePreView(scope.$index, scope.row)">查看</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import ListItem from "./ListItem";
export default {
  name: "SectionList",
  components: {
    ListItem
  },
  data() {
    return {
      tableData: [
        {
          title: "2016-05-02",
          metric_view: 3213,
          metric_comment: 231,
          metric_auth:"eee",
          score:2231223
        },
        {
          title: "201sdfs-02",
          metric_view: 3213,
          metric_comment: 231,
          metric_auth:"eee",
          score:2231223
        },
        {
          title: "20231602",
          metric_view: 3213,
          metric_comment: 231,
          metric_auth:"eee",
          score:2231223
        },
       {
          title: "2016-05-02",
          metric_view: 3213,
          metric_comment: 231,
          metric_auth:"eee",
          score:2231223
        },
      ]
    };
  },

  methods: {
    handlePreView(index, item) {
      console.log(index, item);
    }
  }
};
</script>

<style lang='scss' scope>
</style>