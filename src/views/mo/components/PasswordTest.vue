<template>
  <el-dialog title="密码确认" :visible.sync="passwordDialog" width="20%" center append-to-body>
    <div>
      <el-input v-model="current_password" placeholder="请确认密码" type="password"></el-input>
    </div>
    <div slot="footer">
      <el-button @click="passwordDialog = false">取 消</el-button>
      <el-button type="primary" @click="passwordConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {authenticatePassword} from '@/api/authenticate'
export default {
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      passwordDialog: false,
      current_password: ""
    };
  },
  methods: {
    passwordConfirm() {
      if(this.current_password!=''){
        authenticatePassword(this.user_id,this.current_password).then(Response=>{
          if(Response.code==20000){
            this.$emit('confirmSuccess')
            this.passwordDialog = false
          }else{
            this.$emit('confirmFailed')
            this.$message({
              message: '密码错误',
              type: 'danger'
            })
            this.passwordDialog = false
          }
        })

      }else{
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
      }
    }
  }
};
</script>

<style lang='scss' scoped>
</style>