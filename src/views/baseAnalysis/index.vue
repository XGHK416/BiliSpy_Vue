<template>
  <div class="base-analysis-container">
    <TopInfo></TopInfo>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <VideoSpiderBar/>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart :chart-data="SectionPieData"></PieChart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <WorldCloud></WorldCloud>
        </div>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <UploaderFansBar/>
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
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
};
const SectionPieData = {
  titleText: '视频分类',
  legendData: ['动漫', '番剧', '放映室', '生活', '科技','广告'],
  seriesData: [
    {value: 335, name: '动漫'},
    {value: 310, name: '番剧'},
    {value: 234, name: '放映室'},
    {value: 135, name: '生活'},
    {value: 128, name: '科技'},
    {value: 848, name: '广告'}
  ]
};
const UploaderGenderPieData = {
  titleText: '用户性别',
  legendData: ['男', '女', '秘密'],
  seriesData: [
    {value: 1335, name: '男'},
    {value: 3210, name: '女'},
    {value: 24, name: '秘密'},
  ]
};
const UploaderLevelPieData = {
  titleText: '用户等级',
  legendData: ['level1', 'level2', 'level3','level4','level5','level6'],
  seriesData: [
    {value: 1335, name: 'level1'},
    {value: 3210, name: 'level2'},
    {value: 2224, name: 'level3'},
    {value: 1124, name: 'level4'},
    {value: 24, name: 'level5'},
    {value: 1114, name: 'level6'},
  ]
};
const FansUploaderLevelPieData = {
  titleText: '用户粉丝数量级',
  legendData: ['10W', '100W', '1000W','1W','<1W'],
  seriesData: [
    {value: 1335, name: '10W'},
    {value: 3210, name: '100W'},
    {value: 2224, name: '1000W'},
    {value: 24, name: '1W'},
    {value: 2114, name: '<1W'},
  ]
};


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
      lineChartData: lineChartData.newVisitis,
      SectionPieData: SectionPieData,
      UploaderGenderPieData: UploaderGenderPieData,
      UploaderLevelPieData: UploaderLevelPieData,
      FansUploaderLevelPieData: FansUploaderLevelPieData,
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
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