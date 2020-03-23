<template>
  <div>
    <el-row type="flex" :gutter="20">
      <el-col :span="4">
        <div class="video-profile"></div>
      </el-col>
      <el-col :span="12">
        <div class="video-section-wrapper">
          <div class="video-title">
            <span>这是一段标题</span>
          </div>
          <div class="video-section">
            <el-tag type="success" effect="dark" size="small">标签二</el-tag>
          </div>
          <div class="video-tag">
            <el-tag type="success" size="mini">标签二</el-tag>
            <el-tag type="warning" size="mini">标签二</el-tag>
            <el-tag type="danger" size="mini">标签二</el-tag>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="video-option-wrapper">
          <el-button type="primary">已在侦测名单中</el-button>
          <el-button type="success">收藏</el-button>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="video-abstract-wrapper">
      <span style="font-size:16px;font-weight:bold">简介</span>
      <br />
    </div>
    <el-divider></el-divider>
    <div class="video-metric-wrapper">
      <el-row type="flex" justify="center">
        <el-col :span="4">
          <el-progress
            type="dashboard"
            :percentage="percentage"
            :format="formatLike"
            :color="metric[0].color"
          ></el-progress>
          <div class="metric-text">点赞</div>
        </el-col>
        <el-col :span="4">
          <el-progress
            type="dashboard"
            :percentage="percentage"
            :format="formatCoins"
            :color="metric[1].color"
          ></el-progress>
          <div class="metric-text">硬币</div>
        </el-col>
        <el-col :span="4">
          <el-progress
            type="dashboard"
            :percentage="percentage"
            :format="formatFavorite"
            :color="metric[2].color"
          ></el-progress>
          <div class="metric-text">收藏</div>
        </el-col>
        <el-col :span="4">
          <el-progress
            type="dashboard"
            :percentage="percentage"
            :format="formatView"
            :color="metric[3].color"
          ></el-progress>
          <div class="metric-text">观看</div>
        </el-col>
        <el-col :span="4">
          <el-progress
            type="dashboard"
            :percentage="percentage"
            :format="formatTransmit"
            :color="metric[4].color"
          ></el-progress>
          <div class="metric-text">转发</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoInfo",
  props: {},
  data() {
    return {
      percentage: 100,
      metric: [
        {
          // text:
          num: 0,
          color: "#64c05c"
        },
        {
          num: 0,
          color: "#fb581d"
        },
        {
          num: 0,
          color: "#f7af31"
        },
        {
          num: 0,
          color: "#8ad5db"
        },
        {
          num: 0,
          color: "#a8b9e3"
        }
      ]
    };
  },
  methods: {
    formatLike() {
      return this.formatDate(this.metric[0].num);
    },
    formatCoins() {
      return this.formatDate(this.metric[1].num);
    },
    formatFavorite() {
      return this.formatDate(this.metric[2].num);
    },
    formatView() {
      return this.formatDate(this.metric[3].num);
    },
    formatTransmit() {
      return this.formatDate(this.metric[4].num);
    },
    formatDate(num) {
      if (num / 10000 > 1) {
        return (num / 10000).toFixed(2) + "万";
      } else {
        return num+'';
      }
    }
  }
};
</script>

<style lang='scss' scope>
.video-profile {
  height: 120px;
  width: 100%;
  background: #666;
}
.video-section-wrapper {
  height: 100%;
  position: relative;
  .video-title {
    color: #666;
    font-size: 20px;
    font-weight: bold;
  }
  .video-section {
    margin-top: 5px;
  }
  .video-tag {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
}
.video-option-wrapper {
  text-align: right;
}
.video-abstract-wrapper {
  line-height: 20px;
  font-size: 16px;
  min-height: 60px;
  color: #212121;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
.video-metric-wrapper {
    text-align: center;
    .metric-text{
        text-align: center;
        color: #666;
        font-size: 16px;
    }
}
</style>