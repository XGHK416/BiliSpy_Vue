<template>
  <div>
    <el-dialog title="报错回馈" :visible.sync="dialogVisible" width="25%">
      <div class="report-info-wrapper">
        <div>报错api： {{info.apiName}}</div>
        <div>报错apiId： {{info.apiId}}</div>
      </div>
      <el-divider></el-divider>
      <div class="report-form-wrapper">
        <el-form :model="report" class="demo-form-inline">
          <el-form-item>
            <el-form-item>
              <el-input
                type="textarea"
                :autosize="{minRows: 6}"
                v-model="report.reason"
                placeholder="报错原因及描述"
              ></el-input>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirmReport">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reportApi, getApiReportInfo } from "@/api/api_manage";
import { parseTime } from "@/utils/index";
export default {
  name: "Report",
  props: {
    info: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      dialogVisible: false,
      report: {
        reason: ""
      }
    };
  },
  methods: {
    resetForm() {
      this.report.reason = "";
    },
    comfirmReport() {
      if (this.report.reason != "") {
        reportApi(
          this.info.apiId,
          this.report.reason,
          this.user_id,
          0
        ).then(Response => {
          if (Response.code == 20000) {
            this.$emit('changeType',1)
            this.$message({
              message: "已汇报api故障",
              type: "success"
            });
          }
        });
      }else{
        this.$message({
          message: '请填写理由',
          type: 'warning'
        })
      }

      this.dialogVisible = false;
      this.resetForm();
    }
  }
};
</script>

<style lang='scss' scoped>
.report-info-wrapper {
  color: #666;
  font-size: 18px;
  line-height: 35px;
}
.report-form-wrapper {
  margin-top: 10px;
}
</style>