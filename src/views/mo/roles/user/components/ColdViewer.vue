<template>
  <el-dialog title :visible.sync="dialogVisible" width="25%" center>
    <div>
      <div class="cold-info-wrapper">
        <span>冻结id：{{info.base_info.userId}}</span>
        <br />
        <span>冻结名称：{{info.base_info.nickName}}</span>
      </div>
      <el-divider></el-divider>
      <div class="cold-date-wrapper">
        冻结至：
        <el-date-picker
          v-model="cold_date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <el-divider></el-divider>
      <div>
        <el-input type="textarea" v-model="reason" placeholder="冻结理由" :min="4"></el-input>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="checkPassword">确 定</el-button>
    </div>
    <password-test ref="test_passwrod" @confirmSuccess="coldDateSelect"></password-test>
  </el-dialog>
</template>

<script>
import PasswordTest from '@/views/mo/components/PasswordTest'
import FilterDate from "@/components/FilterDate/index";
import { coldUser, decoldUser } from "@/api/mo_manager";
import { parseTime } from "@/utils/index";
export default {
  name: "ColdViewer",
  components: {
    FilterDate,
    PasswordTest 
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    currentId: {
      type: String,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      dialogVisible: false,
      cold_date: parseTime(Date.now()),
      reason: ""
    };
  },
  methods: {
    checkPassword(){
      this.$refs.test_passwrod.passwordDialog = true
    },
    coldDateSelect() {
      if (this.reason != "") {
        var data = {
          cold_user_id: this.info.base_info.userId,
          create_mo_id: this.user_id,
          cold_reason: this.reason
        };
        coldUser(data).then(Response => {
          if (Response.code == 20000) {
            this.$message({
              message: "已冻结该用户",
              type: "success"
            });
          }
          this.$emit('changeColdType',this.currentIndex)
        });
      } else {
        this.$message({
          message: "理由不能为空",
          type: "warning"
        });
      }
      this.dialogVisible = false
    }
  }
};
</script>

<style lang='scss' scoped>
.cold-info-wrapper {
  line-height: 30px;
  color: #666;
  font-size: 16px;
}
</style>