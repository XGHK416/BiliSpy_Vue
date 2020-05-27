<template>
  <div style="margin-bottom:5px">
    <el-card class="box-card" shadow="hover">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="img-wrapper">
            <img :src="data.profile" referrerpolicy="no-referrer" />
          </div>
        </el-col>
        <el-col :span="18">
          <div class="introduce">
            <span class="nick_name">{{data.nickName}}</span>
            <div>
              <span class="mid">mid:{{data.mid}}</span>
            </div>
            <div class="level">
              <img :src="returnLevel_(data.level)" style="height:12px" />
            </div>
            <div class="vip">{{data.vip}}</div>
          </div>
        </el-col>
        <el-col :span="24">
          <div style="border:1px solid #f1f2f6;width:100%;margin:7px"></div>
        </el-col>
        <!-- <el-col :span="12" style="text-align:center">
        <div class="following">
          <span class="ff_text">关注</span>
          <div class="ff_num">12312312</div>
        </div>
      </el-col>
      <el-col :span="12" style="text-align:center">
        <div class="follower">
          <span class="ff_text">粉丝</span>
          <div class="ff_num">12312312</div>
        </div>
        </el-col>-->
      </el-row>
      <el-button type="primary" style="width:100%;margin-top:7px" @click="handleInfo">查看详情</el-button>
    </el-card>
  </div>
</template>

<script>
import { returnLevel } from "@/utils/return-level";
export default {
  name: "UplaoderUnit",
  props: {
    data: {
      type: Object,
      require: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleInfo() {
      this.$emit("openUploaderDialog", this.data.mid);
    },
    returnLevel_(level) {
      return returnLevel(level);
    }
  },
  created() {}
};
</script>
<style scope lang='scss'>
.box-card {
  .img-wrapper {
    max-height: 80px;
    max-width: 80px;
    img {
      max-height: 80px;
      max-width: 80px;
    }
  }
  .introduce {
    padding-left: 10px;
    .nick_name {
      font-size: 20px;
      font-weight: 600;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .mid {
      font-size: 15px;
      color: #666;
    }
    .level {
      margin: 5px 0;
    }
  }
  .following {
    cursor: pointer;
    border-radius: 3px;
    background: #ffffff;
    padding: 5px;
    &:hover {
      background: #ff758c;
      transition: all 0.38s ease-out;
    }
  }
  .follower {
    cursor: pointer;
    border-radius: 3px;
    background: #ffffff;
    padding: 5px;
    &:hover {
      background: #6ab0fe;
      transition: all 0.38s ease-out;
    }
  }
  .ff_text {
    font-size: 24px;
    color: #555;
  }
  .ff_num {
    margin-top: 10px;
    font-size: 18px;
    color: #666;
  }
}
</style>