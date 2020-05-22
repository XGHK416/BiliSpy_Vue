<template>
  <div>
    <div class="search_bar">
      <div class="search_input">
        <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
          <el-select v-model="searchOption" slot="prepend" placeholder="请选择">
            <el-option label="up主" value="uploader"></el-option>
            <el-option label="视频" value="viewer"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
        <div>
          <el-radio-group v-model="dataOrigin" slot="prepend" style="margin-top: 15px;">
            <el-radio-button label="system">本系统</el-radio-button>
            <el-radio-button label="bili">B站</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="result_wrapper">
      <div class="list_wrapper">
        <div v-if="uploaderListData.length==0||videoListData.length==0" class="empty_list">暂时没有你要的内容</div>
        <div v-else class="result_list">
          <div class="uploader_result" v-if="currentOption=='uploader'">
            <el-row :gutter="10">
              <el-col :span="6" v-for="item in uploaderListData" :key="item.id">
                  <uploader-unit :data="item" @openUploaderDialog="openUploaderDialog"></uploader-unit>
              </el-col>
            </el-row>
          </div>
          <div class="video_result" v-if="currentOption=='video'">
            <el-row :gutter="20">
              <el-col :span="6" v-for="item in videoListData" :key="item.id">
                  <video-unit :data="item" @openVideoDialog="openVideoDialog"></video-unit>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      width="30%"
      :visible.sync="uploaderDialogVisible">
      <div><uploader-info :data="uploaderInfoData"></uploader-info></div>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="videoDialogVisible">
      <div><video-info :data="videoInfoData"></video-info></div>
    </el-dialog>
  </div>
  
</template>

<script>
import UploaderUnit from "./components/UploaderUnit";
import VideoUnit from "./components/VideoUnit";
import UploaderInfo from '@/views/currentHot/InfoCard/components/UploaderInfo'
import VideoInfo from '@/views/currentHot/InfoCard/components/VideoInfo'
export default {
  name: "SearchModel",
  components: {
    UploaderUnit,
    VideoUnit,
    UploaderInfo,
    VideoInfo,
  },
  data() {
    return {
      searchInput: "",
      searchOption: "",
      dataOrigin: "system",
      currentOption: "video",
      
      videoDialogVisible:false,
      uploaderDialogVisible:false,

      uploaderInfoData:{},
      videoInfoData:{},
      
      uploaderListData: [
        {
          id: 1,
          level: "Level6",
          nickName: "WM星轨",
          vip: "年度大会员",
          mid: 123123,
          profile:
            "https://i0.hdslb.com/bfs/face/a43fa679fc18b11468ce1566ece25534e2114865.jpg@150w_150h.jpg"
        }
      ],
      videoListData: [
        {
          aid:123,
          author: "XGHK416",
          title: "【PV】《Shiny Smily Story》hololive China成员歌唱版",
          pic:
            "https://i1.hdslb.com/bfs/archive/040408d7b550ed9fe6d1854eff14cf694e1bc06d.jpg@412w_232h_1c_100q.jpg"
        }
      ],

      uploaderInfoData:{
        info:{
          face: "https://i0.hdslb.com/bfs/face/a43fa679fc18b11468ce1566ece25534e2114865.jpg@150w_150h.jpg",
          mid:123123,
          name:"WM星轨",
          level:6,
        },
        stat:{
          following:1231,
          follower:32131,
        },
        upstat:{
          likes:12313,
          archive:{
            view:123123,
          }
        },
        isDetect:false,
        notice:'sdfasfda'
      },
      videoInfoData:{
        pic: "https://i1.hdslb.com/bfs/archive/040408d7b550ed9fe6d1854eff14cf694e1bc06d.jpg@412w_232h_1c_100q.jpg",
        title:"【PV】《Shiny Smily Story》hololive China成员歌唱版",
        bvid:'BV1hp4y197G9',
        aid:123123,
        tname:'sdfa',
        desc:'ssa',
        stat:{
          coin:123123,
          favorite:123213,
          share:1231,
          like:123123,
          view:112313,
        },
        dynamic:'sdfsa##dfsfs'
      }
    };
  },
  methods: {
    openUploaderDialog(mid){
      console.log(mid)
      //todo 获取详细数据
      this.uploaderDialogVisible = true

    },
    openVideoDialog(aid){
      console.log(aid)
      //todo 获取详细数据
      this.videoDialogVisible = true

    },
    handleSearch() {
      if (this.searchOption == "") {
        if(this.currentOption=='video'){
          this.currentOption = 'uploader'
        }else{
          this.currentOption ='video'
        }
        this.$message({
          message: "请选择搜索类型",
          type: "warning"
        });
      }
    }
  },
  created() {}
};
</script>

<style lang='scss' scope>
.search_bar {
  padding: 20px;
  text-align: center;
  .search_input {
    width: 600px;
    margin: 0 auto;
  }
  .el-select .el-input {
    width: 90px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
}
.result_wrapper {
  background: #f1f2f6;
  min-height: calc(100vh - 185px);
  .list_wrapper {
    margin: 0 auto;
    width: 60%;
    .empty_list {
      text-align: center;
      padding-top: 130px;
    }
    .result_list {
      padding-top: 20px;
    }
  }
}
</style>