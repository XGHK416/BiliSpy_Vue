<template>
  <div class="auths-wrapper">
    <div class="auths-head">
      <span>认证信息</span>
    </div>
    <el-row >
      <el-col :span="12" class="bili-auths">
        <div class="bili-auth-panel" >
          <div class="auth-icon-wrapper icon-bili">
            <svg-icon icon-class="bili" class-name="auth-icon-bili" />
          </div>
          <div class="bili-avatar">
            <div class="avatar-option" @mouseover="profileTextShow()" @mouseout="profileTextHide()">
              <span v-show="profile_text" v-if="is_band_bili" style="line-height:120px">进入空间</span>
              <span v-show="profile_text" v-else>绑定</span>
            </div>
            <el-avatar shape="square" :size="120" :src="default_url"></el-avatar>
            <span style="font-size: 15px;line-height: 25px;">mid:33333</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="auth-panel">
          <div class="auth-icon-wrapper icon-phone">
            <svg-icon icon-class="phone" class-name="auth-icon" />
          </div>
          <div class="auth-description">
            <div class="auth-text">
              {{ message_value(auths.phone) }}
              <el-button type="text" class="auth-option" @click="bandFunction('phone')">修改</el-button>
            </div>
          </div>
        </div>
        <div class="auth-panel">
          <div class="auth-icon-wrapper icon-email">
            <svg-icon icon-class="email" class-name="auth-icon" />
          </div>
          <div class="auth-description">
            <div class="auth-text">
              {{ message_value(auths.email) }}
              <el-button type="text" class="auth-option" @click="bandFunction('email')">修改</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="changeBandDialogVisible"
      width="400px"
    >
      <BandDialog :bandtype="band_type" />
    </el-dialog>
  </div>
</template>

<script>
import BandDialog from './Dialog/BandDialog'
export default {
  name: "UserAuths",
  components:{
    BandDialog,
  },
  props: {
    auths: {
      type: Object,
      default: () => {
        return {
          bili: "- -",
          email: "- -"
        };
      }
    }
  },
  data() {
    return {
      is_band_bili: false,
      profile_text: false,
      default_url:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        // 绑定邮箱手机
      band_list: {
        phone: "PHONE",
        email: "EMAIL"
      },
      band_type: "123",
      changeBandDialogVisible: false,
    };
  },
  methods: {
    profileTextShow() {
      this.profile_text = true;
    },
    profileTextHide() {
      this.profile_text = false;
    },
    message_value(msg) {
      if (msg !== "") {
        return msg;
      } else return "未绑定";
    },
    //绑定邮箱手机
    bandFunction(type) {
      this.band_type = this.band_list[type];
      this.changeBandDialogVisible = true;
    }
  }
};
</script>

<style lang='scss' scope>
.auths-wrapper {
  margin-top: 15px;
  min-height: 150px;
  background: #ffffff;
  .auths-head {
      padding: 5px;
    border-bottom: #e0e0e0 1px solid;
    // height: 30px;
    text-align: left;
    line-height: 30px;
    padding-left: 10px;
  }
  .auth-icon-wrapper {
    color: #fff;
    float: left;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .icon-bili {
    width: 140px;
    height: 140px;
    // color: #40c9c6;
    background: #f4516c;
  }
  .icon-phone {
    // color: #40c9c6;
    background: #40c9c6;
  }
  .icon-email {
    // color: #36a3f7;
    background: #36a3f7;
  }
  .auth-icon-bili {
    float: left;
    font-size: 100px;
  }
  .auth-icon {
    float: left;
    font-size: 30px;
  }
  .auth-description {
    float: right;
    font-weight: bold;
    margin: 10px;
    margin-left: 0px;
    margin-right: 40px;
    .auth-text {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      margin-bottom: 12px;
    }
    .auth-option {
      display: inline;
      margin-left: 10px;
      color: #36a3f7;
      font-size: 20px;
    }
    .auth-num {
      font-size: 20px;
    }
  }
  .auth-panel {
    padding: 10px;
    height: 85px;
    // cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }
  .bili-auth-panel {
    padding: 15px;
    height: 170px;
    // cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    .bili-avatar {
      text-align: center;
      float: right;
      font-weight: bold;
      width: 110px;
      height: 110px;
      .avatar-option {
        font-size: 25px;
        height: 120px;
        width: 120px;
        color: rgb(228, 228, 228);
        position: absolute;
        text-align: center;
        line-height: 120px;
        &:hover {
          background-color: rgba(51, 51, 51, 0.445);
          cursor: pointer;
        }
      }
    }
  }
}
</style>