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
                <video-info :data="videoInfo"></video-info>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="user-info-wrapper">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>作者简介</span>
                </div>
                <uploader-info :data="uploaderInfo"></uploader-info>
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
      card_visible: false,
      uploaderInfo: {},
      videoInfo: {}
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    }
  },
  mounted() {
    this.$nextTick(function() {
      $bus.$on("handleInfo", item => {
        getUploader(item.mid).then(response => {
          this.uploaderInfo = response.data;
        });
        getVideo(item.aid).then(response => {
          this.videoInfo = response.data;
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