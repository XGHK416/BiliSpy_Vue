<template>
  <div class="base-analysis-container">
    <TopInfo></TopInfo>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LineChart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>
<script>
import TopInfo from "./components/TopInfo";
import LineChart from "./components/LineChart"
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  components: {
    TopInfo,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
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
</style>