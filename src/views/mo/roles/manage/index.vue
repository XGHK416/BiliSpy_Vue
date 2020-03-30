<template>
  <div class="managerWrapper">
    <div class="manage-header">成员管理</div>
    <div class="manager-contain">
      <div class="manager-option-wrapper">
        <div class="manager-kind-wrapper">
          <el-button type="primary" plain @click="mo_type='admin'">监督者 {{admin_count}}</el-button>
          <el-button type="success" plain @click="mo_type='manager'">管理者 {{manager_count}}</el-button>
          <el-button type="primary" @click="handleAddMo" style="margin-left:10px">添加后台人员</el-button>
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
                <el-avatar shape="square" :size="50" :src="scope.row.profile"></el-avatar>
                <div class="column-name">{{scope.row.nickName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="moid" align="center" label="moid">
            <template slot-scope="scope" style="position: relative;">{{scope.row.userId}}</template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="角色">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.role=='manager'" type="success">管理者</el-tag>
              <el-tag v-else type="primary">监督者</el-tag>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="状态">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.usable=='1'">正常</el-tag>
              <el-tag type="warning" v-else>注销</el-tag>
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="latest_login" align="center" label="最后登录时间">
             <template slot-scope="scope">
           {{scope.row.lastLogin}}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="label">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleInfo(scope.row)">查看</el-button>
              <el-button
                type="warning"
                @click="handleWrittenOff(scope.row,scope.$index)"
                v-permission="['manager']"
                v-if="mo_type!='manager'&&scope.row.usable!='0'"
              >注销</el-button>
              <el-button
                type="success"
                plain
                @click="handleDisWrittenOff(scope.row,scope.$index)"
                v-permission="['manager']"
                v-if="mo_type!='manager'&&scope.row.usable!='1'"
              >恢复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="pagination_total_num"
          :page-size="page_size"
          @current-change="paginationChange"
          @prev-click="paginationChange"
          @next-click="paginationChange"
        ></el-pagination>
      </div>
    </div>
    <written-off :info="info" :current-id="current_id" :current-index="current_index" @changeType="changeType" ref="written_off" ></written-off>
    <info :info="info" :current-id="current_id" ref="info"></info>
    <add-mo ref="addMo"></add-mo>
  </div>
</template>

<script>
import {
  addNewMo,
  getUserList,
  getUserInfo,
  writtenOffUser,
  decoldUser,
  getCount
} from "@/api/mo_manager";
import permission from "@/directive/permission/index.js";
import WrittenOff from "../components/WrittenOff";
import Info from "../components/Info";
import AddMo from "../components/AddMo"
export default {
  name: "Manage",
  components: {
    WrittenOff,
    Info,
    AddMo
  },
  directives: { permission },
  data() {
    return {
      mo_type: "admin",
      manager_count: 0,
      admin_count: 0,
      page_size:10,

      pagination_total_num: 0,

      user_id: this.$store.state.user.user_id,
      // 查看用户信息
      info: {},
      current_id:'',
      current_index:0,
      // 搜索表单
      search_form: {
        search_input: ""
      },
      // 用户列
      tableData: []
    };
  },
  watch:{
    // 角色切换
    mo_type(val){
      this.mo_type = val
      this.getList(1)
      if(val=="manager"){
        this.pagination_total_num = this.manager_count
      }else{
        this.pagination_total_num = this.admin_count
      }
    }
  },
  methods: {
    // 封禁后改变状态
    changeType(index){
      if(this.tableData[index].usable == '1'){
        this.tableData[index].usable='0'
      }else{
        this.tableData[index].usable='1'
      }
    },
    // 页面切换
    paginationChange(current_page) {
      getList(current_page)
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
        this.info = response.data
        this.current_id = row.userId
      })
      this.$refs.info.dialogVisible = true
    },
    //封禁
    handleWrittenOff(row,index) {
      getUserInfo(row.userId).then(response => {
        this.info = response.data
        this.current_id = row.userId
        this.current_index = index
      })
      this.$refs.written_off.dialogVisible = true;
    },
    // 解封
    handleDisWrittenOff(row,index){
       writtenOffUser(this.user_id,row.userId,false).then(response=>{
        this.changeType(index)
        this.$message({
          message: '用户已解封',
          type: 'success'
        })
      })
    },
    // 添加管理人员
    handleAddMo(){
      this.$refs.addMo.dialogVisible = true;
    }
  },
  created() {
    getCount().then(response => {
      (this.manager_count = response.data.manager),
        (this.admin_count = response.data.admin),
        this.getList(1);
    });
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