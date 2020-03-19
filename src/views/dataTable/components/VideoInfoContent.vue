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
          <el-table-column prop="title" label="标题" width="280"></el-table-column>
          <el-table-column prop="author" label="作者" width="280"></el-table-column>
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
import { getEvaluateInfo, getRecommend } from "@/api/videoAna";
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
      aid: this.$route.params["id"],
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
        x_axis: [],
        view: {
          type: "line",
          //   stack: "总量",
          areaStyle: {},
          smooth: false,
          data: []
        },
        coins: {
          type: "line",
          //   stack: "总量",
          smooth: false,
          areaStyle: {},
          data: []
        },
        favorite: {
          type: "line",
          //   stack: "总量",
          smooth: false,
          areaStyle: {},
          data: []
        },
        like: {
          type: "line",
          //   stack: "总量",
          smooth: false,
          areaStyle: {},
          data: []
        }
      },
      ////////////////table
      tableData: [
       
      ]
    };
  },
  created() {
    this.active_name = this.label_list[0].name;
    getRecommend(this.aid).then(response=>{
      var $this = this
      var table = []
      var table_item ={}
      response['data'].forEach(element => {
        if(element['video'].videoId==this.aid){
          return
        }
        table_item.title = element['video'].videoTitle
        table_item.author = element['video'].videoAuthor
        table_item.section = element['video'].tname
        table_item.like = element['video'].videoLike
        table_item.favorite = element['video'].videoFavorite
        table_item.coins = element['video'].coins
        table_item.view = element['video'].videoView
        table_item.aid = element['video'].videoId
        table.push(table_item)
        table_item={}
      });
      this.tableData = table
    })
    getEvaluateInfo(this.aid).then(response => {
      var item = {};
      var x_axis = [];
      var view_list = [],
        coins_list = [],
        favorite_list = [],
        like_list = [];
      response["data"].forEach(element => {
        view_list.push(element.video_view);
        coins_list.push(element.coins);
        like_list.push(element.video_like);
        favorite_list.push(element.video_favorite);
        x_axis.push(this.$moment(new Date(element.last_update)).format(
          "YYYY-MM-DD"
        ));
      });
      this.cross_data.view.data = view_list
      this.cross_data.coins.data = coins_list
      this.cross_data.favorite.data = favorite_list
      this.cross_data.like.data = like_list
      this.cross_data.x_axis = x_axis
    });
  },
  methods: {
    info(aid) {
      let url = "/dataTable/VideoInfo/" + aid;
      this.$router.push({ path: url });
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