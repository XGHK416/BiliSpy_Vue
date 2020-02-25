<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
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
      default: "350px"
    },
    barData: {
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
    // this.initChart();
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
    barData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    setOptions({ title_text, x_axis, series_data } = {}) {
      this.chart.setOption({
        title: {
          text: title_text,
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: x_axis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "粉丝数",
            type: "bar",
            stack: 'vistors',
            barWidth: "10%",
            data: series_data,
            animationDuration
          }
        ]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      console.log(this.barData["x_axis"]);
      this.setOptions(this.barData);
    }
  }
};
</script>