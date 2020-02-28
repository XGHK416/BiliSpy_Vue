<template>
  <div class="infoContent-container">
    <div>
      <el-row :gutter="10" type="flex">
        <el-col :span="3" class="day-publish-count-wrapper">
          <div class="wday-publish-count day-publish-count">
            <el-progress type="dashboard" :percentage="percentage" :format="format"></el-progress>
            <div class="day-publish-title">七日总发视频数</div>
          </div>
          <div class="mday-publish-count day-publish-count">
            <el-progress type="dashboard" color="#e6a23c" :percentage="percentage" :format="format"></el-progress>
            <div class="day-publish-title">月总发视频数</div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="video-section-count-wrapper">
            <PieChart :chart-data="SectionPieData"></PieChart>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="video-date-publish-wrapper">
            <PieChart :chart-data="SectionPieData"></PieChart>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="fans-change-wrapper">
        <CrossChart></CrossChart>
    </div>
  </div>
</template>

<script>
import PieChart from "../../baseAnalysis/components/PieChart";
import CrossChart from "../../baseAnalysis/components/CrossChart"
export default {
  name: "InfoContent",
  components: {
    "PieChart": PieChart,
    "CrossChart": CrossChart
  },
  data() {
    return {
      percentage: 100,
      SectionPieData: {
        title_text: "视频分区统计",
        series_data: [
          { value: 320, name: "Industries" },
          { value: 240, name: "Technology" },
          { value: 149, name: "Forex" },
          { value: 100, name: "Gold" },
          { value: 59, name: "Forecasts" }
        ],
        legend_data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"]
      }
    };
  },
  methods: {
    format() {
      return "213个";
    }
  }
};
</script>

<style lang="scss" scope>
.infoContent-container {
  .day-publish-count-wrapper {
    border-right: 2px solid rgb(240, 242, 245);
    text-align: center;
    .day-publish-count {
      text-align: center;
      padding: 20px;
      margin-top: 10px;
      .day-publish-title {
        color: rgba(44, 50, 67, 0.65);
      }
    }
  }
  .video-section-count-wrapper {
    border-right: 2px solid rgb(240, 242, 245);
    padding: 20px;
  }
  .video-date-publish-wrapper {
    padding: 20px;
  }
  .fans-change-wrapper{
      padding: 20px;
  }
}
</style>