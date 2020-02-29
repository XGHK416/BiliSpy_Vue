<template>
  <div>
    <!-- @sort-change="sortChange" -->
    <!-- :class-name="getSortClass('id')" -->

    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="Title"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.importance"
        placeholder="Imp"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <!-- <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" /> -->
      </el-select>
      <el-select
        v-model="listQuery.type"
        placeholder="Type"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <!-- <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />-->
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <!-- <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />-->
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >Search</el-button>
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
          <a :href="return_href(row.userId)">
          <el-avatar shape="square" :src="return_profile(row.profile)"></el-avatar>
            <div>
              {{ row.nickName}}
            </div>
            </a>
        </template>
      </el-table-column>
      <el-table-column label="性别"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="等级" align="center">
        <template slot-scope="{row}">
            <img :src="return_level(row.level)" style="max-height:18px">
        </template>
      </el-table-column>
      <el-table-column label="粉丝" >
        <template slot-scope="{row}">
          <!-- <svg-icon
            v-for="n in + row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          /> -->
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
          <span v-else>0</span> -->
          <span>{{row.following}} 人</span>
        </template>
      </el-table-column>
      <el-table-column label="视频数" align="center">
        <template slot-scope="{row}">
          <span>{{row.videoCount}} 个</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" plain @click="collection(row.userId)">收藏</el-button>
          <el-button type="success" size="mini" plain @click="info(row.userId)">查看</el-button>
        </template>
        
      </el-table-column>
    </el-table>
    <pagination></pagination>
    <!-- <button @click="hreftwo" class="test-one">点我到第二个页面</button> -->
  </div>
</template>
<script>
import Pagination from "@/components/Pagination"
import {getUploaderList} from "@/api/uploaderAna"

export default {
  name: "UploaderTable",
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      //   选项一
      importanceOptions: [1, 2, 3],
      // 选项二
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      //   选项三
      statusOptions: ["published", "draft", "deleted"],
      //   隐藏列选项
      showReviewer: false,

      //   编辑
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published"
      },
      //   对话框是否显示
      dialogFormVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    info(userId){
      let url = '/dataTable/uploaderInfo/'+userId
      this.$router.push({ path: url });
    },
    return_level(name) {
      return require('@/assets/level/'+name+'.png')
    },
    return_profile(url) {
      return 'https://images.weserv.nl/?url='+url
    },
    return_href(uid) {
      return 'https://space.bilibili.com/'+uid
    },
    //跳转页面
    hreftwo() {
      this.$router.push({ path: "/dataTable/uploaderInfo/33223" });
    },
    getList() {
      getUploaderList(this.listQuery.page,this.listQuery.pageSize).then(response => {
        this.list = response['data']
        this.listLoading= false
      })
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    }
  }
};
</script>
<style scoped>
 .table{
  padding: 32px;
  padding-bottom: 0;
  background-color: rgb(240, 242, 245);
 }
 .filter-container{
  padding: 32px 32px 0 32px;
  background-color: rgb(240, 242, 245);
 }
</style>