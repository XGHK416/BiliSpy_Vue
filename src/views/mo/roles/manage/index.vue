<template>
  <div class="managerWrapper">
    <div class="manage-header">成员管理</div>
    <div class="manager-contain">
      <div class="manager-option-wrapper">
        <div class="manager-kind-wrapper">
          <el-button type="primary" plain>管理员 150</el-button>
          <el-button type="success" plain>高级管理 3</el-button>
        </div>
        <div class="manager-search-wrapper">
          <el-form :inline="true" :model="search_form" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="search_form.search_input" placeholder="昵称/moid"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="user-table-wrapper">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="用户" width="150">
            <template slot-scope="scope" style="position: relative;">
              <div class="column-user">
                <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
                <div class="column-name">{{scope.row.name}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="moid" align="center" label="moid"></el-table-column>
          <el-table-column header-align="center" align="center" label="label">
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.role}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="latest_login" align="center" label="最后登录时间"></el-table-column>
          <el-table-column header-align="center" align="center" label="label">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleInfo(scope.row)">查看</el-button>
              <el-button type="warning" @click="handleWrittenOff(scope.row)">注销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <written-off :info="info" ref="written_off"></written-off>
    <info :info="info" ref="info"></info>
  </div>
</template>

<script>
import WrittenOff from "../components/WrittenOff";
import Info from "../components/Info";
export default {
  name: "Manage",
  components: {
    WrittenOff,
    Info
  },
  data() {
    return {
      info: {},
      search_form: {
        search_input: ""
      },
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      tableData: [
        {
          name: "sss",
          moid: "mo1231",
          role: "管理员",
          latest_login: "2020-1-23"
        },
        {
          name: "sss",
          moid: "mo1231",
          role: "管理员",
          latest_login: "2020-1-23"
        },
        {
          name: "sss",
          moid: "mo1231",
          role: "管理员",
          latest_login: "2020-1-23"
        },
        {
          name: "sss",
          moid: "mo1231",
          role: "管理员",
          latest_login: "2020-1-23"
        }
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
.managerWrapper {
  padding: 32px;
  .manage-header {
    padding-left: 10px;
    background: #ffffff;
    color: #666;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e6e6e6;
  }
  .manager-contain {
    min-height: 300px;
    padding: 16px;
    background: #ffffff;
    .manager-option-wrapper {
      .manager-kind-wrapper {
        float: left;
      }
      .manager-search-wrapper {
        float: right;
        .el-button {
          display: inline;
        }
      }
    }
    .user-table-wrapper {
      padding: 16px;
      .column-user {
        position: relative;
        .column-name {
          // float: right;
          position: absolute;
          top: 0;
          left: 60px;
        }
      }
    }
    .pagination {
      text-align: center;
    }
  }
}
</style>