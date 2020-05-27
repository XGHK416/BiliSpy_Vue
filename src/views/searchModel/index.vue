<template>
  <div>
    <div class="search_bar">
      <div class="search_input">
        <div class="base">
          <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
            <el-select v-model="searchOption" slot="prepend" placeholder="请选择">
              <el-option label="up主" value="uploader"></el-option>
              <el-option label="视频" value="video"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>

        <div class="option">
          <el-radio-group v-model="dataOrigin" slot="prepend">
            <el-radio-button label="system">本系统</el-radio-button>
            <el-radio-button label="bili">B站</el-radio-button>
          </el-radio-group>
          <div style="float:right">
            <el-select slot="append" v-model="currentOrderOption" placeholder="请选择排序">
              <el-option
                v-for="item in orderOption[searchOption]"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="result_wrapper" v-loading="loading">
      <div class="list_wrapper">
        <div
          v-if="uploaderListData.length==0&&currentOption=='uploader'||videoListData.length==0&&currentOption=='video'"
          class="empty_list"
        >暂时没有你要的内容</div>
        <div v-else class="result_list">
          <div class="uploader_result" v-if="currentOption=='uploader'">
            <el-row :gutter="10">
              <el-col :sm="8" :md="6" v-for="item in uploaderListData" :key="item.id">
                <uploader-unit :data="item" @openUploaderDialog="openUploaderDialog"></uploader-unit>
              </el-col>
            </el-row>
          </div>
          <div class="video_result" v-if="currentOption=='video'">
            <el-row :gutter="50">
              <el-col :sm="8" :md="6" v-for="item in videoListData" :key="item.id">
                <video-unit :data="item" @openVideoDialog="openVideoDialog"></video-unit>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalNum"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handlePageChange"
          @prev-click="handlePageChange"
          @next-click="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title width="30%" :visible.sync="uploaderDialogVisible" :destroy-on-close="true">
      <div>
        <uploader-info
          :data="uploaderInfoData"
          @changeDetectStatus="changeUploaderDetectStatus"
          @changeFavoriteStatus="changeUploaderFavoriteStatus"
        ></uploader-info>
      </div>
    </el-dialog>
    <el-dialog title :visible.sync="videoDialogVisible" :destroy-on-close="true">
      <div>
        <video-info
          :data="videoInfoData"
          @changeDetectStatus="changeVideoDetectStatus"
          @changeFavoriteStatus="changeVideoFavoriteStatus"
        ></video-info>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploaderUnit from "./components/UploaderUnit";
import VideoUnit from "./components/VideoUnit";
import UploaderInfo from "@/views/currentHot/InfoCard/components/UploaderInfo";
import VideoInfo from "@/views/currentHot/InfoCard/components/VideoInfo";

