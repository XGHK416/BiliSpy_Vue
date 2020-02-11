<template>
  <div>
    <!-- changeBandRules -->
    <el-form
      ref="changeBandForm"
      :model="changeBandForm"
      class="change-band-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">绑定{{ b_type[bandtype] }}</h3>
      </div>

      <el-form-item prop="b_value">
        <el-input
          ref="b_value"
          v-model="changeBandForm.b_value"
          name="b_value"
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
  name: 'BandDialog',
  props: {
    bandtype: {
      type: String,
      default: 'dd'
    }
  },
  data() {
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      changeBandForm: {
        b_value: ''
      },
      b_type: {
        'PHONE': '手机',
        'EMAIL': '邮箱'
      },
      // changeInfoRules: {
      //   password: [
      //     { required: true, trigger: 'blur', validator: validatePassword }
      //   ]
      // },
      loading: false
    }
  },
  methods: {
    handleIt() {
      console.log(this.bandtype)
      // this.loading = true
      console.log(this.$store.state.user.user_id)
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
