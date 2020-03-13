<template>
  <div>
    <el-row>
      <el-col :span="12" :md="24">
        <el-button type="primary" @click="menuVisiable = true">测试选单</el-button>
      </el-col>
      <el-col :span="12" :md="24">
        <div>测试section</div>
        <FilterSection :data="data"></FilterSection>
      </el-col>
      <el-col :span="12" :md="24">
        <div>测试日期选择</div>
        <FilterDate></FilterDate>
      </el-col>
    </el-row>

    <UploaderMenue
      @handlePageChange="pageChange"
      @handleClose="handleClose"
      @handleSelect="handleSelect"
      @handleDiselect="handleDiselect"
      @handleSearch="handleSearch"
      :data="menuItem"
      :visiable.sync="menuVisiable"
      :totalPage="totalPage"
      :haveSearch="haveSearch"
    ></UploaderMenue>
  </div>
</template>

<script>
import UploaderMenue from "@/components/UploaderMenu/index";
import FilterSection from "@/components/FilterSection/index";
import FilterDate from "@/components/FilterDate/index"
export default {
  name: "test",
  components: {
    UploaderMenue: UploaderMenue,
    FilterSection: FilterSection,
    FilterDate:FilterDate
  },
  data() {
    return {
      /////////////////
      haveSearch: true,
      menuVisiable: false,
      title: "title",
      totalPage: 30,
      menuItemList: [
        [
          {
            mid: 1023222,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          },
          {
            mid: 1021322,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          },
          {
            mid: 1023322,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          },
          {
            mid: 10231122,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          }
        ],
        [
          {
            mid: 123222,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          },
          {
            mid: 121322,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          },
          {
            mid: 123322,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          },
          {
            mid: 1231122,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          }
        ],
        [
          {
            mid: 223222,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          },
          {
            mid: 221322,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          },
          {
            mid: 223322,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          },
          {
            mid: 2231122,
            profile:
              "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
            name: "明日方舟",
            abstract: "ss",
            isSelect: false
          }
        ]
      ],
      menuItem: [],
      ///////////////////
      data: [
        { name: "动漫", id: 1111 },
        { name: "动话", id: 1211 },
        { name: "动里", id: 1311 },
        { name: "动的", id: 1411 }
      ]
    };
  },
  created() {
    this.menuItem = this.menuItemList[0];
  },
  methods: {
    pageChange(page) {
      this.menuItem = this.menuItemList[page - 1];
      //   请求换页
    },
    handleClose() {
      this.menuVisiable = false;
    },
    handleSelect(item, list) {
      // 选中时的事件
      item.isSelect = true;
    },
    handleDiselect(item, list) {
      // 取消选中的事件
      item.isSelect = false;
    },
    handleSearch(key) {
      // 查询事件
    }
  }
};
</script>

<style>
</style>