import { searchUploader, searchVideo } from "@/api/search_model";
import { getUploader, getVideo } from "@/api/hot_bili";
import { findFavorite } from "@/api/favorite";
export default {
  name: "SearchModel",
  components: {
    UploaderUnit,
    VideoUnit,
    UploaderInfo,
    VideoInfo
  },
  data() {
    return {
      loading: false,

      user_id: this.$store.state.user.user_id,

      searchInput: "",
      searchOption: "",
      dataOrigin: "system",
      currentOption: "uploader",
      currentOrderOption: "",

      // 分页
      totalNum: 0,
      currentPage: 1,
      pageSize: 20,

      videoDialogVisible: false,
      uploaderDialogVisible: false,

      orderOption: {
        video: [
          { label: "按观看数", value: "video_view", id: 1 },
          { label: "按发布时间", value: "create_time", id: 2 },
          { label: "按收藏数", value: "video_favorite", id: 3 }
        ],
        uploader: [
          { label: "按粉丝数降序", value: "follower#DESC", id: 4 },
          { label: "按粉丝数升序", value: "follower#ASC", id: 5 },
          { label: "按等级降序", value: "level#DESC", id: 6 },
          { label: "按等级升序", value: "level#DESC", id: 7 }
        ]
      },

      uploaderListData: [
        // {
        //   id: 1,
        //   level: "Level6",
        //   nickName: "WM星轨",
        //   vip: "年度大会员",
        //   mid: 123123,
        //   profile:
        //     "https://i0.hdslb.com/bfs/face/a43fa679fc18b11468ce1566ece25534e2114865.jpg@150w_150h.jpg"
        // }
      ],
      videoListData: [
        // {
        //   aid: 123,
        //   author: "XGHK416",
        //   title: "【PV】《Shiny Smily Story》hololive China成员歌唱版",
        //   pic:
        //     "https://i1.hdslb.com/bfs/archive/040408d7b550ed9fe6d1854eff14cf694e1bc06d.jpg@412w_232h_1c_100q.jpg"
        // }
      ],

      uploaderInfoData: {
        info: {
          face: "",
          mid: 0,
          name: "",
          level: 6
        },
        stat: {
          following: 0,
          follower: 0
        },
        upstat: {
          likes: 0,
          archive: {
            view: 0
          }
        },
        isDetect: true,
        isFavorite: false,
        favorite_id: -1,
        notice: ""
      },
      videoInfoData: {
        data: {
          pic: "",
          title: "",
          bvid: "",
          aid: 0,
          tname: "sdfa",
          desc: "ssa",
          stat: {
            coin: 0,
            favorite: 0,
            share: 0,
            like: 0,
            view: 0
          },
          dynamic: "sdfsa##dfsfs"
        },

        favoriteId: -1,
        isDetect: true
      }
    };
  },
  watch: {
    searchOption(val) {
      if (val == "video") {
        this.currentOrderOption = "video_view";
      } else if (val == "uploader") {
        this.currentOrderOption = "follower#DESC";
      }
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.handleSearch();
    },
    // 侦测状态
    changeUploaderDetectStatus() {
      this.uploaderInfoData.isDetect = true;
    },
    changeVideoDetectStatus() {
      this.uploaderInfoData.isDetect = true;
    },
    // 修改收藏的状态
    changeUploaderFavoriteStatus(id) {
      if (id > 0) {
        this.uploaderInfoData.favoriteId = id;
      } else {
        this.uploaderInfoData.favoriteId = -1;
      }
    },
    changeVideoFavoriteStatus(id) {
      if (id > 0) {
        this.videoInfoData.favoriteId = id;
      } else {
        this.videoInfoData.favoriteId = -1;
      }
    },

    // 打开信息框
    openUploaderDialog(mid) {
      this.uploaderDialogVisible = true;
      getUploader(mid, this.user_id).then(response => {
        this.uploaderInfoData = response.data;
      });
    },
    openVideoDialog(aid) {
      this.videoDialogVisible = true;
      getVideo(aid, this.user_id).then(response => {
        this.videoInfoData = response.data;
      });
    },
    handleSearch() {
      (this.uploaderListData = []), (this.videoListData = []);
      if (this.searchOption == "") {
        this.$message({
          message: "请选择搜索类型",
          type: "warning"
        });
      } else if (this.searchInput == "") {
        this.$message({
          message: "请输入查询内容",
          type: "warning" 
        });
      } else {
        this.loading = true;
        var params = {};
        params["key"] = this.searchInput;
        params["searchType"] = this.dataOrigin;
        params["page"] = this.currentPage;
        params["pageSize"] = this.pageSize;
        if (this.searchOption == "uploader") {
          // 搜索up主
          var order = this.currentOrderOption.split("#");
          params["order"] = order[0];
          params["orderSort"] = order[1];

          searchUploader(params).then(Response => {
            // this.uploaderListData = [];
            var item = {};
            if (this.dataOrigin == "system") {
              var list = Response.data.list;
              // 来源于系统
              list.forEach(element => {
                item["id"] = element.id;
                item["level"] = element.level;
                item["nickName"] = element.nickName;
                item["vip"] = element.vip;
                item["mid"] = element.userId;
                item["profile"] = element.profile;
                this.uploaderListData.push(item);
                item = {};
              });
              this.totalNum = Response.data.count;
            } else {
              var list = Response.data.result;
              list.forEach(element => {
                item["id"] = element.mid;
                item["level"] = this.returnLevel(element.level);
                item["nickName"] = element.uname;
                item["vip"] = "大会员";
                item["mid"] = element.mid;
                item["profile"] = element.upic;
                this.uploaderListData.push(item);
                item = {};
              });
              this.totalNum = 200;
            }
            this.currentOption = "uploader";
            this.loading = false;
          });
        } else if (this.searchOption == "video") {
          // 搜索视频
          params["order"] = this.currentOrderOption;
          searchVideo(params).then(Response => {
            this.videoListData = [];
            var item = {};
            if (this.dataOrigin == "system") {
              var list = Response.data.list;
              // 来源于系统
              list.forEach(element => {
                item["aid"] = element.videoId;
                item["author"] = element.videoAuthor;
                item["title"] = element.videoTitle;
                item["pic"] = element.videoProfile;
                this.videoListData.push(item);
                item = {};
              });
              this.totalNum = Response.data.count;
            } else {
              var list = Response.data.result;
              list.forEach(element => {
                item["aid"] = element.aid;
                item["author"] = element.author;
                item["title"] = element.title;
                item["pic"] = element.pic;
                this.videoListData.push(item);
                item = {};
              });
              this.totalNum = 200;
            }
            this.currentOption = "video";
            this.loading = false;
          });
        }
      }
    },
    returnLevel(level) {
      switch (level) {
        case 0:
          return "Level0";
          break;
        case 1:
          return "Level1";
          break;
        case 2:
          return "Level2";
          break;
        case 3:
          return "Level3";
          break;
        case 4:
          return "Level4";
          break;
        case 5:
          return "Level5";
          break;
        case 6:
          return "Level6";
          break;

        default:
          break;
      }
    }
  },
  created() {}
};
</script>

<style lang='scss' scope>
.search_bar {
  padding: 20px;
  text-align: center;
  .search_input {
    width: 600px;
    margin: 0 auto;
    .base {
      .el-select .el-input {
        width: 90px;
      }
    }
    .option {
      margin-top: 15px;
      .el-select {
        width: 130px;
      }
    }
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
}
.result_wrapper {
  background: #f1f2f6;
  min-height: calc(100vh - 185px);
  .list_wrapper {
    margin: 0 auto;
    width: 75%;
    .empty_list {
      text-align: center;
      padding-top: 130px;
    }
    .result_list {
      padding-top: 20px;
    }
  }
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
}
</style>