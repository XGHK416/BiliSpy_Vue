<template>
  <div style="background:#f1f2f6">
    <div class="details-head-wrapper">
      <span>监控详情</span>
    </div>
    <div style="padding:32px">
      <el-row :gutter="10">
        <el-col :span="21">
          <div class="details-wrapper">
            <div class="detect-info-wrapper">
              <span class="title">明日方舟1周年庆预告，第七章 全身瘫痪 概念PV</span>
              <div class="date-info">
                <span class="time publish-time">
                  发布时间：
                  <font color="#f3904f">12312311</font>
                </span>
                <span class="time start-time">
                  开始时间：
                  <font color="#f3904f">12312311</font>
                </span>
                <span class="time last-update">
                  最后更新：
                  <font color="#f3904f">12312311</font>
                </span>
              </div>
              <!-- /////////////// -->
              <div class="detect-info">
                <el-row :gutter="10">
                  <el-col :span="6">
                    <div class="item view">
                      观看
                      <br />
                      <br />
                      <span>123123</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item like">
                      点赞
                      <br />
                      <br />
                      <span>123123</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item favorite">
                      收藏
                      <br />
                      <br />
                      <span>123123</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item coins">
                      投币
                      <br />
                      <br />
                      <span>123123</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!-- ////////////// -->
            <div class="detect-chart-wrapper">
              <div style="color:#666;font-weight: bold;">数据趋势分析</div>
              <div class="data-option">
                <el-radio-group v-model="option" size="medium">
                  <el-radio-button label="view">观看</el-radio-button>
                  <el-radio-button label="like">点赞</el-radio-button>
                  <el-radio-button label="coins">硬币</el-radio-button>
                  <el-radio-button label="favorite">收藏</el-radio-button>
                </el-radio-group>
              </div>
              <el-divider></el-divider>
              <cross-chart :cross-data="cross_data"></cross-chart>
            </div>
            <!-- ////////// -->
            <div class="detect-table-wrapper">
              <div style="color:#666;font-weight: bold;">数据趋势分析</div>
              <div class="detect-table">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column label="序号" width="180">
                        <template slot-scope="scope">
                            {{scope.$index}}
                        </template>
                    </el-table-column>
                  <el-table-column prop="date" label="日期"></el-table-column>
                  <el-table-column prop="view" label="观看"></el-table-column>
                  <el-table-column prop="like" label="点赞"></el-table-column>
                  <el-table-column prop="coins" label="硬币"></el-table-column>
                  <el-table-column prop="favorite" label="收藏"></el-table-column>
                  <el-table-column prop="share" label="转发"></el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="auths-wrapper">
            <el-avatar shape="square" :size="170" :src="url"></el-avatar>
            <el-divider></el-divider>
            <div class="auths-name">明日方舟</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CrossChart from "@/views/detect/detectResult/components/CrossChart";
export default {
  name: "DetectDetails",
  data() {
    return {
      video_id: this.$route.params["id"],
      option: "view",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      cross_data: {
        title_text: "数据趋势分析表",
        x_axis: [1, 10, 20, 30, 40, 50, 60],
        series: [34, 65, 77, 98, 77, 34, 5]
      },
      tableData: [
        {
          date: "2016-05-02",
          view: 1,
          like: 2231,
          coins: 13123,
          favorite: 43434,
          share: 2312312
        },
        {
          date: "2016-05-02",
          view: 1,
          like: 2231,
          coins: 13123,
          favorite: 43434,
          share: 2312312
        },
         {
          date: "2016-05-02",
          view: 1,
          like: 2231,
          coins: 13123,
          favorite: 43434,
          share: 2312312
        },
         {
          date: "2016-05-02",
          view: 1,
          like: 2231,
          coins: 13123,
          favorite: 43434,
          share: 2312312
        },
      ]
    };
  },
  components: {
    CrossChart
  },
  methods: {},
  created() {}
};
</script>

<style lang='scss' scoped>
.details-head-wrapper {
  border-top: 1px solid #e8e8e8;
  background: #ffffff;
  height: 70px;
  line-height: 70px;
  text-align: left;
  span {
    color: #666;
    margin-left: 10px;
    font-size: 20px;
  }
}
.details-wrapper {
  .detect-info-wrapper {
    padding: 16px;
    background: #ffffff;
    .title {
      font-size: 25px;
      color: #666;
    }
    .date-info {
      margin-top: 25px;
      .time {
        margin-right: 60px;
        color: #999;
      }
    }
    .detect-info {
      margin-top: 45px;
      padding: 15px;
      .item {
        padding: 24px 0 0 24px;
        height: 98px;
        background: rgba(59, 116, 255, 0.02);
        border: 1px solid #dfe8ff;
        line-height: 20px;

        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }

  .detect-chart-wrapper {
    margin-top: 20px;
    padding: 16px;
    background: #ffffff;
    .data-option {
      margin-top: 15px;
    }
  }
  .detect-table-wrapper {
    margin-top: 20px;
    padding: 16px;
    background: #ffffff;
    .detect-table {
      margin-top: 20px;
      .pagination {
        margin-top: 15px;
        text-align: center;
      }
    }
  }
}

.auths-wrapper {
  padding: 16px;
  background: #ffffff;
  text-align: center;
  .auths-name {
    font-size: 20px;
    color: #666;
  }
}
</style>