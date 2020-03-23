<template>
  <div>
    <el-table :data="tableData" style="width: 100%" :show-header="false">
      <el-table-column width="90">
        <template slot-scope="scope">
          <div style="margin-left: 10px;color:#666;height:60px;line-height:60px">
            <span style="font-size:45px">{{scope.$index+1}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <!-- <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
          </el-popover>-->
          <list-item :row="scope.row"></list-item>
        </template>
      </el-table-column>
      <el-table-column width="90">
        <template slot-scope="scope">
          <div style="text-align: right;">
            <el-button
              size="medium"
              type="info"
              plain
              @click="handlePreView(scope.$index, scope.row)"
            >查看</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <info-card :visible="card_visible" @handleClose="handleCardClose">

    </info-card>
  </div>
</template>

<script>
import ListItem from "./ListItem";
import InfoCard from "../InfoCard/index";
import { getRank } from "@/api/hot_bili";
import table from "../../../../mock/table";
import $bus from "@/utils/eventBus";
export default {
  name: "SectionList",
  components: {
    ListItem,
    InfoCard,

  },
  data() {
    return {
      section_id: 0,
      day: 3,
      tableData: [],

      card_visible:false,
    };
  },
  watch: {
    section_id(val) {
      this.getRankList(this.section_id, this.day);
    }
  },
  created() {
    this.getRankList(this.section_id, this.day);
    $bus.$on("handleSectionChange", tid => {
      this.section_id = tid;
    });
  },

  methods: {
    handlePreView(index, item) {
      this.card_visible = true
    },
    handleCardClose(){
      this.card_visible = false
    },
    getRankList(section_id, day) {
      this.tableData = [];
      getRank(section_id, day).then(response => {
        var table_item = {};
        var list = response.data.list;
        list.forEach(element => {
          table_item.title = element.title;
          table_item.profile = element.pic;
          ///评论和播放处理
          if (element.video_review / 10000 > 1) {
            table_item.metric_view = (element.play / 10000).toFixed(1);
          } else {
            table_item.metric_view = element.play;
          }
          if (element.video_review / 10000 > 1) {
            table_item.metric_comment = (element.video_review / 10000).toFixed(
              1
            );
          } else {
            table_item.metric_comment = element.video_review;
          }
          ////
          table_item.metric_auth = element.author;
          table_item.score = element.pts;
          this.tableData.push(table_item);
          table_item = {};
        });
      });
    }
  }
};
</script>

<style lang='scss' scope>
</style>