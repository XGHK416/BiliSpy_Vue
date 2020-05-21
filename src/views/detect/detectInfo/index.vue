<template>
  <div style="min-height: calc(100vh - 50px);">
    <div class="info-head-wrapper">
      <span>监控模块</span>
    </div>
    <div class="info-contain-wrapper">
      <div class="info-contain">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="up主监控" name="uploader_list"><uploader-list @jumpToVideo="jumpToVideo"></uploader-list></el-tab-pane>
          <el-tab-pane label="视频监控" name="video_list"><video-list ref="video"></video-list></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import UploaderList from './components/UploaderList'
import VideoList from './components/VideoList'
export default {
  name: "DetectInfo",
  components:{
    UploaderList,
    VideoList
  },
  data() {
    return {
        activeName: 'uploader_list'
    };
  },
  created() {
      
  },
  methods: {
    jumpToVideo(parent_id){
      console.log(parent_id)
      this.activeName = 'video_list'
      this.$refs.video.getVideoDetectInfo_(1,18,this.$store.state.user.user_id,0,parent_id)
      this.$refs.video.parent_id=parent_id
    },
handleClick(){}
  }
};
</script>

<style lang='scss' scoped>
.info-head-wrapper {
  border-top: 1px solid #e8e8e8;
  background: #ffffff;
  height: 70px;
  line-height: 70px;
  text-align: left;
  span {
    color: #666;
    margin-left: 10px;
    font-size: 20px;
  }
}
.info-contain-wrapper {
  padding: 32px;
  background: #f1f2f6;
  min-height: calc(100vh - 120px);
  .info-contain {
      font-size: 15px;
    padding-top: 5px;
    padding: 16px;
    background: #ffffff;
  }
}
</style>