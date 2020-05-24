<template>
  <div>
    <el-row type="flex" :gutter="20">
      <el-col :span="4">
        <div>
          <img
            class="video-profile"
            :src="request_profile(video_data.profile)"
            referrerpolicy="no-referrer"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="video-section-wrapper">
          <div class="video-title">
            <el-tooltip
              class="item"
              effect="dark"
              :content="'即将访问 https://www.bilibili.com/video/'+video_data.bvid"
              placement="top-start"
            >
              <a :href="'https://www.bilibili.com/video/'+video_data.bvid" target="_blank">
                <span>{{this.video_data.title}}</span>
              </a>
            </el-tooltip>
          </div>
          <div class="video-aid">
            <span>aid: {{video_data.aid}}</span>
            <span style="margin-left:10px">bvid: {{video_data.bvid}}</span>
          </div>
          <div class="video-section">
            <el-tag type="success" effect="dark" size="small">{{this.video_data.section}}</el-tag>
          </div>
          <div class="video-tag">
            <el-tag
              class="tag"
              :type="randomTagColor()"
              size="mini"
              v-for="item in video_data.dynamic"
              :key="item"
            >{{item}}</el-tag>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="video-option-wrapper">
          <el-button type="primary" :disabled="data.isDetect" @click="handleDetect">提交侦测</el-button>
          <el-button
            type="success"
            v-if="data.favoriteId<0&&data.isDetect"
            @click="hadleFavorite"
          >收藏</el-button>
          <el-button
            type="warning"
            v-else-if="data.favoriteId>0&&data.isDetect"
            @click="hadleDisFavorite"
          >取消收藏</el-button>
          <el-button type="info" v-if="isMoniter&&isDetect" @click="handleMoniter">监控</el-button>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="video-abstract-wrapper">
      <span style="font-size:16px;font-weight:bold">简介</span>
      <br />
      {{video_data.desc}}
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
    <password-test ref="test_passwrod" @confirmSuccess="passwordCoinfirm"></password-test>
  </div>
</template>

<script>
import { doFavorite, unFavorite, findFavorite } from "@/api/favorite";
import PasswordTest from "@/views/mo/components/PasswordTest";
import { addVideoDetect } from "@/api/hot_bili";
export default {
  name: "VideoInfo",
  components: {
    PasswordTest
  },
  props: {
    data: {
      type: Object,
      default: {
        data: {
          stat: {
            coin: 0
          }
        }
      }
    }
  },
  data() {
    return {
      user_id: this.$store.state.user.user_id,

      isDetect: true,
      isFavorite: false,
      isMoniter: true,
      dialogVisible: false,

      video_data: {
        title: "123",
        coins: 0,
        favorite: 0,
        share: 0,
        like: 0,
        view: 0
      },
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
  watch: {
    data(val) {
      this.initData();
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 添加检测
    passwordCoinfirm() {
      var params = {
        user_id: this.user_id,
        aid: this.video_data.aid
      };
      addVideoDetect(params).then(Response => {
        if (Response.code != 20000) {
          this.$message({
            message: Response.msg,
            type: "error"
          });
        } else {
          this.$message({
            message: "插入成功",
            type: "success"
          });
          this.$emit("changeVideoDetectStatus");
        }
      });
    },
    handleDetect() {
      this.$refs.test_passwrod.passwordDialog = true;
    },
    // 收藏
    hadleFavorite() {
      doFavorite(this.user_id, this.video_data.aid, "video").then(response => {
        this.$emit("changeFavoriteStatus", response.data);
        this.$message({
          type: "success",
          message: "收藏成功"
        });
      });
    },
    hadleDisFavorite() {
      unFavorite(this.data.favoriteId).then(response => {
        this.$emit("changeFavoriteStatus", -1);
        this.$message({
          type: "warning",
          message: "已取消收藏"
        });
      });
    },
    // 监控
    handleMoniter() {
      this.$router.push({
        name: "DetectAdd",
        params: { id: this.video_data.bvid, type: "video" }
      });
    },

    randomTagColor() {
      var list = ["success", "info", "danger", "warning"];
      var index = Math.floor(Math.random() * 4);
      return list[index];
    },
    request_profile(profile) {
      return profile;
    },
    initData() {
      this.video_data.profile = this.data.data.pic;
      this.video_data.title = this.data.data.title;
      this.video_data.bvid = this.data.data.bvid;
      this.video_data.aid = this.data.data.aid;
      this.video_data.section = this.data.data.tname;
      this.video_data.desc = this.data.data.desc;
      this.video_data.coins = this.data.data.stat.coin;
      this.video_data.favorite = this.data.data.stat.favorite;
      this.video_data.share = this.data.data.stat.share;
      this.video_data.like = this.data.data.stat.like;
      this.video_data.view = this.data.data.stat.view;
      this.video_data.dynamic = this.formatDynamic(this.data.data.dynamic);
    },
    formatDynamic(dynamic) {
      var index = dynamic.replace(/[\r\n]/g, "|").indexOf("|");
      if (index > 0) {
        var stream = dynamic.substring(1, index - 1);
      } else {
        var stream = dynamic.substring(1, dynamic.length - 1);
      }
      var list = stream.split("##");
      return list;
    },
    formatLike() {
      return this.formatDate(this.video_data.like);
    },
    formatCoins() {
      return this.formatDate(this.video_data.coins);
    },
    formatFavorite() {
      return this.formatDate(this.video_data.favorite);
    },
    formatView() {
      return this.formatDate(this.video_data.view);
    },
    formatTransmit() {
      return this.formatDate(this.video_data.share);
    },
    formatDate(num) {
      if (num / 10000 > 1) {
        return (num / 10000).toFixed(2) + "万";
      } else {
        return num + "";
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
    :hover {
      color: #70bbfe;
    }
  }
  .video-section {
    margin-top: 5px;
  }
  .video-aid {
    margin-top: 3px;
    color: #999;
  }
  .video-tag {
    position: absolute;
    left: 0px;
    bottom: 0px;
    .tag {
      margin-right: 5px;
    }
  }
}
.video-option-wrapper {
  text-align: right;
}
.video-abstract-wrapper {
  line-height: 20px;
  font-size: 16px;
  min-height: 120px;
  color: #212121;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}
.video-metric-wrapper {
  height: 170px;
  text-align: center;
  .metric-text {
    text-align: center;
    color: #666;
    font-size: 16px;
  }
}
</style>