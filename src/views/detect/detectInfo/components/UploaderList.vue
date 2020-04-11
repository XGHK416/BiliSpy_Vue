<template>
  <div class="list-wrapper">
    <div class="filter-option">
      <div class="left-filter">
        <el-radio-group v-model="filter_option" @change="optionChange">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="1">未开始</el-radio-button>
          <el-radio-button :label="2">以开始</el-radio-button>
          <el-radio-button :label="3">已结束</el-radio-button>
        </el-radio-group>
      </div>
      <div class="right-filter">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="search_input" placeholder="按up主名称查找"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="list">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="detectId" label="id"></el-table-column>
        <el-table-column prop="detectName" label="监控对象"></el-table-column>
        <el-table-column prop="detectUploaderId" label="监控对象id"></el-table-column>
        <el-table-column label="监控对象头像">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.detectProfile"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="detectTimes" label="次数"></el-table-column>
        <!-- <el-table-column prop="state" label="状态"></!-->
        <el-table-column label="起始时间" width="400">
          <template slot-scope="scope">
            <font color="#f3904f">{{scope.row.startTime}}</font>
            —
            <font color="#f3904f">{{scope.row.endTime}}</font>
          </template>
        </el-table-column>
        <el-table-column label="侦测频率">
          <template slot-scope="scope">{{getRate_(scope.row.cornExpression)}} 分钟</template>
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="onInfo(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="page_size"
          @current-change="pageChange"
          @prev-click="pageChange"
          @next-click="pageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUploaderJobList } from "@/api/detect_info";
import { getRate } from "@/utils/cron";
import eventBus from '@/utils/eventBus'
export default {
  name: "UploaderList",
  data() {
    return {
      user_id: this.$store.state.user.user_id,

      search_input: "",
      filter_option: 0,
      detect_name:'',
      tableData: [],
      ////pagination
      total: 0,
      page_size: 18
    };
  },
  methods: {
    // 搜索
    onSearch(){
      this.getUploaderDetectList_(1,this.page_size,this.user_id,0,this.search_input)
      this.filter_option = 0
    },
    getRate_(cron) {
      return getRate(cron);
    },
    // 查看信息
    onInfo(row) {
      this.$emit("jumpToVideo",row.detectId)
    },
    getUploaderDetectList_(page, page_size, user_id, type,detect_name) {
      getUploaderJobList(page, page_size, user_id, type,detect_name).then(Response => {
        var { count, list } = Response.data;
        (this.total = count), (this.tableData = list);
      });
    },
    pageChange(page) {
      this.getUploaderDetectList_(
        page,
        this.page_size,
        this.user_id,
        this.filter_option,
        this.detect_name
      );
    },
    optionChange(label) {
      this.getUploaderDetectList_(1, this.page_size, this.user_id, label,this.detect_name);
    }
  },
  created() {
    // 获取全部侦测
    this.getUploaderDetectList_(
      1,
      this.page_size,
      this.user_id,
      this.filter_option,
      null,
    );
  }
};
</script>

<style lang='scss' scoped>
.filter-option {
  .left-filter {
    float: left;
  }
  .right-filter {
    float: right;
  }
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>