<template>
  <div>
    <!-- @sort-change="sortChange" -->
    <!-- :class-name="getSortClass('id')" -->

    <div class="filter-container">
      <FilterSection :data="data" style="padding:10px;border-bottom:1px solid rgb(240, 242, 245);"
        @handleSelectChange="handleSelectChange"
      ></FilterSection>
      <FilterDate style="padding:10px" :default-date="default_date"
        @handleDateChange="handleDateChange"
        ></FilterDate>
    </div>

    <el-table
      class="table"
      stripe
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" align="center" width="90">
        <template slot-scope="{$index}">
          <span>{{$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="up主" align="center">
        <template slot-scope="{row}">
          <a :href="return_href(row.mid)">
            <el-avatar shape="square" :src="return_profile(row.profile)"></el-avatar>
            <div>{{ row.nick_name}}</div>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="等级" align="center">
        <template slot-scope="{row}">
          <img :src="return_level(row.level)" style="max-height:18px" />
        </template>
      </el-table-column>
      <el-table-column label="粉丝">
        <template slot-scope="{row}">
          <!-- <svg-icon
            v-for="n in + row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />-->
          <span>{{ row.follower }} 人</span>
        </template>
      </el-table-column>
      <el-table-column label="关注" align="center">
        <template slot-scope="{row}">
          <!-- <span
            v-if="row.pageviews"
            class="link-type"
            @click="handleFetchPv(row.pageviews)"
          >{{ row.pageviews }}</span>
          <span v-else>0</span>-->
          <span>{{row.following}} 人</span>
        </template>
      </el-table-column>
      <el-table-column label="视频数" align="center">
        <template slot-scope="{row}">
          <span>{{row.video_num}} 个</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" plain @click="collection(row.mid)">收藏</el-button>
          <el-button type="success" size="mini" plain @click="info(row.mid)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        class="pagination"
        :current-page="current_page"
        :page-size="20"
        layout=" prev, pager, next"
        background
        :page-count="5"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange"
      ></el-pagination>
    </div>
    <!-- <button @click="hreftwo" class="test-one">点我到第二个页面</button> -->
  </div>
</template>
<script>
import { getUploaderList,getMainSection } from "@/api/uploaderAna";
import FilterSection from "@/components/FilterSection/index";
import FilterDate from "@/components/FilterDate/index"

export default {
  name: "UploaderTable",
  components: { FilterSection,FilterDate },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
     
      ///////////////过滤
      default_date:new Date(Date.now()-24*60*60*1000),
      current_select:0,
      current_date:0,

      data: [
      ],
      ///////////////////分页
      current_page: 1,
      total: 20,
      listQuery: {
        page: 1,
        pageSize: 20,
      },
    };
  },
  created() {
    getMainSection().then(response=> {
      this.data = response['data']
    })
    this.current_date = this.formateDate(new Date(Date.now()-24*60*60*1000))
    this.getList();
  },
  methods: {
    //跳转页面
    info(userId) {
      let url = "/dataTable/uploaderInfo/" + userId;
      this.$router.push({ path: url });
    },
    return_level(name) {
      return require("@/assets/level/" + name + ".png");
    },
    return_profile(url) {
      return "https://images.weserv.nl/?url=" + url;
    },
    return_href(uid) {
      return "https://space.bilibili.com/" + uid;
    },

    getList() {
      this.listLoading = true
      getUploaderList(this.current_page, this.listQuery.pageSize,this.current_select,this.current_date).then(
        response => {
          this.list = response["data"];
          this.listLoading = false;
        }
      );
    },
    // 分页变化
    pageChange(page){
      this.current_page = page
      this.getList()
    },
    formateDate(date){
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      if (month<10){
        month = '0'+month
      }
      var new_date = [year,month,day].join('-');
      return new_date
    },
    // 日期筛选发生变化时
    handleDateChange(date){
      this.current_page=1
      this.current_date = date
      this.getList()
    },
    // 分区筛选发生变化时
    handleSelectChange(val){
      this.current_page=1
      this.current_select = val
      this.getList()
    }
  }
};
</script>
<style lang='scss' scoped>
.block {
  padding: 0 32px 20px 32px;
  height: 80px;
  background-color: rgb(240, 242, 245);
  .pagination {
    padding: 30px 0;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    background-color: #ffffff;
  }
}
.table {
  padding: 32px;
  padding-bottom: 0;
  background-color: rgb(240, 242, 245);
}
.filter-container {
  padding: 32px 32px 0 32px;
  background-color: rgb(240, 242, 245);
}
</style>