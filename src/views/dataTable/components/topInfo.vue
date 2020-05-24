<template>
  <div>
    <div class="top-info-container">
      <el-row type="flex">
        <el-col :span="10" class="top-left-container top-container-common">
          <el-row>
            <el-col :span="4">
              <div>
                <el-avatar shape="square" :size="100" :src="infoData.profile"></el-avatar>
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
            <el-button type="primary" plain @click="addMonitor(infoData.mid)">添加监控任务</el-button>
            <el-button type="success" v-if="!is_favorite" @click="favorite">收藏</el-button>
            <el-button type="warning" v-else @click="cancelFavorite">取消收藏</el-button>
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
import InfoContent from "./infoContent";
import { doFavorite, unFavorite, findFavorite } from "@/api/favorite";
export default {
  name: "TopInfo",
  props: {
    infoData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      favorite_id: -1,
      mid: this.$route.params["id"],
      user_id: this.$store.state.user.user_id,
      activeName: "Content",
      is_favorite: false
    };
  },
  mounted() {
    console.log(this.user_id)
    findFavorite(this.user_id, this.mid, "uploader").then(response => {
      if (response.data != null) {
        this.favorite_id = response.data.id;
        this.is_favorite = true;
      }
      else{
        this.is_favorite = false
      }
    });
  },
  methods: {
    addMonitor(mid){
      this.$router.push({ name: "DetectAdd", params: { id: mid,type:"uploader"} });
    },
    favorite() {
      doFavorite(this.user_id, this.mid, "uploader").then(response => {
        this.is_favorite = true;
        this.favorite_id = response.data
        this.$message({
          type: "success",
          message: "收藏成功"
        });
      });
    },
    cancelFavorite() {
      unFavorite(this.favorite_id).then(response => {
        this.is_favorite = false;
        this.$message({
          type: "warning",
          message: "已取消收藏"
        });
      });
    },
    handleClick(tab, event) {
    }
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