<template>
  <div>
    <el-row :gutter="10" type="flex" style="height:120px">
      <el-col :span="6">
        <div class="avatar-wrapper">
          <img :src="request_profile(data.info.face)" alt referrerpolicy="no-referrer" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="identity-wrapper">
          <div class="name">
            <el-tooltip
              class="item"
              effect="dark"
              :content="'即将访问 https://space.bilibili.com/3043120'+data.info.mid"
              placement="top-start"
            >
              <a
                :href="'https://space.bilibili.com/3043120'+data.info.mid"
                target="_blank"
                rel="noopener noreferrer"
              >{{data.info.name}}</a>
            </el-tooltip>
          </div>
          <div class="mid">mid:{{data.info.mid}}</div>
          <el-tag
            size="small"
            :style="'color:'+level_color[data.info.level].color+';border-color:'+level_color[data.info.level].border"
            effect="plain"
          >Level{{data.info.level}}</el-tag>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="uploader-option">
          <div>
            <el-button
              type="primary"
              style="width:100%"
              :disabled="data.isDetect===true"
              @click="handleDetect"
            >提交侦测</el-button>
          </div>
          <div>
            <el-button
              type="success"
              style="width:100%;margin-top:10px"
              v-if="data.favoriteId<0&&data.isDetect"
              @click="hadleFavorite"
            >收藏</el-button>
            <el-button
              type="warning"
              style="width:100%;margin-top:10px"
              v-else-if="data.favoriteId>0&&data.isDetect"
              @click="hadleDisFavorite"
            >取消收藏</el-button>
          </div>
          <div>
            <el-button
              type="info"
              style="width:100%;margin-top:10px"
              v-if="data.isDetect"
              @click="handleMoniter"
            >监控</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="announcement-wrapper">
      <span style="font-size:16px;font-weight:bold">公告</span>
      <br />
      {{data.notice}}
    </div>
    <el-divider></el-divider>
    <div class="uploader-metric-wrapper">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="uploader-metric">
            <div class="metric-name follower">关注</div>
            <div class="metric-num">{{formatDate(data.stat.following) }}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="uploader-metric">
            <div class="metric-name following">粉丝</div>
            <div class="metric-num">{{formatDate(data.stat.follower)}}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="uploader-metric">
            <div class="metric-name getLike">获赞</div>
            <div class="metric-num">{{formatDate(data.upstat.likes)}}</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="uploader-metric">
            <div class="metric-name view">播放</div>
            <div class="metric-num">{{formatDate(data.upstat.archive.view)}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <password-test ref="test_passwrod" @confirmSuccess="passwordCoinfirm"></password-test>
  </div>
</template>

<script>
import PasswordTest from "@/views/mo/components/PasswordTest";
import { doFavorite, unFavorite, findFavorite } from "@/api/favorite";
import { addUploaderDetect } from "@/api/hot_bili";
export default {
  name: "UploaderInfo",
  components: {
    PasswordTest
  },
  props: {
    data: {
      type: Object,
      default: {
        info: {
          face: "",
          level: 0
        },
        isFavorite:false
      }
    }
  },

  data() {
    return {
      user_id: this.$store.state.user.user_id,

      // 是否监控
      isMoniter: true,
      // 提交选单
      dialog_visible: false,

      level_color: {
        0: {
          color: "#cdcdcd",
          border: "#d2d2d2"
        },
        1: {
          color: "#bfbfbf",
          border: "#cbcbcb"
        },
        2: {
          color: "#95deb3",
          border: "#b2e7c7"
        },
        3: {
          color: "#97cfe0",
          border: "#abd8e6"
        },
        4: {
          color: "#f4b37e",
          border: "#f6c297"
        },
        5: {
          color: "#ff6d00",
          border: "#ff8a33"
        },
        6: {
          color: "#fe0000",
          border: "#fe3333"
        }
      }
    };
  },
  methods: {
    passwordCoinfirm() {
      var params = {
        user_id: this.user_id,
        mid: this.data.info.mid
      };
      addUploaderDetect(params).then(Response => {
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
          this.$emit("changeUploaderDetectStatus");
        }
      });
    },
    hadleFavorite() {
      doFavorite(this.user_id, this.data.info.mid, "uploader").then(
        response => {
          this.$emit("changeFavoriteStatus", response.data);
          this.$message({
            type: "success",
            message: "收藏成功"
          });
        }
      );
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
    handleMoniter() {
      this.$router.push({
        name: "DetectAdd",
        params: { id: this.data.info.mid, type: "uploader" }
      });
    },
    // 添加至侦测
    handleDetect() {
      this.$refs.test_passwrod.passwordDialog = true;
    },
    request_profile(profile) {
      return "https://images.weserv.nl/?url=" + profile;
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

<style lang='scss' scoped>
.avatar-wrapper {
  img {
    width: 120px;
    height: 120px;
  }
}
.identity-wrapper {
  .name {
    color: #666;
    font-size: 24px;
    font-weight: bold;
    :hover {
      color: #70bbfe;
    }
  }
  .mid {
    margin: 10px 0px;
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
    background: linear-gradient(90deg, #3494e6 0%, #ec6ead 100%);
  }
}
</style>