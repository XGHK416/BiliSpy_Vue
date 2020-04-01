<template>
  <div class="manage-wrapper">
    <div class="manage-option-wrapper">
      <div class="search-wrapper">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="search_input" placeholder="搜索侦测"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="scanning-wrapper">
        <el-button type="primary" @click="handleScan">扫描无用账号</el-button>
      </div>
    </div>
    <!-- ///////////////////////////////////////// -->
    <div class="table-wrapper">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column label="id" width="150" prop="user_id"></el-table-column>
        <el-table-column label="昵称" prop="nick_name"></el-table-column>
        <el-table-column label="等级" prop="level"></el-table-column>
        <el-table-column label="粉丝" prop="following"></el-table-column>
        <el-table-column label="视频数目" prop="video_count"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <el-table-column label="侦测次数" prop="count"></el-table-column>
        <el-table-column label="侦测次数" prop="count">
          <template slot-scope="scope">
            <el-button type="warning" plain @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="100"
          :page-size="page_size"
          :current-page="current_page"
          @current-change="paginationChange"
          @prev-click="paginationChange"
          @next-click="paginationChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  deleteDetectObject,
  selectUploader,
  scanUnusable
} from "@/api/detect_manager";
export default {
  data() {
    return {
      flag: 0,
      user_id: this.$store.state.user.user_id,
      current_page: 1,
      page_size: 15,
      search_input: "",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      tableData: []
    };
  },
  methods: {
    handleScan() {
      this.flag = 1;
      scanUnusable(1, this.page_size).then(Response => {
        this.tableData = Response.data;
      });
    },
    handleDelete(index, row) {
      deleteDetectObject(this.user_id, row.user_id).then(Response => {
        this.$message({
          message: "已删除",
          type: "success"
        });
        this.tableData.splice(index, 1);
      });
    },
    handleSearch() {
      this.flag = 0;
      selectUploader(this.search_input, this.current_page, this.page_size).then(
        Response => {
          this.tableData = Response.data;
        }
      );
    },
    paginationChange(current_page) {
      this.current_page = current_page;
      if (this.flag == 1) {
        scanUnusable(this.current_page, this.page_size).then(Response => {
          this.tableData = Response.data;
        });
      } else {
        selectUploader(
          this.search_input,
          this.current_page,
          this.page_size
        ).then(Response => {
          this.tableData = Response.data;
        });
      }
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