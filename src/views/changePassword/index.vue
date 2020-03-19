<template>
  <div style="margin-top:60px">
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="head-wrapper">
          <span>修改密码</span>
        </div>
        <div class="change-password-wrapper">
          <el-row :gutter="10">
            <el-col :span="12" :offset="6" style="text-alin-center">
              <div class="password-panel">
                <div class="password-icon-wrapper icon-password">
                  <svg-icon icon-class="password" class-name="password-icon" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>

          <rest-password style="margin-top:30px"></rest-password>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RestPassword from "./components/resetPassword";
export default {
  name: "changePassword",
  components: {
    RestPassword
  }
};
</script>

<style lang='scss' scope>
.head-wrapper{
    background: #ffff;
    padding: 10px 10px 10px 20px;
    // margin-left: 5px;
    border-bottom: 1px solid #DCDFE6;
    color: #666;
}
.change-password-wrapper {
  padding: 32px;
  background: #ffff;
  .password-panel {
    margin: 0 auto;
    padding: 10px;
    height: 150px;
    width: 150px;
    // cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .password-icon-wrapper {
      color: #fff;
      padding: 25px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .password-icon {
      font-size: 80px;
    }
    .icon-password {
      // color: #40c9c6;
      background: #40c9c6;
    }
  }
}
</style>