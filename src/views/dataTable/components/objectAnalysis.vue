<template>
  <div>
    <div class="topthree_works_wrapper">
      <el-row class="topthree_item_wrapper" type="flex" justify="space-around">
        <el-col :span="6">
          <div class="topthree_item">
            <div class="works_imgs">
              <el-popover placement="right" width="300" trigger="hover">
                <div>
                  <span>名称：{{topThree[1].video_title}}</span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#f22258;display: inline-block;margin-right:5px"
                    ></i>
                    播放：{{topThree[1].video_view}}
                  </span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#3494e6;display: inline-block;margin-right:5px"
                    ></i>
                    点赞：{{topThree[1].video_like}}
                  </span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#ec6ead;display: inline-block;margin-right:5px"
                    ></i>
                    硬币：{{topThree[1].coins}}
                  </span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#b7f8db;display: inline-block;margin-right:5px"
                    ></i>
                    收藏：{{topThree[1].video_favorite}}
                  </span>
                  <br />
                </div>
                <img
                  style="cursor: pointer;"
                  slot="reference"
                  referrerpolicy="no-referrer"
                  :src="topThree[1].video_profile"
                  alt
                  width="220px"
                />
              </el-popover>
              <div class="topthree_item_title">{{topThree[1].video_title}}</div>

              <div class="works_rank">
                <svg-icon icon-class="second_one" class-name="works_rank_icon" />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="topthree_item">
            <div class="works_imgs">
              <el-popover placement="right" width="300" trigger="hover">
                <div>
                  <span>名称：{{topThree[0].video_title}}</span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#f22258;display: inline-block;margin-right:5px"
                    ></i>
                    播放：{{topThree[0].video_view}}
                  </span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#3494e6;display: inline-block;margin-right:5px"
                    ></i>
                    点赞：{{topThree[0].video_like}}
                  </span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#ec6ead;display: inline-block;margin-right:5px"
                    ></i>
                    硬币：{{topThree[0].coins}}
                  </span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#b7f8db;display: inline-block;margin-right:5px"
                    ></i>
                    收藏：{{topThree[0].video_favorite}}
                  </span>
                  <br />
                </div>
                <img
                  style="cursor: pointer;"
                  slot="reference"
                  referrerpolicy="no-referrer"
                  :src="topThree[0].video_profile"
                  alt
                  width="250px"
                />
              </el-popover>
              <div class="topthree_item_title">{{topThree[0].video_title}}</div>
              <div class="works_rank">
                <svg-icon
                  icon-class="first_one"
                  class-name="works_rank_icon works_rank_icon_first"
                />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="topthree_item">
            <div class="works_imgs">
              <el-popover placement="right" width="300" trigger="hover">
                <div>
                  <span>名称：{{topThree[2].video_title}}</span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#f22258;display: inline-block;margin-right:5px"
                    ></i>
                    播放：{{topThree[2].video_view}}
                  </span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#3494e6;display: inline-block;margin-right:5px"
                    ></i>
                    点赞：{{topThree[2].video_like}}
                  </span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#ec6ead;display: inline-block;margin-right:5px"
                    ></i>
                    硬币：{{topThree[2].coins}}
                  </span>
                  <br />
                  <span>
                    <i
                      style="width:10px;height:10px;border-radius:50%;background-color:#b7f8db;display: inline-block;margin-right:5px"
                    ></i>
                    收藏：{{topThree[2].video_favorite}}
                  </span>
                  <br />
                </div>
                <img
                  style="cursor: pointer;"
                  slot="reference"
                  referrerpolicy="no-referrer"
                  :src="topThree[2].video_profile"
                  alt
                  width="220px"
                />
              </el-popover>
              <div class="topthree_item_title">{{topThree[2].video_title}}</div>
              <div class="works_rank">
                <svg-icon icon-class="third_one" class-name="works_rank_icon" />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="total_analysis">
      <el-row :gutter="10" type="flex">
        <el-col :span="8" class="total_left">
          <div>
            <el-row :gutter="20">
              <el-col :span="12" class="analysis_card_item">
                <el-card
                  :body-style="{ padding: '20px',background:'linear-gradient(90deg, #b7f8db 0%,#50a7c2 100% )' }"
                >
                  <div class="analysis_title">平均播放</div>
                  <div class="analysis_num">{{totalAna.view}}</div>
                </el-card>
              </el-col>
              <el-col :span="12" class="analysis_card_item">
                <el-card
                  :body-style="{ padding: '20px',background:'linear-gradient(90deg, #ff758c 0%,#ff7eb3 100% )'}"
                >
                  <div class="analysis_title">平均点赞</div>
                  <div class="analysis_num">{{totalAna.like}}</div>
                </el-card>
              </el-col>
              <el-col :span="12" class="analysis_card_item">
                <el-card
                  :body-style="{ padding: '20px',background:'linear-gradient(90deg, #89f7fe 0%,#66a6ff 100% )' }"
                >
                  <div class="analysis_title">平均硬币</div>
                  <div class="analysis_num">{{totalAna.coins}}</div>
                </el-card>
              </el-col>
              <el-col :span="12" class="analysis_card_item">
                <el-card
                  :body-style="{ padding: '20px',background:'linear-gradient(90deg, #a1c4fd 0%,#c2e9fb 100% )' }"
                >
                  <div class="analysis_title">平均收藏</div>
                  <div class="analysis_num">{{totalAna.favorite}}</div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="16" class="total_right">
          <div>
            <world-cloud :wc-data="worldCloudData"></world-cloud>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="work_publish_analysis">
      <el-row :gutter="10" type="flex">
        <el-col :span="19" class="publish_chart">
          <cross-chart :cross-data="publishData"></cross-chart>
        </el-col>
        <el-col :span="5" class="publish_predect">
          <div class="predect_num">
            <el-progress type="dashboard" :percentage="100" :format="formatDate"></el-progress>
          </div>
          <div class="predect_button">
            <el-button type="primary" @click="predictNextCount">预测下个月</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="work_state_analysis">
      <el-radio-group v-model="statusTab" style="margin-bottom: 30px;">
        <el-radio-button label="viewer">播放</el-radio-button>
        <el-radio-button label="like">点赞</el-radio-button>
        <el-radio-button label="coins">硬币</el-radio-button>
        <el-radio-button label="favorite">收藏</el-radio-button>
      </el-radio-group>
      <el-row :gutter="10" type="flex">
        <el-col :span="19" class="publish_chart">
          <works-status-bar :bar-data="workStatusData[statusTab]"></works-status-bar>
        </el-col>
        <el-col :span="5" class="publish_predect">
          <div class="predect_status">
            <el-row :gutter="10">
              <el-col :span="12" style="margin-top:10px">
                <el-card :body-style="{ padding: '15px' }">
                  <div class="predect_status_item">
                    <div class="status_item_title">播放</div>
                    <div class="status_item_num">{{pre_status.view}}</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12" style="margin-top:10px">
                <el-card :body-style="{ padding: '15px' }">
                  <div class="predect_status_item">
                    <div class="status_item_title">点赞</div>
                    <div class="status_item_num">{{pre_status.like}}</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12" style="margin-top:10px">
                <el-card :body-style="{ padding: '15px' }">
                  <div class="predect_status_item">
                    <div class="status_item_title">硬币</div>
                    <div class="status_item_num">{{pre_status.coins}}</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12" style="margin-top:10px">
                <el-card :body-style="{ padding: '15px' }">
                  <div class="predect_status_item">
                    <div class="status_item_title">收藏</div>
                    <div class="status_item_num">{{pre_status.favorite}}</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-select v-model="current_section" placeholder="请选择" style="width:90%;margin:10px 0px">
              <el-option
                v-for="item in section"
                :key="item.tid"
                :label="item.tname"
                :value="item.tid"
              ></el-option>
            </el-select>
          </div>
          <div class="predect_button">
            <el-button type="primary" @click="predectNextStatus">预测下个视频</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import WorldCloud from "@/views/dataTable/components/chart/WorldCloud";
