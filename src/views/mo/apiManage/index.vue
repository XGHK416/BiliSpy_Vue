<template>
  <div class="api-warpper">
    <div class="api-contain">
      <div class></div>
      <el-row :gutter="20" type="flex">
        <el-col :span="5">
          <el-menu default-active="2" class="el-menu-vertical-demo"
          @select="handleSelectApi">
            <el-submenu index="1">
              <template slot="title">
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="19">
          <div class="params-wrapper">
            <div class="params-address">
              <el-input v-model="api_info.address" placeholder disabled style="width:80%"></el-input>
              <el-tag type="success">可用</el-tag>
              <el-button type="primary" style="width:8%;float:right">发送</el-button>
            </div>
            <div class="params-list">
              <el-table :data="tableData" style="width: 100%">
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
              <el-button type="primary" @click="reportApi">回报错误</el-button>
            </div>
            <div class="result">
              <pre>{{result}}</pre>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <report ref="report" :info="api_info"></report>
  </div>
</template>

<script>
import Report from './components/Report'
export default {
  components:{
    Report
  },
  data() {
    return {
      api_info:{
        address:'qqweqwe',
        api_id:'123',
        api_name:'1·ad·',

      },
      // json返回值
      result: {
       
      },
      //params 列表
      tableData: [
        {
          key: "2016-05-02",
          value: "王小虎",
          ori_value: "王小虎",
          descript: "上海市普陀区金沙江路 1518 弄",
          edit: false
        }
      ]
    };
  },
  methods: {
    handleSelectApi(index,indexPath){
      this.api_info.api_id = index,
      // api赋值
      // this.api_info.api_name = indexPath
      console.log(index,indexPath)
    },
    reportApi(){
      this.$refs.report.dialogVisible = true
    },
    cancelEdit(row) {
      row.value = row.ori_value;
      row.edit = false;
      this.$message({
        message: "The title has been restored to the original value",
        type: "warning"
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.ori_value = row.value;
      this.$message({
        message: "The title has been edited",
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
    height: 900px;
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
        min-height: 100px;
      margin-top: 10px;
      border: 1px solid #e6e6e6;
      background: #fafafa;
    }
  }
}
</style>