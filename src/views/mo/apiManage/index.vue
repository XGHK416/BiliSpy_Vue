<template>
  <div class="api-warpper">
    <div class="api-contain">
      <div class></div>
      <el-row :gutter="20" type="flex">
        <el-col :span="5">
          <el-menu class="el-menu-vertical-demo" @select="handleSelectApi">
            <el-submenu index="video">
              <template slot="title">
                <span>视频</span>
                <el-badge :value="video_api_unuseble" v-if="video_api_unuseble>0"></el-badge>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item,i) in video_api_menu" :key="item.id" :index="i+''">
                  {{item.apiName}}
                  <el-tag type="warning" size="mini" v-if="item.apiUseable!=1">故障</el-tag>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="uploader">
              <template slot="title">
                <span>up主</span>
                <el-badge :value="uploader_api_unseble" v-if="uploader_api_unseble>0"></el-badge>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item,i) in uploader_api_menu" :key="item.id" :index="i+''">
                  {{item.apiName}}
                  <el-tag type="warning" size="mini" v-if="item.apiUseable!=1">故障</el-tag>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <!-- ////////////////////////////////////////////////// -->
        <el-col :span="19">
          <div class="params-wrapper">
            <div class="params-address">
              <el-input v-model="api_info.apiUrl" placeholder disabled style="width:80%"></el-input>
              <el-tag type="success" v-if="api_info.apiUseable!=0">可用</el-tag>
              <el-tag type="warning" v-else>故障</el-tag>
              <el-button type="primary" style="width:8%;float:right" @click="handleTest">发送</el-button>
            </div>
            <div class="params-list">
              <el-table :data="params" style="width: 100%">
                <el-table-column prop="key" label="key"></el-table-column>
                <el-table-column prop="value" label="value">
                  <template slot-scope="{row}">
                    <template v-if="row.edit">
                      <el-input v-model="row.value" class="edit-input" size="small" />
                      <el-button
                        class="cancel-btn"
                        size="small"
                        icon="el-icon-refresh"
                        type="warning"
                        @click="cancelEdit(row)"
                      >cancel</el-button>
                    </template>
                    <span v-else>{{ row.value }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="descript" label="descript"></el-table-column>
                <el-table-column prop="edit" label="编辑" width="120">
                  <template slot-scope="{row}">
                    <el-button
                      v-if="row.edit"
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="confirmEdit(row)"
                    >Ok</el-button>
                    <el-button
                      v-else
                      type="primary"
                      size="small"
                      icon="el-icon-edit"
                      @click="row.edit=!row.edit"
                    >Edit</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="api-result">
            <div class="report">
              <el-button type="primary" @click="reportApi" v-if="api_info.apiUseable!=0">回报错误</el-button>
              <el-button
                type="primary"
                @click="recoverApi"
                v-if="api_info.apiUseable==0"
                v-permission="['manager']"
              >恢复api</el-button>
            </div>
            <div class="result">
              <pre>{{result}}</pre>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <report ref="report" :info="api_info" @changeType="changeType"></report>
  </div>
</template>

<script>
import permission from "@/directive/permission/index.js";
import {
  getApiTest,
  reportApi,
  getApiList,
  getApiParam,
  getApiReportInfo,
  getApiRecover
} from "@/api/api_manage";
import Report from "./components/Report";
export default {
  components: {
    Report
  },
  directives: { permission },
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      api_info: {},
      api_params: [],
      // json返回值
      result: {},
      //params 列表
      params: [],
      video_api_menu: [],
      video_api_unuseble: 0,
      uploader_api_menu: [],
      uploader_api_unseble: 0
    };
  },
  created() {
    getApiList().then(repsonse => {
      var { uploader, video } = repsonse.data;
      this.video_api_menu = video.list;
      this.video_api_unuseble = video.unusableCount;
      this.uploader_api_menu = uploader.list;
      this.uploader_api_unuseble = uploader.unusableCount;
    });
  },
  methods: {
    recoverApi() {
      getApiRecover(this.api_info.apiId, this.user_id).then(Response => {
        this.$message({
          message: "已解封",
          type: "success"
        });

        this.changeType(-1);
      });
    },
    // 因为改变api的状态而进行状态改变
    changeType(plus) {
      if (plus > 0) {
        this.api_info.apiUseable = 0;
      } else {
        this.api_info.apiUseable = 1;
      }

      if (this.api_info.apiSection == "uploader") {
        this.uploader_api_unseble += plus;
        // console.log(this.uploader_api_unseble);
      } else {
        this.video_api_unuseble += plus;
        // console.log(this.uploader_api_unseble);
      }
    },
    handleTest() {
      var param_line = "";
      var flag = 0;
      if (this.params.length == 0) {
        param_line = "";
      } else {
        this.params.forEach((element, index) => {
          if (element.value == "") {
            param_line = "";
            flag = 1;
          }
          if (this.params.length - 1 == index) {
            param_line += element.key + "=" + element.value;
          } else {
            param_line += element.key + "=" + element.value + "&";
          }
        });
        if (flag != 0) {
          this.$message({
            message: "请填写完整信息",
            type: "warning"
          });
        }
      }
      getApiTest(
        this.api_info.apiId,
        this.api_info.apiUrl,
        param_line,
        this.user_id
      ).then(Response => {
        this.result = Response.data.data;
      });
    },
    handleSelectApi(index, indexPath) {
      this.result = "{}";
      if (indexPath[0] == "video") {
        this.api_info = this.video_api_menu[+index];
      } else {
        this.api_info = this.uploader_api_menu[+index];
      }
      getApiParam(this.api_info.apiId).then(repsonse => {
        var list = [];
        var item = {};
        repsonse.data.forEach(element => {
          item.key = element.apiParam;
          (item.value = ""),
            (item.ori_value = ""),
            (item.descript = element.paramAbstract);
          item.edit = false;

          list.push(item);
          item = {};
        });
        this.params = list;
      });
    },
    reportApi() {
      this.$refs.report.dialogVisible = true;
    },
    cancelEdit(row) {
      row.value = row.ori_value;
      row.edit = false;
      this.$message({
        message: "已取消",
        type: "warning"
      });
    },
    confirmEdit(row) {
      console.log(row);
      row.edit = false;
      row.ori_value = row.value;
      this.$message({
        message: "已修改",
        type: "success"
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.api-warpper {
  padding: 36px;
  .api-contain {
    padding: 16px;
    background: #ffffff;
    .params-wrapper {
      .params-list {
        margin-top: 15px;
        .edit-input {
          padding-right: 100px;
        }
        .cancel-btn {
          position: absolute;
          right: 15px;
          top: 10px;
        }
      }
    }
  }
  .api-result {
    margin-top: 20px;
    .report {
      text-align: right;
    }
    .result {
      height: 600px;
      overflow-y: scroll;
      margin-top: 10px;
      border: 1px solid #e6e6e6;
      background: #fafafa;
    }
  }
}
</style>