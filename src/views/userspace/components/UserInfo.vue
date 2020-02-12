<template>
  <el-row :gutter="40" class="panel-group">
    <el-col class="card-panel-col" :lg="6" :md="12">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-profile-wrapper">
          <div class="card-panel-profile-change" @mouseover="profileTextShow()" @mouseout="profileTextHide()">
            <span v-show="profile_text" class="card-panel-profile-change-text" @click="UploadProfileVisible = !UploadProfileVisible">修改图像</span>
          </div>
          <el-avatar class="card-panel-profile" shape="square" :size="80" :src="info.profile" />
        </div>
        <div class="card-panel-role">
          <el-tag type="success" size="small">用户</el-tag>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户：{{ info.nickName }}
            <el-button type="text" class="card-panel-option" @click="changeInfoDialogVisible = true">修改</el-button>
          </div>
          <div class="card-panel-text">
            id：{{ info.userId }}
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col" :lg="6" :md="12">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-phone">
          <svg-icon icon-class="phone" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            手机：{{ message_value(auths.phone) }}
            <el-button type="text" class="card-panel-option" @click="bandFunction('phone')">修改</el-button>
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col" :lg="6" :md="12">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-email">
          <svg-icon icon-class="email" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            邮箱：{{ message_value(auths.email) }}
            <el-button type="text" class="card-panel-option" @click="bandFunction('email')">修改</el-button>
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col" :lg="6" :md="12">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-bili">
          <svg-icon icon-class="bili" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            B站：{{ message_value(auths.bili) }}
            <el-button type="text" class="card-panel-option">修改</el-button>
          </div>
        </div>
      </div>
    </el-col>
    <el-dialog
      :visible.sync="changeInfoDialogVisible"
      width="400px"
    >
      <BandUserInfoDialog />
    </el-dialog>

    <el-dialog
      :visible.sync="changeBandDialogVisible"
      width="400px"
    >
      <BandDialog :bandtype="band_type" />
    </el-dialog>
    <div id="uploadProfile">
      <MyUpload
        v-model="UploadProfileVisible"
        :width="300"
        :height="300"
        url="/upload"
        img-format="png"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
      />
      <img :src="imgDataUrl">
    </div>
  </el-row>
</template>

<script>
import BandUserInfoDialog from './Dialog/BandUserInfoDialog'
import BandDialog from './Dialog/BandDialog'
import 'babel-polyfill' // es6 shim
import MyUpload from 'vue-image-crop-upload'
export default {
  name: 'UserInfo',
  components: {
    BandUserInfoDialog,
    BandDialog,
    MyUpload
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          nickName: 'dd'
        }
      }
    },
    auths: {
      type: Object,
      default: () => {
        return {
          bili: '- -',
          email: '- -'
        }
      }
    }
  },
  data() {
    return {
      profile_text: false,
      dialogVisible: false,
      changeInfoDialogVisible: false,
      changeBandDialogVisible: false,
      UploadProfileVisible: false,
      band_list: {
        'phone': 'PHONE',
        'email': 'EMAIL'
      },
      band_type: '123',
      imgDataUrl: ''

    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    profileTextShow() {
      this.profile_text = true
    },
    profileTextHide() {
      this.profile_text = false
    },
    message_value(msg) {
      if (msg !== '') {
        return msg
      } else return '未绑定'
    },
    bandFunction(type) {
      this.band_type = this.band_list[type]
      this.changeBandDialogVisible = true
    },
    handleProfileDialogStatus() {
      this.UploadProfileVisible = !this.UploadProfileVisible
    },
    // 上传图片
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    // cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    .card-panel-icon-wrapper {
        color: #fff;
      }
    .icon-phone {
      // color: #40c9c6;
      background: #40c9c6;
    }
    .icon-email {
      // color: #36a3f7;
      background: #36a3f7;
    }
    .icon-bili {
      // color: #ff788e;
      background: #f4516c;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-profile-wrapper {
      float: left;
      padding: 16px;
      position: relative;
      .card-panel-profile-change {
        font-size: 30px;
        height: 80px;
        width: 80px;
        color: rgb(228, 228, 228);
        position: absolute;
        text-align: center;
        line-height: 80px;
        &:hover{
        background-color: rgba(51, 51, 51, 0.445);
        cursor: pointer;
      }
      }
    }
    .card-panel-role{
      padding-top: 16px;
      float: left;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 10px;
      margin-left: 0px;
      margin-right: 40px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
        margin-bottom: 12px;
      }
      .card-panel-option {
        display: inline;
        margin-left: 10px;
        color: #36a3f7;
        font-size: 20px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
