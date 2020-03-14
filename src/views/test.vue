<template>
  <div>
      <!-- <el-col :span="12" :md="24">
        <el-button type="primary" @click="menuVisiable = true">测试选单</el-button>
      </el-col>
      <el-col :span="12" :md="24">
        <div>测试section</div> -->
        <!-- <FilterSection :data="data"></!-->
      <!-- </el-col>
      <el-col :span="12" :md="24">
        <div>测试日期选择</div> -->
        <!-- <FilterDate></FilterDate> -->
      <!-- </el-col> -->
        <CrossChart :tab-list="label_list" :cross-data="cross_data"></CrossChart>

    <!-- <UploaderMenue
      @handlePageChange="pageChange"
      @handleClose="handleClose"
      @handleSelect="handleSelect"
      @handleDiselect="handleDiselect"
      @handleSearch="handleSearch"
      :data="menuItem"
      :visiable.sync="menuVisiable"
      :totalPage="totalPage"
      :haveSearch="haveSearch"
    ></UploaderMenue> -->
  </div>
</template>

<script>
// import UploaderMenue from "@/components/UploaderMenu/index";
// import FilterSection from "@/components/FilterSection/index";
// import FilterDate from "@/components/FilterDate/index";
import CrossChart from "@/components/CrossChart/index";
export default {
  name: "test",
  components: {
    // UploaderMenue: UploaderMenue,
    // FilterSection: FilterSection,
    // FilterDate: FilterDate,
    "CrossChart": CrossChart
  },
  data() {
    return {
      /////////////////
      // haveSearch: true,
      // menuVisiable: false,
      // title: "title",
      // totalPage: 30,
      // menuItemList: [
      //   [
      //     {
      //       mid: 1023222,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     },
      //     {
      //       mid: 1021322,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     },
      //     {
      //       mid: 1023322,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     },
      //     {
      //       mid: 10231122,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     }
      //   ],
      //   [
      //     {
      //       mid: 123222,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     },
      //     {
      //       mid: 121322,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     },
      //     {
      //       mid: 123322,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     },
      //     {
      //       mid: 1231122,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     }
      //   ],
      //   [
      //     {
      //       mid: 223222,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     },
      //     {
      //       mid: 221322,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     },
      //     {
      //       mid: 223322,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     },
      //     {
      //       mid: 2231122,
      //       profile:
      //         "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
      //       name: "明日方舟",
      //       abstract: "ss",
      //       isSelect: false
      //     }
      //   ]
      // ],
      // menuItem: [],
      // ///////////////////
      // data: [
      //   { name: "动漫", id: 1111 },
      //   { name: "动话", id: 1211 },
      //   { name: "动里", id: 1311 },
      //   { name: "动的", id: 1411 }
      // ],
      /////////////////chart
      label_list: [
        {
          name: "view",
          label: "观看"
        },
        {
          name: "favorite",
          label: "收藏"
        },
        {
          name: "coins",
          label: "硬币"
        },
        {
          name: "like",
          label: "点赞"
        }
      ],
      title_text: "视频详情",
      cross_data: {
        x_axis: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        view: {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        coins: {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        favorite: {
          name: "视频广告",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        like: {
          name: "直接访问",
          type: "line",
          stack: "总量",
          data: [320, 332, 301, 334, 390, 330, 320]
        }
      }
    };
  },
  created() {
    // this.menuItem = this.menuItemList[0];
  },
  methods: {
    // pageChange(page) {
    //   this.menuItem = this.menuItemList[page - 1];
    //   //   请求换页
    // },
    // handleClose() {
    //   this.menuVisiable = false;
    // },
    // handleSelect(item, list) {
    //   // 选中时的事件
    //   item.isSelect = true;
    // },
    // handleDiselect(item, list) {
    //   // 取消选中的事件
    //   item.isSelect = false;
    // },
    // handleSearch(key) {
    //   // 查询事件
    // }
  }
};
</script>

<style>
</style>