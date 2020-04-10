<template>
  <div>
    <div class="filter-wrapper">
      <el-radio-group v-model="filter_option" @change="optionChange">
        <el-radio-button :label="0">全部</el-radio-button>
        <el-radio-button :label="1">未开始</el-radio-button>
        <el-radio-button :label="2">以开始</el-radio-button>
        <el-radio-button :label="3">已结束</el-radio-button>
      </el-radio-group>
    </div>
    <div class="list-contain">
      <el-row :gutter="10">
        <el-col :span="4" v-for="item in list" :key="item.detectId">
          <el-card :body-style="{ padding: '0px' }">
            <div class="card-head" slot="header">
              <span >{{item.auths}}</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="handleInfo(item.detectId)"
              >详情</el-button>
            </div>
            <div class="card-contain">
              <div class="info-bg">
                <img :src="item.detectProfile" alt referrerpolicy="no-referrer" />
              </div>
              <div class="mask">
                <div class="title">{{item.detectName}}</div>
              </div>
            </div>
            <div class="card-info">
              <div class="start-time info-item">开始时间：{{item.startTime}}</div>
              <div class="detect-rate info-item">监控频率：{{getRate_(item.cornExpression)}} 分钟</div>
              <div class="state info-item">
                状态:&nbsp;
                <el-tag :type="getState(item.isClose).type" size="small">{{getState(item.isClose).msg}}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="page_size"
          @current-change="pageChange"
          @prev-click="pageChange"
          @next-click="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideoDetectInfo } from "@/api/detect_info";
import {getRate} from "@/utils/cron"
export default {
  name: "VideoList",
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      ///
      filter_option: 0,
      url: "",
      ////pagination
      total: 0,
      page_size: 18,
      ///////////
      list: []
    };
  },
  methods: {
    // 获取侦测频率
    getRate_(cron){
      return getRate(cron)
    },
    // 获取当前运行状态
    getState(state){
      switch (state) {
        case 0:
          return {
            msg:'运行中',
            type:'success'
          }
          break;
        case -1:
          return {
            msg:'未运行',
            type:'primary'
          }
          break;
        case 1:
          return {
            msg:'已完成',
            type:'info'
          }
          break;
      
        default:
          break;
      }
      return 
    },
    getVideoDetectInfo_(page, page_size, user_id, type) {
      getVideoDetectInfo(page, page_size, user_id, type).then(Response => {
        var { count, list } = Response.data;
        (this.total = count), (this.list = list);
      });
    },
    pageChange(page) {
      this.getVideoDetectInfo_(
        page,
        this.page_size,
        this.user_id,
        this.filter_option
      );
    },
    optionChange(label) {
      this.getVideoDetectInfo_(1, this.page_size, this.user_id, label);
    },
    ///
    handleInfo(id) {
      let url = "/detectModel/detectDetails/" + id;
      this.$router.push({ path: url });
    }
  },
  created() {
    // 获取全部侦测
    this.getVideoDetectInfo_(
      1,
      this.page_size,
      this.user_id,
      this.filter_option
    );
  }
};
</script>

<style lang='scss' scoped>
.list-contain {
  margin-top: 15px;
  .card-contain {
    height: 150px;
    margin: 5px;
    position: relative;
    .info-bg {
      position: absolute;
      height: 100%;
      width: 100%;
      // background: url("https://i1.hdslb.com/bfs/archive/57f922a0e957fa076394556d4c131169270c6c65.jpg@412w_232h_1c_100q.jpg")
      //   no-repeat center;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .mask {
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      position: relative;
      .title {
        position: absolute;
        color: #ffffff;
        font-size: 20px;
        bottom: 5px;
        left: 5px;
      }
    }
  }
  .card-info {
    padding: 5px;
    color: rgba(0, 0, 0, 0.75);
    font-size: 14px;
    .info-item {
      margin-bottom: 16px;
    }
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>