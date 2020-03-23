<template>
  <div>
    <el-row :gutter="10" type="flex" style="height:120px">
      <el-col :span="6">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="120"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          ></el-avatar>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="identity-wrapper">
          <div class="name">XGHK416</div>
          <div class="mid">mid:32213</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="uploader-option">
          <div>
            <el-button type="primary" style="width:100%">未在名单中</el-button>
          </div>
          <div>
            <el-button type="success" style="width:100%;margin-top:10px">侦测该用户</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="announcement-wrapper">
      <span style="font-size:16px;font-weight:bold">公告</span>
      <br />
    </div>
    <el-divider></el-divider>
    <div class="uploader-metric-wrapper">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="uploader-metric">
            <div class="metric-name follower">关注</div>
            <div class="metric-num">123123</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="uploader-metric">
            <div class="metric-name following">粉丝</div>
            <div class="metric-num">123123</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="uploader-metric">
            <div class="metric-name getLike">获赞</div>
            <div class="metric-num">123123</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="uploader-metric">
            <div class="metric-name view">播放</div>
            <div class="metric-num">123123</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploaderInfo",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.identity-wrapper {
  .name {
    color: #666;
    font-size: 24px;
    font-weight: bold;
  }
  .mid {
    font-size: 12px;
    color: #999;
  }
}
.announcement-wrapper {
  line-height: 20px;
  font-size: 16px;
  min-height: 120px;
  color: #212121;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}
.uploader-metric-wrapper {
  height: 170px;
  .uploader-metric {
    text-align: center;
    line-height: 75px;
    height: 75px;
    margin: 5px;
    .metric-name {
      font-weight: bold;
      border-radius: 5px;
      font-size: 24px;
      color: #ffffff;
      float: left;
      width: 40%;
    }
    .metric-num {
      font-size: 20px;
      color: #666;
      font-weight: bold;
      float: right;
      text-align: center;
      width: 50%;
    }
  }
  .follower {
    background: linear-gradient(90deg, #74ebd5 0%, #acb6e5 100%);
  }
  .following {
    background: linear-gradient(90deg, #e1eec3 0%, #f05053 100%);
  }
  .getLike {
    background: linear-gradient(90deg, #36d1dc 0%, #5b86e5 100%);
  }
  .view {
   background:linear-gradient(90deg, #3494e6 0%,#ec6ead 100% );
  }
}
</style>