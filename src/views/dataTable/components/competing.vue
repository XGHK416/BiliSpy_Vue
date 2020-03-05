<template>
  <div class="competing-wrapper">
    <div class="competing-table-wrapper">
      <span>核心数据对比</span>
      <el-table :data="tableData" stripe style="width: 100%" script>
        <el-table-column label="up主" align="center">
          <template slot-scope="{row}">
            <el-avatar shape="square" :src="row.profile"></el-avatar>
            <div>{{ row.nickname}}</div>
          </template>
        </el-table-column>
        <el-table-column label="排名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.rank }}</span>
          </template>
        </el-table-column>
        <el-table-column label="粉丝数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.fans }}</span>
          </template>
        </el-table-column>
        <el-table-column label="粉丝增长率" align="center">
          <template slot-scope="{row}">
            <span>{{ row.fans_rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="视频数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.video_publish }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平均视频观看人数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.avage_watch }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-tag type="danger" v-if="row.isOri" size="small">本体</el-tag>
            <el-popconfirm v-else title="这是一段内容确定删除吗？" @onConfirm="handleConfirm(row)">
              <el-button type="info" plain size="small" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="option-panel-wrapper">
        <div class="option-panel">
          <el-tooltip class="item" effect="dark" content="有系统推荐与之相类似的up主" placement="left-start">
            <el-button type="success" plain @click="addRecommend">推荐加入</el-button>
          </el-tooltip>
          <el-button type="info" plain @click="addMyself">手动添加</el-button>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="competing-cross-wrapper">
      每日对比
      <!-- <CrossChart></CrossChart> -->
    </div>
    <!-- 加入dialog -->
    <el-dialog
      class="addDialog-wrapper"
      :title="add_Dialog.title"
      :visible.sync="add_Dialog.visible"
      width="30%"
    >
      <el-input
        v-model="add_Dialog.search_input"
        placeholder="请输入up主"
        v-if="add_Dialog.title=='手动加入'"
        style="width:70%"
      ></el-input>
      <el-button type="primary" v-if="add_Dialog.title=='手动加入'" @click="search_competing">搜索</el-button>
      <div class="addList-wrapper">
        <el-row :gutter="30">
          <el-col :span="12" v-for="item in add_TableList" :key="item.mid+''">
            <div class="list-item">
              <div style="display:inline-block">
                <el-avatar shape="square" :size="45" :src="item.profile"></el-avatar>
              </div>
              <div class="item-cotent-wrapper">
                <div class="item-cotent">
                  <span class="item-title">{{item.name}}</span>
                  <div class="item-select">
                    <el-button
                      type="success"
                      size="mini"
                      v-if="item.status"
                      @click="addInList(item)"
                    >添加</el-button>
                    <el-button type="warning" size="mini" v-else @click="cancleInList(item)">取消</el-button>
                  </div>
                </div>
                <div class="item-abstract">
                  <span>{{item.abstract}}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="add_Dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="add_Dialog.visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CrossChart from "../../baseAnalysis/components/CrossChart";
import {
  getUploader,
  getCompetingData,
  getCompetingUploader
} from "@/api/uploaderAna";
export default {
  name: "Competing",
  components: {
    CrossChart: CrossChart
  },
  data() {
    return {
      mind_mid: {
        mid: 0,
        status: true
      },
      // 添加列表
      // 已有竞品mid列表
      add_inList: [],
      // 查询竞品列表
      add_TableList: [],
      add_TableList_mid:[],
      // add_TableData: {
      //   mid: 12322,
      //   profile:
      //     "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //   name: "明日方舟",
      //   abstract: "ssss"
      // },
      // 竞品列状态
      add_TableState: {
        page: 1,
        pageSize: 6
      },

      add_Dialog: {
        search_input: "",
        visible: false,
        title: "推荐加入"
      },
      // 折线图数据
      option: [7, 30],
      currentOption: 7,
      CrossData: {
        title_text: "粉丝增长变化",
        legend: [],
        x_axis: [],
        series: []
      },
      Series: {
        name: "",
        type: "line",
        stack: "总量",
        areaStyle: {},
        data: []
      },
      // 数据列表
      clounm: {
        follower: "粉丝",
        followerRate: "粉丝增长数",
        rank: "排名",
        avage_watch: "最新视频平均"
      },
      tableState: {
        show_clounm: "follwer",
        total: 1,
        max_show: 5
      },
      // 精品列表
      tableData: [
        // {
        //   profile:
        //     "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
        //   nickname: "明日方舟官方",
        //   rank: 1,
        //   fans: 2222,
        //   video_publish: 290,
        //   //   粉丝增长率
        //   fans_rate: 29000,
        //   //   视频平均观看人数
        //   latest_watch: 212,
        //   isOri: true
        // }
      ]
    };
  },
  created() {
    this.mind_mid.mid = Number(this.$route.params["id"]);
    this.addInList(this.mind_mid);
  },
  methods: {
    // 查询竞品
    search_competing() {
      let key = this.add_Dialog.search_input;
      getCompetingUploader(
        key,
        this.add_TableState.page,
        this.add_TableState.pageSize
      ).then(response => {
        var data = response["data"];
        const table_data = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            if(data[key].userId===this.mind_mid.mid){
              // continue
            }
            let add_table_item = {};
            add_table_item.name = data[key]["nickName"];
            add_table_item.mid = data[key].userId;
            add_table_item.profile =
              "https://images.weserv.nl/?url=" + data[key].profile;
            add_table_item.name = data[key].nickName;
            add_table_item.abstract = data[key].sign;
            // 判断是否已经添加至竞品列表
            if (this.isInAddList(add_table_item.mid)) {
              add_table_item.status = true;
            } else {
              add_table_item.status = false;
            }
            //  console.log(add_table_item.status)
            // 加入到竞品列表检测名单中
            this.add_TableList_mid.push(add_table_item.mid)
            table_data.push(add_table_item);
            // console.log(element)
            // this.addTo_add_Table(element)
          }
        }
        this.add_TableList = table_data;
      });
    },
    // 加入到竞品选单中
    addInList(item) {
      // 添加竞品
      // 添加至table
      getCompetingData(item.mid).then(response => {
        let item_ = {};
        let data = response.data;
        let uploader = data.uploader;
        let fans = data.fans.series_data;
        let fans_avg = 0;
        let latest_video = data.latestVideo.pop();
        fans_avg =  parseInt((fans.pop().value - fans[0].value) / fans.length);
        item_.mid = item.mid
        item_.profile = this.return_profile(uploader.profile);
        item_.nickname = uploader.nickName;
        item_.rank = 1;
        item_.fans = uploader.follower;
        item_.fans_rate = fans_avg;
        item_.video_publish = uploader.videoCount;
        item_.latest_watch = latest_video;
        // 判断是否本机
        if(item.mid===this.mind_mid.mid){
          item_.isOri = true;
        }
        else item_.isOri = false;
        // 加入竞品列表
        this.tableData.push(item_);
      });
      // 加入已添加列表和改变竞品可选列表的状态
      this.add_inList.push(item.mid);
      console.log(this.add_inList);
      item.status = false;
    },
    // 从竞品选单中删除
    cancleInList(item) {
      console.log(item.mid)
      var index = this.add_inList.indexOf(item.mid);
      console.log(index)
      this.add_inList.splice(index, 1);
      this.tableData.splice(index,1);
      if(item.status!=undefined){
        item.status = true;
      }else{
        var list_index = this.add_TableList_mid.indexOf(item.mid);
        this.add_TableList[list_index].status = true
      }
    },
    // 从竞品列表中删除
    // cancleFromTablePanel(item){
    //   var index = this.add_inList.indexOf(item.mid);
    //   this.add_inList.splice(index, 1);
    // },
    // 验证是否已添加竞品
    isInAddList(mid) {
      var flag = true;
      var items = this.add_inList;
      if (items.length === 0) {
        flag = true;
      } else {
        items.forEach(function(i, index) {
          if (i === mid) {
            flag = false;
          } else {
            flag = true;
          }
        });
      }
      return flag
    },
    initCross() {
      fansChange(this.mid, 7).then(response => {
        var data = response["data"];
        this.fansCrossData.legend.push(this.name);
        this.fansSeries.name = this.name;

        for (let item of Object.values(data["fans"]["series_data"])) {
          var { name, value } = item;
          this.fansCrossData.x_axis.push(name);
          this.fansSeries.data.push(value);
        }
        this.fansCrossData.series.push(this.fansSeries);
      });
    },
    addRecommend() {
      (this.add_Dialog.visible = true), (this.add_Dialog.title = "推荐加入");
    },
    addMyself() {
      (this.add_Dialog.visible = true), (this.add_Dialog.title = "手动加入");
    },
    handleConfirm(item) {
      console.log(item)
      this.cancleInList(item)
    },
    return_profile(url) {
      return "https://images.weserv.nl/?url=" + url;
    }
  }
};
</script>

<style lang="scss" scope>
.option-panel-wrapper {
  position: relative;
  text-align: center;
  padding: 30px 200px;
}
.competing-cross-wrapper {
  padding-top: 50px;
}
.addDialog-wrapper {
  text-align: center;
  .el-dialog__footer {
    background-color: #f9f9f9;
  }
  .addList-wrapper {
    padding-top: 26px;
    min-height: 60px;
    .list-item {
      margin-top: 10px;
      padding: 10px 5px 5px 10px;
      border: 1px solid #f0eded;
      border-radius: 4px;
      text-align: left;
      display: flex;
      .item-cotent-wrapper {
        width: calc(100% - 45px);
        height: 100%;
        padding-left: 12px;
        display: table;
        table-layout: fixed;
        .item-cotent {
          height: 67%;
          color: #333;
          position: relative;
          margin-bottom: 10px;
          .item-title {
            font-size: 17px;
            max-width: 150px;
            color: #333;
          }
          .item-select {
            position: absolute;
            top: 0px;
            right: 10px;
          }
        }
        .item-abstract {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          color: rgba(44, 50, 67, 0.65);
        }
      }
    }
  }
}
</style>