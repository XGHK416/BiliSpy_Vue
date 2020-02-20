<template>
  <div :id="id" :class="className" :style="{ height:height,width:width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    },
    // data: {
    //   type: Array,
    //   default: []
    // },
    title: {
      type: String,
      default: ""
    },
    chartData: {
      type: Object,
    }
  },
  data() {
    return {
      data: [
        {
          name: "十九大精神",
          value: 15000
        },
        {
          name: "两学一做",
          value: 10081
        },
        {
          name: "中华民族",
          value: 9386
        },
        {
          name: "马克思主义",
          value: 7500
        },
        {
          name: "民族复兴",
          value: 7500
        },
        {
          name: "社会主义制度",
          value: 6500
        },
        {
          name: "国防白皮书",
          value: 6500
        },
        {
          name: "创新",
          value: 6000
        },
        {
          name: "民主革命",
          value: 4500
        },
        {
          name: "文化强国",
          value: 3800
        },
        {
          name: "国家主权",
          value: 3000
        },
        {
          name: "武装颠覆",
          value: 2500
        },
        {
          name: "领土完整",
          value: 2300
        },
        {
          name: "安全",
          value: 2000
        },
        {
          name: "从严治党",
          value: 1900
        },
        {
          name: "现代化经济体系",
          value: 1800
        },
        {
          name: "国防动员",
          value: 1700
        },
        {
          name: "信息化战争",
          value: 1600
        },
        {
          name: "局部战争",
          value: 1500
        },
        {
          name: "教育",
          value: 1200
        },
        {
          name: "职业教育",
          value: 1100
        },
        {
          name: "兵法",
          value: 900
        },
        {
          name: "一国两制",
          value: 800
        },
        {
          name: "特色社会主义思想",
          value: 700
        }
      ],
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      const option = {
        title: {
          text: "视频标签词云",
          x: "center"
        },
        backgroundColor: "#fff",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 15,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [20, 70],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                  );
                }
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: this.data
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>
<style lang='scss' scoped>
.chartsClass {
  padding-left: 1.2rem;
}
</style>