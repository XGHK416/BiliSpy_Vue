<template>
  <el-row :gutter="40" class="panel-group">
    <el-col class="card-panel-col" :lg="6">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-profile-wrapper">
          <div class="card-panel-profile-change" @mouseover="profileTextShow()" @mouseout="profileTextHide()">
            <span v-show="profile_text" class="card-panel-profile-change-text">修改图像</span>
          </div>
          <el-avatar class="card-panel-profile" shape="square" :size="80" :src="info.profile" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户：{{ info.nickName }}
            <span class="card-panel-option">修改</span>
          </div>
          <div class="card-panel-text">
            id：{{ info.userId }}
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col" :lg="6">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="phone" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户：{{ info.nickName }}
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col" :lg="6">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户：{{ info.nickName }}
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col" :lg="6">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户：{{ info.nickName }}
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          nickName: 'dd'
        }
      }
    }
  },
  data() {
    return {
      profile_text: false
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
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
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
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-option {
        cursor: pointer;
        margin-left: 10px;
        color: #36a3f7;
        font-size: 13px;
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
