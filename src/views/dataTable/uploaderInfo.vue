<template>
  <div>
    <TopInfo :info-data="topInfoData"></TopInfo>
    <div class="main-info-container">
      <el-tabs class="main-tab" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="内容分析" name="Content">
          <InfoContent></InfoContent>
        </el-tab-pane>
        <el-tab-pane label="竞品分析" name="Competing" :lazy="lazy">
          <Competing></Competing>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- {{this.$route.params}} -->
  </div>
</template>

<script>
import TopInfo from "./components/topInfo";
import InfoContent from "./components/infoContent"
import Competing from "./components/competing"

import {getBasicInfo,getVideoAna} from "@/api/uploaderAna"
import { init } from 'echarts/lib/echarts';
export default {
  name: "Info",
  components: {
    "TopInfo": TopInfo,
    "InfoContent": InfoContent,
    "Competing": Competing,
  },
  data() {
    return {
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
      console.log(tab, event);
    },
    initTopInfo(){
      getBasicInfo(this.mid).then(response=>{
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
</style>