<template>
  <div class="detect-info-wrapper">
    <div class="detect-info-cards">
      <el-row :gutter="40">
        <el-col :span="6">
          <count-card :title="'当前侦测用户数量'" :num="9888"></count-card>
        </el-col>
        <el-col :span="6">
          <count-card :title="'今日侦测数量'" :num="9888"></count-card>
        </el-col>
        <el-col :span="6">
          <count-card :title="'当前视频侦测数量'" :num="9888"></count-card>
        </el-col>
        <el-col :span="6">
          <count-card :title="'今日视频侦测数量'" :num="9888"></count-card>
        </el-col>
      </el-row>
    </div>
    <div class="detect-info-daily">
      <div class="daily-uploader">
        <bar-chart :data="daily_uploader_data" class="bar-chart"></bar-chart>
      </div>
      <div class="daily-video">
        <bar-chart :data="daily_video_data" class="bar-chart"></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
import CountCard from "./components/CountCard";
import BarChart from "./components/BarChart";
export default {
  name: "DetectInfo",
  components: {
    CountCard,
    BarChart
  },
  data() {
    return {
      daily_uploader_data: {
        title: "每日UP主侦测数量",
        xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        seriesData: [120, 200, 150, 80, 70, 110, 130]
      },
      daily_video_data: {
        title: "每日视频侦测数量",
        xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        seriesData: [120, 200, 150, 80, 70, 110, 130]
      }
    };
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.detect-info-wrapper {
  padding: 32px;
  .daily-uploader,.daily-video{
      padding: 16px;
      margin-top: 50px;
      background: #ffffff;
  }
}
</style>