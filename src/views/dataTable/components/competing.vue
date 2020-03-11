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
          <template slot-scope="{$index,row}">
            <el-tag type="danger" v-if="row.isOri" size="small">本体</el-tag>
            <el-popconfirm v-else title="这是一段内容确定删除吗？" @onConfirm="handleConfirm(row.mid,$index)">
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
      <el-tabs v-model="cross_option.current_option.key" @tab-click="crossTabsHandleClick">
        <el-tab-pane :label="cross_option.clounms[0].name" :name="cross_option.clounms[0].key"></el-tab-pane>
        <el-tab-pane :label="cross_option.clounms[1].name" :name="cross_option.clounms[1].key"></el-tab-pane>
        <el-tab-pane :label="cross_option.clounms[2].name" :name="cross_option.clounms[2].key"></el-tab-pane>
      </el-tabs>
      <!-- <CrossChart :cross-data="cross_data[cross_option.current_option.key]"></CrossChart> -->
    </div>
    <!-- 加入dialog -->
    <UploaderMenu
      @handlePageChange="pageChange"
      @handleClose="handleClose"
      @handleSelect="handleSelect"
      @handleDiselect="handleDiselect"
      @handleSearch="handleSearch"
      :data="menuItems"
      :visiable.sync="menuVisiable"
      :totalPage="totalPage"
      :haveSearch="haveSearch"
      ref="uploaderMenu"
    ></UploaderMenu>
    <el-dialog
      class="addDialog-wrapper"
      :title="menu_option.title"
      :visible.sync="menu_option.visible"
      width="30%"
    >
      <el-input
        v-model="menu_option.search_input"
        placeholder="请输入up主"
        v-if="menu_option.title=='手动加入'"
        style="width:70%"
      ></el-input>
      <el-button
        type="primary"
        v-if="menu_option.title=='手动加入'"
        @click="search_competing('SEARCH')"
      >搜索</el-button>
      <div class="addList-wrapper">
        <el-row :gutter="30">
          <el-col :span="12" v-for="(item,index) in menu_list" :key="item.mid+''">
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
                    <el-button type="warning" size="mini" v-else @click="cancleInList(item,index)">取消</el-button>
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
      <el-pagination
        small
        layout="prev, pager, next"
        v-if="menu_pagination.totalSize>0"
        :total="menu_pagination.totalSize"
        :page_size="menu_pagination.pageSize"
        style="margin-top:30px"
        @current-change="menuPageChange"
        @prev-click="menuPageChange"
        @next-click="menuPageChange"
      ></el-pagination>

      <span slot="footer" class="dialog-footer">
        <el-button @click="menu_option.visible = false">取 消</el-button>
        <el-button type="primary" @click="menu_option.visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CrossChart from "../../baseAnalysis/components/CrossChart";
