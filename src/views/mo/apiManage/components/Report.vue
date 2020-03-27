<template>
  <div>
    <el-dialog title="报错回馈" :visible.sync="dialogVisible" width="25%">
      <div class="report-info-wrapper">
        <div>报错api： {{info.api_name}}</div>
        <div>报错apiId： {{info.api_id}}</div>
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
export default {
  name: "Report",
  props: {
    info: {
      type: Object,
      default: function() {
        return {
         
        };
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      report: {
        reason: "",
      }
    };
  },
  methods: {
    resetForm() {
      (this.report.reason = "")
    },
    comfirmReport() {
      this.dialogVisible = false;
      ///////////////////////

      ///////////////////////
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