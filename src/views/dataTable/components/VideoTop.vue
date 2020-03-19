<template>
  <div>
    <div class="top-container">
      <el-row type="flex">
        <el-col :span="10" class="top-left-container top-container-common">
          <el-row type="flex" class="base-info-wrapper" :gutter="20">
            <el-col :span="7">
              <div class="img-wrapper">
                <img
                  style="min-height:50px;width:100%;max-height:150px"
                  :src="return_profile(data.videoProfile)"
                  alt
                />
              </div>
            </el-col>
            <el-col :span="17">
              <div class="base-info">
                <div class="title">
                  <a :href="'https://www.bilibili.com/video/av'+data.videoId">{{data.videoTitle}}</a>
                </div>
                <div style="margin-top:10px">
                  <el-button type="success" v-if="!is_favorite" @click="favorite" size="medium" style="float:right">收藏</el-button>
                  <el-button type="warning" v-else @click="cancelFavorite" size="medium" style="float:right">取消收藏</el-button>
                </div>
                <div class="tag">
                  <el-tag
                    type="success"
                    size="medium"
                    v-for="item in data.dynamic"
                    :key="item"
                  >{{item}}</el-tag>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="abstract-wrapper">
            <el-col :span="24">
              <div class="video-abstract">
                简介：
                <span>{{data.videoDesc}}</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="14" class="top-right-container">
          <el-row :gutter="30" class="panel-wrapper" style="margin:0px">
            <el-col :span="12">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-view">
                  <svg-icon icon-class="view" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">观看</div>
                  <count-to
                    :start-val="0"
                    :end-val="data.videoView"
                    :duration="3000"
                    class="card-panel-num"
                  />次
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-like">
                  <svg-icon icon-class="like" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">点赞</div>
                  <count-to
                    :start-val="0"
                    :end-val="data.videoLike"
                    :duration="3000"
                    class="card-panel-num"
                  />次
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-coins">
                  <svg-icon icon-class="coins" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">硬币</div>
                  <count-to
                    :start-val="0"
                    :end-val="data.coins"
                    :duration="3000"
                    class="card-panel-num"
                  />个
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-favorite">
                  <svg-icon icon-class="favorite" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">收藏</div>
                  <count-to
                    :start-val="0"
                    :end-val="data.videoFavorite"
                    :duration="3000"
                    class="card-panel-num"
                  />次
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import { getVideoInfo } from "@/api/videoAna";
import { doFavorite, unFavorite, findFavorite } from "@/api/favorite";
export default {
  name: "VideoTop",
  components: {
    CountTo: CountTo
  },
  props: {},
  data() {
    return {
      favorite_id: -1,
      user_id: this.$store.state.user.user_id,
      is_favorite: false,

      aid: this.$route.params["id"],
      data: {
        videoId: 0,
        tid: 0,
        tname: "",
        videoTitle: "",
        videoProfile: "",
        videoDesc: "",
        videoView: 0,
        videoFavorite: 0,
        coins: 0,
        videoShare: 0,
        videoLike: 0,
        dynamic: [],
        lastUpdate: "",
        videoAuthor: "",
        authorMid: 0
      }
    };
  },
  methods: {
    favorite() {
      doFavorite(this.user_id, this.aid, "video").then(response => {
        this.is_favorite = true;
        this.$message({
          type: "success",
          message: "收藏成功"
        });
        findFavorite(this.user_id, this.aid, "video").then(response => {
          this.favorite_id = response.data.id;
        });
      });
    },
    cancelFavorite() {
      console.log(this.favorite_id);
      unFavorite(this.favorite_id).then(response => {
        this.is_favorite = false;
        this.$message({
          type: "warning",
          message: "已取消收藏"
        });
      });
    },

    return_profile(url) {
      return "https://images.weserv.nl/?url=" + url;
    }
  },
  created() {
    getVideoInfo(this.aid).then(response => {
      this.data = response.data;
      var dynamic = this.data.dynamic;
      if (dynamic.length == 0) {
        this.data.dynamic = [];
      } else {
        var tag_list = dynamic.split("#");
        var list = [];
        tag_list.forEach(element => {
          if (element != "") {
            list.push(element);
          }
        });
        this.data.dynamic = list;
      }
    });
  },
  mounted() {
    findFavorite(this.user_id, this.aid, "video").then(response => {
      if (response.data != null) {
        this.favorite_id = response.data.id;
        this.is_favorite = true;
      } else {
        this.is_favorite = false;
      }
    });
  }
};
</script>

<style lang="scss" scope>
.top-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .top-left-container {
    padding: 16px;
    padding-bottom: 0px;
    background: #ffffff;
    .base-info-wrapper {
      // text-align: left;
      // padding: 16px;
      //   padding-bottom: 0px;
      background: #ffffff;
      border-bottom: 1px rgb(240, 242, 245) solid;
      .base-info {
        height: 100%;
        position: relative;
        .title {
          color: #666;
          font-size: 23px;
          font-weight: bold;
        }
        .tag {
          position: absolute;
          bottom: 10px;
          text-align: left;
        }
      }
    }
    .abstract-wrapper {
      background: #ffffff;
      .video-abstract {
        padding: 5px;
        color: #666;
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        text-overflow: ellipsis;
        // white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .top-right-container {
    // padding-bottom: 0px;
    .panel-wrapper {
      border-left: 1px rgb(240, 242, 245) solid;
      padding: 16px;
      background: #ffffff;
      .card-panel {
        margin-top: 10px;
        //   height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.05);
        &:hover {
          .card-panel-icon-wrapper {
            color: #fff;
          }
          .icon-view {
            background: #40c9c6;
          }
          .icon-like {
            background: #36a3f7;
          }
          .icon-coins {
            background: #f4516c;
          }
          .icon-favorite {
            background: #34bfa3;
          }
        }
        .icon-view {
          color: #40c9c6;
        }
        .icon-like {
          color: #36a3f7;
        }
        .icon-coins {
          color: #f4516c;
        }
        .icon-favorite {
          color: #34bfa3;
        }
        .card-panel-icon-wrapper {
          float: left;
          margin: 14px 0 0 14px;
          padding: 16px;
          transition: all 0.38s ease-out;
          border-radius: 6px;
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
            font-size: 20px;
            margin-bottom: 12px;
          }
          .card-panel-num {
            font-size: 25px;
          }
        }
      }
    }
  }
}
</style>