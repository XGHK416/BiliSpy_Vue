<template>
  <div>
    <el-dialog title="详情信息" :visible.sync="card_visible" @close="handleClose" width="80%">
      <div class="info-wrapper">
        <el-row>
          <el-col :span="16">
            <div class="video-info-wrapper">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>视频详情</span>
                </div>
                <video-info
                  :data="videoInfoData"
                  @changeDetectStatus="changeVideoDetectStatus"
                  @changeFavoriteStatus="changeVideoFavoriteStatus"
                ></video-info>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="user-info-wrapper">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>作者简介</span>
                </div>
                <uploader-info
                  :data="uploaderInfoData"
                  @changeDetectStatus="changeUploaderDetectStatus"
                  @changeFavoriteStatus="changeUploaderFavoriteStatus"
                ></uploader-info>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VideoInfo from "./components/VideoInfo";
import UploaderInfo from "./components/UploaderInfo";
import $bus from "@/utils/eventBus";
import { getUploader, getVideo } from "@/api/hot_bili";
export default {
  name: "InfoCard",
  components: {
    VideoInfo,
    UploaderInfo
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      this.card_visible = val;
    }
  },
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      card_visible: false,
      uploaderInfoData: {
        info: {
          face:
            "",
          mid: 0,
          name: "",
          level: 6
        },
        stat: {
          following: 0,
          follower: 0
        },
        upstat: {
          likes: 0,
          archive: {
            view: 0
          }
        },
        isDetect: true,
        isFavorite: false,
        favorite_id: -1,
        notice: ""
      },
      videoInfoData: {
       data: {
          pic:
            "",
          title: "",
          bvid: "",
          aid: 0,
          tname: "sdfa",
          desc: "ssa",
          stat: {
            coin: 0,
            favorite: 0,
            share: 0,
            like: 0,
            view: 0
          },
          dynamic: "sdfsa##dfsfs"
        },

        favoriteId: -1,
        isDetect: true
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    // 侦测状态
    changeUploaderDetectStatus() {
      this.uploaderInfoData.isDetect = true;
    },
    changeVideoDetectStatus() {
      this.videoInfoData.isDetect = true;
    },
    // 修改收藏的状态
    changeUploaderFavoriteStatus(id) {
      if (id > 0) {
        this.uploaderInfoData.favoriteId = id;
      } else {
        this.uploaderInfoData.favoriteId = -1;
      }
    },
    changeVideoFavoriteStatus(id) {
      if (id > 0) {
        this.videoInfoData.favoriteId = id;
      } else {
        this.videoInfoData.favoriteId = -1;
      }
    },
  },
  mounted() {
    this.$nextTick(function() {
      $bus.$on("handleInfo", item => {
        getUploader(item.mid, this.user_id).then(response => {
          this.uploaderInfoData = response.data;
        });
        getVideo(item.aid, this.user_id).then(response => {
          this.videoInfoData = response.data;
        });
      });
    });
  }
};
</script>

<style lang='scss' scope>
.info-wrapper {
  min-height: 500px;
  .video-info-wrapper {
    padding-right: 16px;
    border-right: 1px solid #e6e6e6;
  }
  .user-info-wrapper {
    padding-left: 16px;
  }
}
</style>