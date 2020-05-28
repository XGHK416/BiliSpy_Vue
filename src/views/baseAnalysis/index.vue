<template>
  <div class="base-analysis-container">
    <TopInfo :top-info="TopInfo"></TopInfo>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <VideoSpiderBar :bar-data="VideoSpiderBarData"/>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart :chart-data="SectionPieData"></PieChart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <WorldCloud :wc-data="WorldCloudData"></WorldCloud>
        </div>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <UploaderFansBar :bar-data="UploaderFansBarData"></UploaderFansBar>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <MeiGuiPieChart :chart-data="FansUploaderLevelPieData"></MeiGuiPieChart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart :chart-data="UploaderLevelPieData"></PieChart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart :chart-data="UploaderGenderPieData"></PieChart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TopInfo from "./components/TopInfo"
import UploaderFansBar from "./components/UploaderFansBar"
import PieChart from "./components/PieChart"
import MeiGuiPieChart from "./components/MeiGuiPieChart"
import VideoSpiderBar from "./components/VideoSpiderBar"
import WorldCloud from "./components/WorldCloud"

import {getBaseTopInfo,getTopFansLevelUploader,getCountUploaderInfo,getSpiderVideoCount,getWorldCloud,getVideoSectionCount} from '@/api/base_analysis'
export default {
  components: {
    TopInfo,
    UploaderFansBar,
    PieChart,
    VideoSpiderBar,
    WorldCloud,
    MeiGuiPieChart
  },
  data() {
    return {
      TopInfo:{
      },
      WorldCloudData: [],
      UploaderFansBarData: {},
      VideoSpiderBarData:{},
      SectionPieData: {},
      UploaderGenderPieData: {},
      UploaderLevelPieData: {},
      FansUploaderLevelPieData: {},
    };
  },
  methods: {
    initData() {
      getSpiderVideoCount().then(response => {
        this.VideoSpiderBarData = response['data']
      })
      getBaseTopInfo().then(response => {
        this.TopInfo = response['data']
      })
      getTopFansLevelUploader().then(response => {
        this.UploaderFansBarData = response['data']
      }),
      getCountUploaderInfo().then(response => {
        const data = response['data']
        this.UploaderGenderPieData = data['gender'],
        this.UploaderLevelPieData = data['level'],
        this.FansUploaderLevelPieData = data['fans_level']
      })
      getVideoSectionCount().then(response=> {
        this.SectionPieData = response['data']
      })
      getWorldCloud().then(response => {
        this.WorldCloudData = response.data.cloud_data
      })
    }
  },
  created() {
    this.initData()
  }
};
</script>
<style scoped>
.base-analysis-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>