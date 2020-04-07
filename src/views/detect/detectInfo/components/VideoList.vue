<template>
  <div>
    <div class="filter-wrapper">
      <el-radio-group v-model="filter_option">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="wait">未开始</el-radio-button>
        <el-radio-button label="active">以开始</el-radio-button>
        <el-radio-button label="close">已结束</el-radio-button>
      </el-radio-group>
    </div>
    <div class="list-contain">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-card :body-style="{ padding: '0px' }">
            <div slot="header">
              <span>明日方舟</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="handleInfo(123)">详情</el-button>
            </div>
            <div class="card-contain">
              <div class="info-bg">
                <div class="mask">
                    <div class="title">xixxixxijx</div>
                </div>
              </div>
            </div>
            <div class="card-info">
                <div class="start-time info-item">开始时间：20210321</div>
                <div class="detect-rate info-item">监控频率：10</div>
                <div class="state info-item">状态:&nbsp;<el-tag type="success" size="small">运行中</el-tag></div>
                
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoList",
  data() {
    return {
      filter_option: "all",
      url:''
    };
  },
  methods: {
    handleInfo(id){
      let url = "/detectModel/detectDetails/" + id;
      this.$router.push({ path: url });
    }
  },
  created() {}
};
</script>

<style lang='scss' scoped>
.list-contain {
    margin-top: 15px;
  .card-contain {
    height: 150px;
    padding: 5px;
    .info-bg {
      height: 100%;
      background: url("https://i1.hdslb.com/bfs/archive/57f922a0e957fa076394556d4c131169270c6c65.jpg@412w_232h_1c_100q.jpg") no-repeat center;
      .mask {
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: relative;
        .title{
            position: absolute;
            color: #ffffff;
            font-size: 20px;
            bottom: 5px;
            left: 5px;

        }
      }
    }
  }
  .card-info{
      padding: 5px;
      color: rgba(0,0,0,.75);
      font-size: 14px;
      .info-item{
        margin-bottom: 16px;
      }
  }
}
</style>