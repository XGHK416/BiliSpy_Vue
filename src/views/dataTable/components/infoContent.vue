<template>
  <div class="infoContent-container">
    <div>
      <el-row :gutter="10" type="flex">
        <el-col :span="3" class="day-publish-count-wrapper">
          <div class="wday-publish-count day-publish-count">
            <el-progress type="dashboard" :percentage="percentage" :format="formatWday"></el-progress>
            <div class="day-publish-title">七日总发视频数</div>
          </div>
          <div class="mday-publish-count day-publish-count">
            <el-progress
              type="dashboard"
              color="#e6a23c"
              :percentage="percentage"
              :format="formatMday"
            ></el-progress>
            <div class="day-publish-title">月总发视频数</div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="video-section-count-wrapper">
            <PieChart :chart-data="videoAnaData.section_data"></PieChart>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="video-date-publish-wrapper">
            <PieChart :chart-data="videoAnaData.publish_data"></PieChart>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="fans-change-wrapper">
      <CrossChart :cross-data="fansCrossData"></CrossChart>
    </div>
    <el-divider></el-divider>
    <div class="video-publish-table-wrapper">
      <span>最近发文</span>
      <el-table :data="tableData" stripe style="width: 100%" script>
        <el-table-column label="aid" align="center">
          <template slot-scope="{row}">
            <span>{{ row.videoId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="{row}">
            <span>{{ row.videoTitle }}</span>
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
            <span>{{ row.videoView }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点赞" align="center">
          <template slot-scope="{row}">
            <span>{{ row.videoLike }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收藏" align="center">
          <template slot-scope="{row}">
            <span>{{ row.videoFavorite }}</span>
          </template>
        </el-table-column>
        <el-table-column label="投币" align="center">
          <template slot-scope="{row}">
            <span>{{ row.coins }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" plain @click="collection(row.videoId)">分析</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import PieChart from "../../baseAnalysis/components/PieChart";
import CrossChart from "./chart/CrossChart";
import {fansChange,getRecentVideo,getVideoAna} from "@/api/uploaderAna"
import router from '../../../router';
export default {
  name: "InfoContent",
  components: {
    PieChart: PieChart,
    CrossChart: CrossChart
  },
  data() {
    return {
      mid:this.$route.params['id'],
      name:"",
      percentage: 100,
      w_day:0,
      m_day:0,
      // 视频分析
      videoAnaData:{
        weak_count : 0,
        month_count : 0,
        section_data : {},
        publish_data : {}

      },
      // 视频列表
      pageCount:{
        pageSize:7,
        currentPage:1,
        totalNum:0
      },
      tableData: [
     
      ],
      // 折线图数据
      fansCrossData: {
        title_text:"粉丝增长变化",
        legend:[],
        x_axis:[],
        series:[]
      },
      fansSeries:{
            name: "",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: []
        }
    }
  },
  created(){
    // let tab1_promise=this.initFansCross()
    // let tab2_promise=this.initCurrentVideo()
    // let tab3_promise=this.initVideoAna()
    // let arr=[tab1_promise,tab2_promise,tab3_promise]
    Promise.all([this.initFansCross(),this.initCurrentVideo(),this.initVideoAna()]).then().catch()

    // this.initFansCross()
    // this.initCurrentVideo()
    // this.initVideoAna()

  },
  methods: {
    collection(aid){
      let url = "/dataTable/VideoInfo/" + aid;
      this.$router.push({ path: url });
    },
    initFansCross(){
      fansChange(this.mid,7).then(response=>{
        var data = response['data']
        this.fansCrossData.legend.push(this.name)
        this.fansSeries.name=this.name

        for(let item of Object.values(data['fans']['series_data'])){
          var {name,value} = item
          this.fansCrossData.x_axis.push(name)
          this.fansSeries.data.push(value)
        }
        this.fansCrossData.series.push(this.fansSeries)
      })
    },
    initCurrentVideo(){
      getRecentVideo(this.mid,this.pageCount.currentPage,this.pageCount.pageSize).then(response=>{
        var data = response['data']['list']
        this.tableData = data
      })
    },
    initVideoAna(){
      getVideoAna(this.mid).then(response=>{
        let data = response['data']
        this.videoAnaData.weak_count = data['wday_count']
        this.videoAnaData.month_count = data['mday_count']
        this.videoAnaData.section_data = data['section']
        this.videoAnaData.publish_data = data['publish']
      })
    },
    resetFansSeries(){
      this.fansSeries={
            name: "",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: []
        }
    },
    formatWday() {
      return ""+this.videoAnaData.weak_count;
    },
    formatMday() {
      return ""+this.videoAnaData.month_count;
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