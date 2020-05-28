<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "../mixins/resize";
const animationDuration = 6000;
export default {
  mixins: [resize],
  props: {
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
    }
  },
  data() {
    return {
      chart: null
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
    }
  },
  methods: {
    // { title_text, x_axis, series_data } = {}
    setOptions(crossData) {
      this.chart.clear()
      this.chart.setOption({
        title: {
          text: crossData["title_text"]
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
        legend: {
          data: crossData.legend
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
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
            splitNumber: 10,
            min: function(value) {
              return parseInt(value.min*0.8);
            },
            max: function(value) {
              return parseInt(value.max*1.2);
            }
          }
        ],
        // yAxis: {
        //   type: "value"
        // },
        series: crossData.series
      },true);
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