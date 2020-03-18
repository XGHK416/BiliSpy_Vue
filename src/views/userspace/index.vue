<template>
  <div class="user-container">
    <el-row>
      <el-col :span="14" :offset="5">
        <UserTop :info="base_info"></UserTop>
        <UserAuths :auths="auths" style="margin:30px 0"></UserAuths>
        <el-row type="flex" style="margin-top:15px" :gutter="20">
          <el-col :span="5">
            <div class="logging-wrapper">
              <div class="logging-head">
                <span class>登录记录</span>
              </div>
              <div class="logging-content">
                 <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.timestamp"
                >{{activity.content}}</el-timeline-item>
              </el-timeline>
              </div>
             
            </div>
          </el-col>
          <el-col :span="19">
            <UserDetect></UserDetect>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import UserInfo from './components/UserInfo'
import UserTop from "./components/UserTop";
import UserAuths from "./components/UserAuths";
import UserDetect from "./components/UserDetect";
import { mapGetters } from "vuex";
export default {
  name: "UserSpace",
  components: {
    UserTop: UserTop,
    UserAuths: UserAuths,
    UserDetect: UserDetect
  },
  data() {
    return {
      ///////////////logging
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["base_info", "auths"])
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.user-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .logging-wrapper {
    height: 100%;
    background: #ffffff;
    .logging-content{
      padding-top: 15px;
    }
    .logging-head {
    border-bottom: #e0e0e0 1px solid;
    padding: 5px;
    text-align: left;
    line-height: 30px;
    padding-left: 10px;
  }
  }
}
</style>