import UploaderMenu from "@/components/UploaderMenu/index";
import qs from "qs";
import {
  getUploader,
  getCompetingData,
  getCompetingUploader,
  getCompetingOnesData
} from "@/api/uploaderAna";
export default {
  name: "Competing",
  components: {
    CrossChart: CrossChart,
    UploaderMenu: UploaderMenu
  },
  // 选单数据格式
  //   mid: 12322,
  //   profile:
  //     "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
  //   name: "明日方舟",
  //   abstract: "ssss"
  // },
  // 列表数据格式
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
  data() {
    return {
      mind_mid: {
        mid: 0,
        status: true
      },
      ////////////////////////////重构
      haveSearch: true,
      menuVisiable: false,
      menuTitle: "推荐加入",
      totalPage: 0,
      menuItems: [],

      /////////////////////////////////////
      // 选单mid的list
      menu_mid_list: [],
      // 选单数据列
      menu_list: [],
      // 竞争mid的list
      competing_mid_list: [],
      // 选单表状态
      menu_pagination: {
        page: 1,
        pageSize: 6,
        totalSize: 0
      },
      // 选单状态
      menu_option: {
        search_input: "",
        visible: false,
        title: "推荐加入"
      },
      // 折线图选项
      cross_option: {
        current_option: { key: "FANS", name: "粉丝" },
        day_limit: [
          { limit: 7, title: "七日表" },
          { limit: 30, title: "一月榜" }
        ],
        clounms: [
          { key: "FANS", name: "粉丝" },
          { key: "VIDEO", name: "视频" },
          { key: "RANK", name: "排名" }
        ],
        total_data: 1,
        max_data: 5
      },
      // 折线图数据
      cross_data: {
        FANS: {},
        VIDEO: {},
        RANK: {}
      },
      // 折线图单元
      cross_data_unit: {
        title_text: "粉丝增长变化",
        legend: [],
        x_axis: [],
        series: []
      },
      // 折线图单元数据
      cross_data_unit_series: {
        name: "",
        type: "line",
        stack: "总量",
        areaStyle: {},
        data: []
      },
      // 列表数据
      tableData: []
    };
  },
  created() {
    this.mind_mid.mid = Number(this.$route.params["id"]);
    // this.competing_mid_list.push(this.mind_mid.mid);
    this.addInList(this.mind_mid);
    this.addToCross(
      [this.mind_mid.mid],
      this.cross_option.current_option.key,
      7
    );
  },
  methods: {
    //////////////////////////////////////重构
    handleClose() {
      this.menuVisiable = false;
    },
    pageChange(key, page, pageSize) {
      console.log(page)
      this.getMenuData(key,page,pageSize)
      //   请求换页
    },
    handleSelect(item, list,index) {
      // 选中时的事件
      // item.isSelect = true
      // 添加到table
      this.addInList(item);
    },
    handleDiselect(item, list,index) {
      this.tableData.splice(index+1, 1);
      // 取消选中的事件
      // item.isSelect = false;
    },
    getMenuData(key,page,pageSize){
      getCompetingUploader(key, page, pageSize).then(response => {
        // 先将menu列表清空
        this.menuItems = [];
        // 将数据更新到menu中
        var data = response["data"];
        this.totalPage = data["count"];
        var list = data["list"];
        const table_data = [];

        for (const key in list) {
          if (list.hasOwnProperty(key)) {
            // 如果是本机那么就不用添加，故选单中不会出现本机id
            if (list[key].userId === this.mind_mid.mid) {
              continue;
            }
            let item = {};
            item.name = list[key]["nickName"];
            item.mid = list[key].userId;
            item.profile = "https://images.weserv.nl/?url=" + list[key].profile;
            item.name = list[key].nickName;
            item.abstract = list[key].sign;
            // 加入到竞品列表检测名单中
            table_data.push(item);
          }
        }
        // 添加至选单
        this.menuItems = table_data;

        console.log("sss" + this.menuItems);
      });
    },
    handleSearch(key, page, pageSize) {
      this.getMenuData(key,page,pageSize)
      // 查询事件
    },
    addRecommend() {
      this.haveSearch = false;
      this.menuVisiable = true;
      this.menuTitle = "推荐加入";
    },
    addMyself() {
      this.haveSearch = true;
      this.menuVisiable = true;
      this.menuTitle = "手动加入";
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
        fans_avg = parseInt((fans.pop().value - fans[0].value) / fans.length);
        item_.mid = item.mid;
        item_.profile = this.return_profile(uploader.profile);
        item_.nickname = uploader.nickName;
        item_.rank = 1;
        item_.fans = uploader.follower;
        item_.fans_rate = fans_avg;
        item_.video_publish = uploader.videoCount;
        item_.latest_watch = latest_video;
        // 判断是否本机
        if (item.mid === this.mind_mid.mid) {
          item_.isOri = true;
        } else {
          item_.isOri = false;
        }
        // 加入竞品列表
        this.tableData.push(item_);
      });
    },
    handleConfirm(mid,index) {
      console.log(mid)
      var list = this.$refs.uploaderMenu.item_id_list
      var list_index = list.indexOf(mid)
      list.splice(list_index,1)
      console.log(list)
      this.tableData.splice(index, 1);
    },
    return_profile(url) {
      return "https://images.weserv.nl/?url=" + url;
    },

    ////////////////////////////////////
    resetCrossDataUnit() {
      return {
        title_text: "粉丝增长变化",
        legend: [],
        x_axis: [],
        series: []
      };
    },
    resetCrossDataUnitSeries() {
      return {
        name: "",
        type: "line",
        stack: "总量",
        areaStyle: {},
        data: []
      };
    },
    // cross数据显示切换
    crossTabsHandleClick(tab, event) {
      var index = tab.index;
      var label = tab.label;
      var type = tab.name;
      this.cross_option.current_option.key = type;
      this.cross_option.current_option.name = label;
      this.addToCross(this.competing_mid_list, type, 7);
    },
    //选单切换页面
    menuPageChange(page) {
      this.menu_pagination.page = page;
      this.search_competing("UPDATE");
    },
    // 添加cross
    addToCross(mid, type, limit) {
      var params = qs.stringify(
        {
          mids: mid,
          type: type,
          limit: limit
        },
        { indices: false }
      );
      getCompetingOnesData(params).then(response => {
        var data = response["data"]["list"];
        if (data != null) {
          var legend = [];
          // 以第一个的横坐标为准
          var data_flag = false;
          var x_axis = [];
          var series = this.resetCrossDataUnitSeries();
          var series_list = [];
          var $this = this;
          this.competing_mid_list.forEach(function(item, index) {
            // 遍历每个mid
            legend.push(item);
            series.name = item;
            if (index == 0) {
              data_flag = true;
            } else {
              data_flag = false;
            }
            // 获取具体数据
            data[item].forEach(function(item, index) {
              if (data_flag) {
                x_axis.push(item.name);
              }
              series.data.push(item.value);
            });
            console.log(series);
            series_list.push(series);
            series = $this.resetCrossDataUnitSeries();
          });

          this.cross_data_unit.legend = legend;
          this.cross_data_unit.x_axis = x_axis;
          this.cross_data_unit.series = series_list;
          // console.log(this.cross_data_unit)
          // 添加到指定选项数据中
          this.cross_data[type] = this.cross_data_unit;
        } else {
          // 数据为空时
        }
      });
    },
    // 查询竞品
    search_competing(type) {
      // pagination状态清空
      if (type != "UPDATE") {
        this.menu_pagination.page = 1;
        (this.menu_pagination.pageSize = 6),
          (this.menu_pagination.totalSize = 0);
      }

      getCompetingUploader(
        this.menu_option.search_input,
        this.menu_pagination.page,
        this.menu_pagination.pageSize
      ).then(response => {
        // 先将menu列表清空
        this.menu_list = [];
        // 将数据更新到menu中
        var data = response["data"];
        const table_data = [];
        // let flag = true
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            // 如果是本机那么就不用添加
            if (data[key].userId === this.mind_mid.mid) {
              continue;
            }
            let add_table_item = {};
            add_table_item.name = data[key]["nickName"];
            add_table_item.mid = data[key].userId;
            add_table_item.profile =
              "https://images.weserv.nl/?url=" + data[key].profile;
            add_table_item.name = data[key].nickName;
            add_table_item.abstract = data[key].sign;
            // 判断是否已经添加至竞品列表
            if (this.menu_mid_list.indexOf(add_table_item.mid) != -1) {
              add_table_item.status = false;
            } else {
              add_table_item.status = true;
            }
            // 加入到竞品列表检测名单中
            table_data.push(add_table_item);
          }
        }
        // 添加至选单
        this.menu_list = table_data;
        // 更新menu的总数
        this.menu_pagination.totalSize = 50;
      });
    },
    // 验证是否已添加竞品
    isInAddList(mid) {
      var items = this.menu_mid_list;
      if (items.length === 0) {
        return true;
      } else {
        let flag = null;
        items.forEach(function(i, index) {
          if (i === mid) {
            console.log(mid);
            // console.log(mid)
            flag = false;
            return false;
          } else {
            flag = true;
            return true;
          }
        });
        return flag;
      }
      // console.log(flag)
      // return flag;
    },
    // initCross() {
    //   fansChange(this.mid, 7).then(response => {
    //     var data = response["data"];
    //     this.fansCrossData.legend.push(this.name);
    //     this.fansSeries.name = this.name;

    //     for (let item of Object.values(data["fans"]["series_data"])) {
    //       var { name, value } = item;
    //       this.fansCrossData.x_axis.push(name);
    //       this.fansSeries.data.push(value);
    //     }
    //     this.fansCrossData.series.push(this.fansSeries);
    //   });
    // },
    
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