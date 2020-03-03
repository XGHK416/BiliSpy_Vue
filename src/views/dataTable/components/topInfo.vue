<template>
  <div>
    <div class="top-info-container">
      <el-row type="flex">
        <el-col :span="10" class="top-left-container top-container-common">
          <el-row>
            <el-col :span="4">
              <div>
                <el-avatar
                  shape="square"
                  :size="100"
                  :src="infoData.profile"
                ></el-avatar>
              </div>
            </el-col>
            <el-col :span="10">
              <div style="margin-bottom:10px">
                <span class="title">{{infoData.nick_name}}</span>
              </div>
              <span class="context">mid: {{infoData.mid}}</span>
              <span class="context">
                身份:
                <el-tag type="danger" size="small">{{infoData.vip}}</el-tag>
              </span>
            </el-col>
            <el-col :span="10">
              <div>
                <span class="context">所属分区</span>
                <div>
                  <span class="section">{{infoData.belong_section}}区</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" class="top-middle-container top-container-common">
          <el-row type="flex" justify="space-between">
            <el-col :span="8">
              <div>
                <span class="context">最新视频发布:</span>
              </div>
              <div class="publish-date">{{infoData.last_publish}}</div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="context">历史监控</span>
              </div>
              <div>
                <span class="detect-time">{{infoData.detect_time}}</span> 次
              </div>
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
        <span class="context" style="display:inline">{{infoData.detect_time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import InfoContent from './infoContent'
export default {
  name: "TopInfo",
  props:{
    infoData:{
      type:Object,
      required:true,
    }
  },
  data() {
    return {
      activeName: "Content",
    };
  },
  created(){
    console.log(this.infoData)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
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
    .section {
      line-height: 30px;
      font-size: 25px;
      font-weight: bold;
      color: #f34949;
    }
  }
  .top-middle-container {
    background-color: #ffffff;
    border-right: rgb(240, 242, 245) 2px solid;
    .publish-date {
      margin-top: 10px;
      color: rgb(59, 116, 255);
      font-size: 24px;
    }
    .detect-time {
      color: rgb(71, 198, 140);
      font-size: 24px;
    }
    .detect-info {
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
    background-color: RGB(251, 251, 251);
    text-align: left;
  }
}

</style>