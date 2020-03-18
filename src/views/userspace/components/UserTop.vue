<template>
  <div class="top-wrapper">
    <div class="info-head">
      <span>个人信息</span>
    </div>
    <el-row type="flex">
      <el-col :span="4">
        <div class="avatar-wrapper">
          <div
            class="profile-change"
            @mouseover="profileTextShow()"
            @mouseout="profileTextHide()"
            @click="handleProfileDialogStatus"
          >
            <span v-show="profile_text" class="profile-change-text">修改图像</span>
          </div>
          <el-avatar class="profile" shape="square" :size="120" :src="info.profile" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="info-wrapper">
          <div class="nick-name-wrapper">
            <span class="nick-name" v-show="!nick_name_show">用户：{{ info.nickName }}</span>
            <el-button
              type="text"
              class="nick-name-button"
              @click="changeNickName"
              v-show="!nick_name_show"
            >修改</el-button>
            <el-input
              style="width:70%"
              v-model="nick_name"
              :placeholder="info.nickName"
              v-show="nick_name_show"
            ></el-input>
            <el-button
              type="text"
              class="nick-name-button"
              @click="NickNameChanged"
              v-show="nick_name_show"
            >完成</el-button>
          </div>
          <div class="user_id">id：{{ info.userId }}</div>
        </div>
      </el-col>
    </el-row>
    <div id="uploadProfile">
      <UploaderProfile ref="avatar_dialog"></UploaderProfile>
    </div>
  </div>
</template>

<script>
import UploaderProfile from "./ProfileUpload/UploadProfile";
export default {
  name: "UserTop",
  components: {
    UploaderProfile: UploaderProfile
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          nickName: "dd"
        };
      }
    }
  },
  data() {
    return {
      nick_name: "",
      nick_name_show: false,
      profile_text: false
    };
  },
  methods: {
    changeNickName() {
      this.nick_name_show = true;
    },
    NickNameChanged() {
      this.nick_name_show = false;
    },
    handleProfileDialogStatus() {
      this.$refs.avatar_dialog.show = true;
    },
    profileTextShow() {
      this.profile_text = true;
    },
    profileTextHide() {
      this.profile_text = false;
    }
  }
};
</script>

<style lang='scss' scope>
.top-wrapper {
  min-height: 150px;
  background: #ffffff;
  .info-head {
    padding: 5px;
    border-bottom: #e0e0e0 1px solid;
    // height: 30px;
    text-align: left;
    line-height: 30px;
    padding-left: 10px;
  }
  .avatar-wrapper {
    padding: 16px;
    position: relative;
    .profile-change {
      font-size: 30px;
      height: 120px;
      width: 120px;
      color: rgb(228, 228, 228);
      position: absolute;
      text-align: center;
      line-height: 80px;
      .profile-change-text {
        line-height: 120px;
      }
      &:hover {
        background-color: rgba(51, 51, 51, 0.445);
        cursor: pointer;
      }
    }
  }
  .info-wrapper {
    padding: 16px;
    .nick-name-wrapper {
      .nick-name {
        font-size: 24px;
      }
      .nick-name-button {
        max-width: 100px;
        display: inline;
        margin-left: 10px;
        color: #36a3f7;
        font-size: 20px;
      }
    }
    .nick-name {
      font-size: 24px;
    }
    .user_id {
      margin-top: 5px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      margin-bottom: 12px;
    }
  }
}
</style>