import CrossChart from "@/views/dataTable/components/chart/CrossChart";
import WorksStatusBar from "@/views/dataTable/components/chart/WorksStatusBar";
import {
  getTopThree,
  getAverage,
  getCommonlyTags,
  getMonthWorksNum,
  getRecentWorksStatus,
  predectNextCount,
  predectNextStatus
} from "@/api/workAna";
export default {
  name: "ObjectAnalysis",
  components: {
    WorldCloud,
    CrossChart,
    WorksStatusBar
  },
  data() {
    return {
      mid: this.$route.params["id"],
      nextCount: 0,
      section: [],
      current_section:'',
      pre_status:{
        favorite:0,
        view:0,
        coins:0,
        like:0
      },
      topThree: [
        {
          video_title: 0,
          video_view: "",
          video_like: "",
          coins: "",
          video_favorite: ""
        },
        {
          video_title: 0,
          video_view: "",
          video_like: "",
          coins: "",
          video_favorite: ""
        },
        {
          video_title: 0,
          video_view: "",
          video_like: "",
          coins: "",
          video_favorite: ""
        }
      ],
      totalAna: {
        view: "",
        like: "",
        coins: "",
        favorite: ""
      },
      worldCloudData: [
        {
          name: "Sam S Club",
          value: 10000
        }
      ],
      publishData: {
        title_text: "每月发布视频情况",
        x_axis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        series: {
          name: "月发布",
          type: "line",
          smooth: false,
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        legend: ["月发布"]
      },
      workStatusData: {
        viewer: {
          x_axis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          series_data: [120, 100, 150, 80, 70, 10, 160],
          color: "#fcb9a2"
        },
        coins: {
          x_axis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          series_data: [120, 200, 150, 42, 70, 40, 130],
          color: "#5f9fe0"
        },
        like: {
          x_axis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          series_data: [120, 200, 132, 80, 70, 110, 160],
          color: "#744ea6"
        },
        favorite: {
          x_axis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          series_data: [90, 200, 150, 80, 70, 160, 130],
          color: "#40e0d0"
        }
      },
      statusTab: "viewer"
    };
  },
  methods: {
    formatDate() {
      if (this.nextCount / 10000 > 1) {
        return (this.nextCount / 10000).toFixed(2) + "万个";
      } else {
        return this.nextCount + "个";
      }
    },
    predictNextCount() {
      predectNextCount(this.mid).then(Response => {
        this.nextCount = Response.data.num;
      });
    },
    predectNextStatus(){
      if(this.current_section!=''){
        predectNextStatus(this.mid,this.current_section).then(Response=>{
          var data = Response.data
          this.pre_status.view = data.view
          this.pre_status.like = data.like
          this.pre_status.favorite = data.favorite
          this.pre_status.coins = data.coins
        })
      }
    }
  },
  created() {
    this.formatDate(1000);
    getTopThree(this.mid).then(Response => {
      this.topThree = Response.data;
    });
    getAverage(this.mid).then(Response => {
      this.totalAna = Response.data;
    });
    getCommonlyTags(this.mid).then(Response => {
      this.worldCloudData = Response.data;
    });
    getMonthWorksNum(this.mid).then(Response => {
      var data = Response.data;
      this.publishData.x_axis = data.xAxis;
      this.publishData.series.data = data.series;
    });
    getRecentWorksStatus(this.mid).then(Response => {
      var { video, section } = Response.data;

      var view_series = [];
      var like_series = [];
      var favorite_series = [];
      var coins_series = [];
      var x_axis = [];
      this.section = section;
      video.forEach(element => {
        console.log(element);
        view_series.push(element.videoView);
        like_series.push(element.videoLike);
        favorite_series.push(element.videoFavorite);
        coins_series.push(element.coins);
        x_axis.push(element.videoTitle);
      });
      console.log(view_series);
      this.workStatusData.viewer.x_axis = x_axis;
      this.workStatusData.viewer.series_data = view_series;

      this.workStatusData.like.x_axis = x_axis;
      this.workStatusData.like.series_data = like_series;

      this.workStatusData.favorite.x_axis = x_axis;
      this.workStatusData.favorite.series_data = favorite_series;

      this.workStatusData.coins.x_axis = x_axis;
      this.workStatusData.coins.series_data = coins_series;
    });
  }
};
</script>

<style lang='scss' scope>
.topthree_works_wrapper {
  .topthree_item_wrapper {
    margin-top: 15px;
    .topthree_item {
      text-align: center;
      .works_imgs {
        .topthree_item_title {
          width: 300px;
          margin: 0 auto;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 20px;
          color: #666;
        }
        .works_rank {
          .works_rank_icon {
            margin-top: 5px;
            height: 3.5em;
            width: 3.5em;
          }
          .works_rank_icon_first {
            height: 4.3em;
            width: 4.3em;
          }
        }
      }
    }
  }
}
.total_analysis {
  height: 100%;
  .total_left {
    height: 270px;
    border-right: 1px solid #e6e6e6;
    .analysis_card_item {
      margin-top: 7px;
      margin-bottom: 7px;
      text-align: center;
      .analysis_title {
        font-size: 30px;
        color: rgb(243, 243, 243);
      }
      .analysis_num {
        font-size: 35px;
        color: rgb(243, 243, 243);
      }
    }
  }
}
.publish_predect {
  position: relative;
  border-left: 1px solid #e6e6e6;
  text-align: center;
  .predect_num {
    margin-top: 70px;
    .predect_num:first-child {
      color: #5ca3e1;
      font-size: 45px;
      font-weight: bold;
    }
  }
  .predect_status {
    padding: 10px;
    .status_item_title {
      font-size: 30px;
      font-weight: bold;
      color: #444;
    }
    .status_item_num {
      margin-top: 5px;
      font-size: 24px;
      font-weight: bold;
      color: #666;
    }
  }
  .predect_button {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 5%;
  }
}
</style>