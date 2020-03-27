<template>
  <div class="manage-wrapper">
    <div class="manage-option-wrapper">
      <div class="search-wrapper">
        <el-form :inline="true" :model="search_form" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="search_form.search_input" placeholder="搜索侦测"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="scanning-wrapper">
        <el-button type="primary">扫描无用账号</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户" width="150">
          <template slot-scope="scope" style="position: relative;">
            <div class="column-user">
              <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
              <div class="column-name">{{scope.row.uploader_name}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="mid" align="center" label="mid"></el-table-column>
        <el-table-column header-align="center" align="center" label="等级">
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.level}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column header-align="center" prop="create_time" align="center" label="最后登录时间"></el-table-column>
        <el-table-column header-align="center" prop="last_update" align="center" label="最后更新时间"></el-table-column>
        <el-table-column header-align="center" align="center" label="label">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleInfo(scope.row)">取消侦测</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          @current-change="paginationChange"
          @prev-click="paginationChange"
          @next-click="paginationChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_form: {
        search_input: ""
      },
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      tableData: [
        {
          uploader_name: "sss",
          mid: "mo1231",
          level: "管理员",
          create_time: "2020-1-23",
          last_update:'123123'
        },
         {
          uploader_name: "sss",
          mid: "mo1231",
          level: "管理员",
          create_time: "2020-1-23",
          last_update:'123123'
        },
         {
          uploader_name: "sss",
          mid: "mo1231",
          level: "管理员",
          create_time: "2020-1-23",
          last_update:'123123'
        },
         {
          uploader_name: "sss",
          mid: "mo1231",
          level: "管理员",
          create_time: "2020-1-23",
          last_update:'123123'
        },
      ]
    };
  },
  methods: {
    paginationChange(current_page) {
      console.log(current_page);
    },
    handleInfo(row) {
      (this.info = row), (this.$refs.info.dialogVisible = true);
    },
    handleWrittenOff(row) {
      this.$refs.written_off.dialogVisible = true;
    }
  }
};
</script>

<style lang='scss' scoped>
.manage-wrapper {
  padding: 32px;
  min-height: 800px;

  .manage-option-wrapper {
    background: #ffffff;
    border: 1px solid #e6e6e6;
    padding: 16px;
    .el-form-item {
      margin-bottom: 0;
    }
    .search-wrapper {
      display: inline-block;
      width: 40%;
    }
    .scanning-wrapper {
      text-align: right;
      width: 20%;
      float: right;
    }
  }
  .table-wrapper {
    padding: 16px;
    background: #ffffff;
    margin-top: 40px;
    .column-user {
      position: relative;
      .column-name {
        // float: right;
        position: absolute;
        top: 0;
        left: 60px;
      }
    }

    .pagination {
      margin-top: 25px;
      text-align: center;
    }
  }
}
</style>