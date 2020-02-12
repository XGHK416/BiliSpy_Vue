<template>
  <div>
    <el-form
      ref="changeInfoForm"
      :model="changeInfoForm"
      :rules="changeInfoRules"
      class="change-info-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">修改账号</h3>
      </div>

      <el-form-item prop="nickname">
        <el-input
          ref="nickname"
          v-model="changeInfoForm.nickname"
          placeholder="昵称"
          name="nickname"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleIt">提交</el-button>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'BandUserInfo',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      changeInfoForm: {
        nickname: ''
      },
      changeInfoRules: {
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: false,
      loading: false
    }
  },
  methods: {
    handleIt() {
      var baseInfo = {
        'nickName': this.changeInfoForm.nickname,
        'userId': this.$store.state.user.user_id
      }
      this.$store.dispatch('user/updateInfo',baseInfo).then((response) => {
        this.loading = true
        this.$message({
          'message': "修改成功",
          'type': 'success'
        })
      }).catch(() => {
          this.loading = false
        })
      // this.loading = true
      console.log(this.$store.state.user.user_id)
    //   this.$refs.registerForm.validate(valid => {
    //     if (valid) {
    //       this.loading = true
    //       this.$store.dispatch('user/register', this.registerForm).then(() => {
    //         console.log('get it!!')
    //         this.$message('注册成功')
    //         var self = this
    //         setTimeout(function() {
    //           self.$router.push({ path: this.redirect || '/' })
    //         }, 1000)
    //         this.loading = false
    //       }).catch(() => {
    //         this.loading = false
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray:#889aa4;
.register-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 35px 35px 150px;
  margin: 0 auto;
  overflow: hidden;
}
.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: rgb(58, 175, 243);
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
