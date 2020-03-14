<template>
  <div class="content-wrapper">
    <div class="cross-wrapper">
      <div>
        <el-tabs v-model="active_name" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in label_list"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <CrossChart :cross-data="cross_data" :current-data="active_name"></CrossChart>
    </div>
    <div class="recomment-wrapper">
      相关推荐
      <div class="recomment-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="title" label="标题" width="180"></el-table-column>
          <el-table-column prop="author" label="作者" width="180"></el-table-column>
          <el-table-column prop="section" label="分区"></el-table-column>
          <el-table-column prop="like" label="点赞"></el-table-column>
          <el-table-column prop="favorite" label="收藏"></el-table-column>
          <el-table-column prop="coins" label="投币"></el-table-column>
          <el-table-column prop="view" label="观看"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button type="success" size="mini" plain @click="info(row.aid)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import CrossChart from "@/components/CrossChart/index";
export default {
  name: "VideoInfoContent",
  components: {
    CrossChart: CrossChart
  },
  props: {
    // TabList: {
    //   type: Array,
    //   required: true
    // },
  },
  data() {
    return {
      ////////////////tab////////
      active_name: "",
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
      ///////////////////cross
      cross_data: {
        x_axis: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        view: {
          name: "邮件营销",
          type: "line",
          //   stack: "总量",
          areaStyle: {},
          smooth: false,
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        coins: {
          name: "联盟广告",
          type: "line",
          //   stack: "总量",
          smooth: false,
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        favorite: {
          name: "视频广告",
          type: "line",
          //   stack: "总量",
          smooth: false,
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        like: {
          name: "直接访问",
          type: "line",
          //   stack: "总量",
          smooth: false,
          areaStyle: {},
          data: [320, 332, 301, 334, 390, 330, 320]
        }
      },
      ////////////////table
      tableData: [
        {
          title: "123",
          author: "王小虎",
          section: "上海市普陀区金沙江路 1518 弄",
          like: 123,
          favorite: 123,
          coins: 42321,
          view: 541,
          aid: 1231
        },
        {
          title: "123",
          author: "王小虎",
          section: "上海市普陀区金沙江路 1518 弄",
          like: 123,
          favorite: 123,
          coins: 42321,
          view: 541,
          aid: 11111131
        },
        {
          title: "123",
          author: "王小虎",
          section: "上海市普陀区金沙江路 1518 弄",
          like: 123,
          favorite: 123,
          coins: 42321,
          view: 541,
          aid: 776
        },
        {
          title: "123",
          author: "王小虎",
          section: "上海市普陀区金沙江路 1518 弄",
          like: 123,
          favorite: 123,
          coins: 42321,
          view: 541,
          aid: 90
        }
      ]
    };
  },
  created() {
    this.active_name = this.label_list[0].name;
  },
  methods: {
    info(aid) {
      console.log(aid);
    },
    handleClick(tab, event) {
      var type = tab.name;
      this.active_name = type;
    }
  }
};
</script>

<style lang='scss' scope>
.content-wrapper {
  padding: 32px;
  background-color: #f0f2f5;
  .cross-wrapper {
    padding: 16px;
    background: #ffffff;
  }
  .recomment-wrapper {
    margin-top: 20px;
    padding: 16px;
    background: #ffffff;
  }
}
</style>