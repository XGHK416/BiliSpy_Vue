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
    <el-divider></el-divider>
    <div class="video-publish-table-wrapper">
      <span>最近发文</span>
      <el-table :data="tableData" stripe style="width: 100%" script>
        <el-table-column label="aid" align="center">
          <template slot-scope="{row}">
            <span>{{ row.aid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分区" align="center">
          <template slot-scope="{row}">
            <span>{{ row.tname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标签" align="center">
          <template slot-scope="{row}">
            <span>{{ row.dynamic }}</span>
          </template>
        </el-table-column>
        <el-table-column label="观看数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.view }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点赞" align="center">
          <template slot-scope="{row}">
            <span>{{ row.like }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收藏" align="center">
          <template slot-scope="{row}">
            <span>{{ row.favorite }}</span>
          </template>
        </el-table-column>
        <el-table-column label="投币" align="center">
          <template slot-scope="{row}">
            <span>{{ row.coins }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.publish_date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" plain @click="collection(row.aid)">分析</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import PieChart from "../../baseAnalysis/components/PieChart";
import CrossChart from "../../baseAnalysis/components/CrossChart";
export default {
  name: "InfoContent",
  components: {
    PieChart: PieChart,
    CrossChart: CrossChart
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
      },
      tableData: [
        {
          aid:'2222',
          title:'明日方舟啊啊啊',
          tname:'游戏',
          dynamic: "明日方舟#游戏#喜之郎",
          view: 29000,
          favorite:2231,
          like:2222,
          coins:12121,
          publish_date:"2010-2-2",
        },
        {
          aid:'2222',
          title:'明日方舟啊啊啊',
          tname:'游戏',
          dynamic: "明日方舟#游戏#喜之郎",
          view: 29000,
          favorite:2231,
          like:2222,
          coins:12121,
          publish_date:"2010-2-2",
        },
        {
          aid:'2222',
          title:'明日方舟啊啊啊',
          tname:'游戏',
          dynamic: "明日方舟#游戏#喜之郎",
          view: 29000,
          favorite:2231,
          like:2222,
          coins:12121,
          publish_date:"2010-2-2",
        },
        {
          aid:'2222',
          title:'明日方舟啊啊啊',
          tname:'游戏',
          dynamic: "明日方舟#游戏#喜之郎",
          view: 29000,
          favorite:2231,
          like:2222,
          coins:12121,
          publish_date:"2010-2-2",
        },
      ]
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
  .fans-change-wrapper {
    padding: 20px;
  }
  .video-publish-table-wrapper {
    padding: 20px;
  }
}
</style>