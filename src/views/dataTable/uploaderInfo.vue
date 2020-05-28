<template>
  <div>
    <div v-if="haveData">
      <TopInfo :info-data="topInfoData"></TopInfo>
    <div class="main-info-container">
      <el-tabs class="main-tab" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="内容分析" name="Content">
          <InfoContent></InfoContent>
        </el-tab-pane>
        <el-tab-pane label="竞品分析" name="Competing" :lazy="lazy">
          <Competing></Competing>
        </el-tab-pane>
        <el-tab-pane label="作品分析" name="ObjectAnalysis" :lazy="lazy">
          <ObjectAnalysis></ObjectAnalysis>
        </el-tab-pane>
      </el-tabs>
    </div>
    </div>
    <div v-else>
      <div class="haveNotData" v-show="showNoDataMessage">
        <el-card :body-style="{ padding: '0px' }">
          <h1>这个对象今天才加入侦测列表，展示没有数据哦，请明天下午再来吧</h1>
        </el-card>
        
      </div>
    </div>
    

    <!-- {{this.$route.params}} -->
  </div>
</template>

<script>
import TopInfo from "./components/topInfo";
import InfoContent from "./components/infoContent"
import Competing from "./components/competing"
import ObjectAnalysis from "./components/objectAnalysis"

import {getBasicInfo,getVideoAna} from "@/api/uploaderAna"
import { init } from 'echarts/lib/echarts';
export default {
  name: "Info",
  components: {
    "TopInfo": TopInfo,
    "InfoContent": InfoContent,
    "Competing": Competing,
    "ObjectAnalysis":ObjectAnalysis
  },
  data() {
    return {
      user_id:this.$store.state.user.user_id,

      haveData:false,
      showNoDataMessage:false,

      lazy:true,
      activeName: "Content",
      mid:this.$route.params['id'],
      topInfoData:{},
      videoAnaData:{},
    };
  },
  created() {  
    this.initTopInfo()
  },
  methods: {
     return_profile(url) {
      return 'https://images.weserv.nl/?url='+url
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    initTopInfo(){
      getBasicInfo(this.mid,this.user_id).then(response=>{
        if(response.data==-1){
          this.haveData=false
          this.$message({
            message: '没有数据',
            type: 'warning'
          })
          this.showNoDataMessage = true
          return 0
        }
        this.haveData = true
        let data = response['data']
        this.topInfoData= data
        this.topInfoData['profile']= this.return_profile(this.topInfoData['profile'])
      })
    },
  }
};
</script>

<style lang='scss' scope>
.main-info-container {
  padding: 32px;
  padding-top: 0;
  background-color: rgb(240, 242, 245);
  .main-tab{
    padding: 10px 20px 100px 20px;
    background-color: #ffffff;
  }
}
.haveNotData{
  width: 50%;
  margin: 0 auto;
  height: 400px;
  padding: 15px;
}
</style>