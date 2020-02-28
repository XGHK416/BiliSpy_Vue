<template>
  <div class="top-info-container">
    <el-row type="flex">
      <el-col :span="10" class="top-left-container top-container-common">
        <el-row>
          <el-col :span="4">
            <div>
              <el-avatar
                shape="square"
                :size="100"
                src="https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png"
              ></el-avatar>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="margin-bottom:10px">
              <span class="title">XGHK416</span>
            </div>
            <span class="context">mid: 33333</span>
            <span class="context">
              身份:
              <el-tag type="danger" size="small">年度大会员</el-tag>
            </span>
          </el-col>
          <el-col :span="10">
            <div>
              <span class="context">所属分区:</span>
              <div>
                <span class="section">游戏区</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8" class="top-middle-container top-container-common">
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <div><span class="context">最新视频发布:</span></div>
            <div class="publish-date">2020-1-23 12:37:23</div>
          </el-col>
          <el-col :span="8">
              <div><span class="context">历史监控</span></div>
              <div><span class="detect-time">10</span> 次</div>
              <div class="detect-info">
                  <a href="/">查看监控历史</a>
              </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="top-right-container top-container-common">
          <div class="button-group">
              <el-button type="primary" plain>监控下次视频发布</el-button>
              <el-button type="primary">立即分析</el-button>
              <el-button type="warning">收藏</el-button>
          </div>
      </el-col>
    </el-row>
    <div class="top-bottom-container top-container-common">
      <span class="context" style="display:inline;">个人签名:</span>
      <span class="context" style="display:inline">哈哈哈哈哈哈哈我是神</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopInfo"
};
</script>

<style lang='scss' , scope>
.title {
      line-height: 30px;
      font-size: 20px;
      font-weight: bold;
    }
.context {
    font-size: 16px;
    font-weight: 500;
    color: rgba(44, 50, 67, 0.65);
    display: block;
    line-height: 30px;
}

.top-info-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .top-container-common {
    padding: 20px 20px 20px 20px;
  }
  .top-left-container {
    background-color: #ffffff;
    border-right: rgb(240, 242, 245) 2px solid;
    .section{
        line-height: 30px;
        font-size: 25px;
        font-weight: bold;
        color: #f34949;
    }
  }
  .top-middle-container {
    background-color: #ffffff;
    border-right: rgb(240, 242, 245) 2px solid;
    .publish-date{
        margin-top: 10px;
        color: rgb(59, 116, 255);
        font-size: 24px;
    }
    .detect-time{
        color: rgb(71, 198, 140);
        font-size: 24px;
    }
    .detect-info{
        margin-top: 15px;
        color: rgb(59, 116, 255);
        font-size: 10px;
    }
  }
  .top-right-container {
    background-color: #ffffff;
  }
  .top-bottom-container {
    padding: 10px 20px;
    border-top: rgb(240, 242, 245) 2px solid;
    background-color: #ffffff;
    text-align: left;
  }
}
</style>