<template>
  <div>
    <el-dialog title="信息展示" :visible.sync="dialogVisible" width="25%">
      <div class="writtenOff-info-wrapper">
        <div>注销管理员： {{info.name}}</div>
        <div>注销id： {{info.moid}}</div>
      </div>
      <el-divider></el-divider>
      <div class="writtenOff-form-wrapper">
        <el-form :model="written_off_form" class="demo-form-inline">
          <el-form-item>
            <el-form-item>
              <el-input
                type="textarea"
                :autosize="{minRows: 4}"
                v-model="written_off_form.reason"
                placeholder="封禁理由"
              ></el-input>
            </el-form-item>
            <el-input
              style="margin-top:10px"
              v-model="written_off_form.current_password"
              type="password"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirmWrittenOff">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "WrittenOff",
  props: {
    info: {
      type: Object,
      default: function() {
        return {
          name: "ssd",
          moid: "sd"
        };
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      written_off_form: {
        reason: "",
        current_password: ""
      }
    };
  },
  methods: {
    resetForm() {
      (this.written_off_form.reason = ""),
        (this.written_off_form.current_password = "");
    },
    comfirmWrittenOff() {
      this.dialogVisible = false;
      ///////////////////////

      ///////////////////////
      this.resetForm();
    }
  }
};
</script>

<style lang='scss' scoped>
.writtenOff-info-wrapper {
  color: #666;
  font-size: 18px;
  line-height: 35px;
}
.writtenOff-form-wrapper {
  margin-top: 10px;
}
</style>