<template>
  <div class="viewerWrapper">
    <div class="viewer-header">成员管理</div>
    <div class="viewer-contain">
      <div class="viewer-option-wrapper">
        <div class="viewer-search-wrapper">
          <el-form :inline="true" :model="search_form" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="search_form.search_input" placeholder="昵称/userId"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="user-table-wrapper">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="用户" width="150">
            <template slot-scope="scope" style="position: relative;">
              <div class="column-user">
                <el-avatar shape="square" :size="50" :src="scope.row.profile"></el-avatar>
                <div class="column-name">{{scope.row.nickName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="moid" align="center" label="moid">
            <template slot-scope="scope" style="position: relative;">{{scope.row.userId}}</template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="状态">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.usable=='1'&&scope.row.isCold==0">正常</el-tag>
              <el-tag type="warning" v-else-if="scope.row.usable=='0'">注销</el-tag>
              <!-- <el-tag type="info" v-if="scope.row.isCold==1">冻结</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="latest_login" align="center" label="最后登录时间">
            <template slot-scope="scope">{{scope.row.lastLogin}}</template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleInfo(scope.row)">查看</el-button>
              <el-button
                type="warning"
                @click="handleWrittenOff(scope.row,scope.$index)"
                v-permission="['manager']"
                v-if="scope.row.usable!='0'"
              >注销</el-button>
              <el-button
                type="success"
                plain
                @click="handleDisWrittenOff(scope.row,scope.$index)"
                v-permission="['manager']"
                v-if="scope.row.usable!='1'"
              >恢复</el-button>
              <!-- <el-button type="info" v-if="scope.row.isCold==0" @click="handleCold(scope.row,scope.$index)">冻结</el-button> -->
              <!-- <el-button type="info" v-else plain @click="handleDisCold(scope.row,scope.$index)">解冻</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          @current-change="paginationChange"
          @prev-click="paginationChange"
          @next-click="paginationChange"
        ></el-pagination>
      </div>-->
    </div>
    <written-off
      :info="info"
      :current-id="current_id"
      :current-index="current_index"
      @changeType="changeType"
      ref="written_off"
    ></written-off>
    <viewer-info :info="info" :current-id="current_id" ref="info"></viewer-info>
    <cold-viewer :info="info" :current-id="current_id" :current-index="current_index" ref="cold" @changeColdType="changeColdType"></cold-viewer>
    
  </div>
</template>

<script>
import {
  searchUser,
  getUserList,
  getUserInfo,
  writtenOffUser,
  coldUser,
  decoldUser
} from "@/api/mo_manager";


import permission from "@/directive/permission/index.js";
import ColdViewer from './components/ColdViewer';
import WrittenOff from "../components/WrittenOff";
import ViewerInfo from "./components/ViewerInfo";
import { parseTime } from "@/utils/index";
export default {
  name: "Manage",
  components: {
    WrittenOff,
    ViewerInfo,
    ColdViewer,
  },
  directives: { permission },
  data() {
    return {
      // 分页
      page_size: 10,
      pagination_total_num: 0,
      // 用户id
      user_id: this.$store.state.user.user_id,
      // 查看用户信息
      info: {
        base_info: {},
        auths: {}
      },
      current_id: "",
      current_index: 0,
      // 搜索表单
      search_form: {
        search_input: ""
      },
      tableData: []
    };
  },
  methods: {

    // 点击查询
    handleSearch() {
      if (this.search_form.search_input != "") {
        searchUser(this.search_form.search_input, "viewer").then(response => {
          this.tableData = response.data;
        });
      } else {
        this.$message({
          message: "请输入查询内容",
          type: "warning"
        });
      }
    },
  
    // 冻结
    handleCold(row,index){
      getUserInfo(row.userId).then(response => {
        this.info = response.data;
        this.current_id = row.userId;
        this.current_index = index;
      });
      this.$refs.cold.dialogVisible=true
    },
    //解冻
    handleDisCold(row,index){
      decoldUser(row.userId,this.user_id).then(Response=>{
        this.$message({
          message: '以解冻该用户',
          type: 'success'
        })
        row.isCold=0
      })
    },
    changeColdType(index){
       if (this.tableData[index].isCold == 1) {
        this.tableData[index].isCold = 0;
      } else {
        this.tableData[index].isCold = 1;
      }
    },
    
    // 封禁后改变状态
    changeType(index) {
      if (this.tableData[index].usable == "1") {
        this.tableData[index].usable = "0";
      } else {
        this.tableData[index].usable = "1";
      }
    },
    // 页面切换
    paginationChange(current_page) {
      getList(current_page);
    },
    // 获取列表
    getList(current_page) {
      getUserList(current_page, this.page_size, this.mo_type).then(response => {
        this.tableData = response.data;
      });
    },
    // 查看信息
    handleInfo(row) {
      getUserInfo(row.userId).then(response => {
        this.info = response.data;
        this.current_id = row.userId;
      });
      this.$refs.info.dialogVisible = true;
    },
    //封禁
    handleWrittenOff(row, index) {
      getUserInfo(row.userId).then(response => {
        this.info = response.data;
        this.current_id = row.userId;
        this.current_index = index;
      });
      this.$refs.written_off.dialogVisible = true;
    },
    // 解封
    handleDisWrittenOff(row, index) {
      writtenOffUser(this.user_id, row.userId, false).then(response => {
        this.changeType(index);
        this.$message({
          message: "用户已解封",
          type: "success"
        });
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.viewerWrapper {
  padding: 32px;
  .viewer-header {
    padding-left: 10px;
    background: #ffffff;
    color: #666;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e6e6e6;
  }
  .viewer-contain {
    min-height: 300px;
    padding: 16px;
    background: #ffffff;
    .viewer-option-wrapper {
      .viewer-search-wrapper {
        float: left;
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