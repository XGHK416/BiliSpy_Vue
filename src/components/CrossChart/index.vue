<template>
  <div class="chart-wrapper">
    <div :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from "echarts";
import resize from "../mixins/resize";
require("echarts/theme/macarons"); // echarts theme
const animationDuration = 6000;
export default {
  mixins: [resize],
  props: {
    ////////////////chart///////
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "420px"
    },
    crossData: {
      type: Object,
      required: true
    },
    currentData:{
      type:String,
      required:true
    }
    ///////////////
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    crossData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    },
    currentData:{
      deep: true,
      handler(val) {
        this.setOptions(this.crossData);
      }
    }
  },
  methods: {
    
    // { title_text, x_axis, series_data } = {}
    setOptions(crossData) {
      this.chart.setOption(
        {
          title: {
            text: crossData.title
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          // legend: {
          //   data: crossData.legend
          // },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: crossData.x_axis
            }
          ],
          yAxis: [
            {
              type: "value",
              // splitNumber: 5,
              // min: function(value) {
              //   return value.min;
              // },
              // max: function(value) {
              //   return value.max;
              // }
            }
          ],
          // yAxis: {
          //   type: "value"
          // },
          series: crossData[this.currentData]
        },
        true
      );
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      // console.log(this.barData["x_axis"]);
      // this.setOptions(this.barData);
      this.setOptions(this.crossData);
    }
  }
};
</script>
<style lang="scss" scope>
.chart-wrapper {
  height: 500px;

  padding: 16px;
  background: #ffffff;
  .option-wrapper {
    margin-bottom: 10px;
  }
}
</style>