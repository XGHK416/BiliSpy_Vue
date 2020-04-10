<template>
  <div style="background:#f1f2f6">
    <div class="details-head-wrapper">
      <span>监控详情</span>
    </div>
    <div style="padding:32px">
      <el-row :gutter="10">
        <el-col :span="21">
          <div class="details-wrapper">
            <div class="detect-info-wrapper">
              <span class="title">{{base_info.title}}</span>
              <div class="date-info">
                <span class="time publish-time">
                  发布时间：
                  <font color="#f3904f">{{base_info.pub_time}}</font>
                </span>
                <span class="time start-time">
                  开始时间：
                  <font color="#f3904f">{{base_info.start_detect_time}}</font>
                </span>
                <span class="time last-update">
                  最后更新：
                  <font color="#f3904f">{{base_info.last_detect_time}}</font>
                </span>
              </div>
              <!-- /////////////// -->
              <div class="detect-info">
                <el-row :gutter="10">
                  <el-col :span="6">
                    <div class="item view">
                      观看
                      <br />
                      <br />
                      <span>{{base_info.view}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item like">
                      点赞
                      <br />
                      <br />
                      <span>{{base_info.like}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item favorite">
                      收藏
                      <br />
                      <br />
                      <span>{{base_info.favorite}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="item coins">
                      投币
                      <br />
                      <br />
                      <span>{{base_info.coins}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!-- ////////////// -->
            <div class="detect-chart-wrapper">
              <div style="color:#666;font-weight: bold;">数据趋势分析</div>
              <div class="data-option">
                <el-radio-group v-model="option" size="medium">
                  <el-radio-button label="view">观看</el-radio-button>
                  <el-radio-button label="like">点赞</el-radio-button>
                  <el-radio-button label="coins">硬币</el-radio-button>
                  <el-radio-button label="favorite">收藏</el-radio-button>
                </el-radio-group>
              </div>
              <el-divider></el-divider>
              <cross-chart :cross-data="cross_data"></cross-chart>
            </div>
            <!-- ////////// -->
            <div class="detect-table-wrapper">
              <div style="color:#666;font-weight: bold;">数据趋势分析</div>
              <div class="detect-table">
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column label="序号" width="180">
                    <template slot-scope="scope">{{(current_page-1)*15+scope.$index+1}}</template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="日期"></el-table-column>
                  <el-table-column prop="videoView" label="观看"></el-table-column>
                  <el-table-column prop="videoLike" label="点赞"></el-table-column>
                  <el-table-column prop="videoCoins" label="硬币"></el-table-column>
                  <el-table-column prop="videoFavorite" label="收藏"></el-table-column>
                  <el-table-column prop="videoShare" label="转发"></el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination layout="prev, pager, next" :total="total_size" :page-size="15"
                  @current-change="pageChange"
                  @prev-click="pageChange"
                  @next-click="pageChange"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="auths-wrapper">
            <el-avatar
              shape="square"
              :size="170"
              :src="'https://images.weserv.nl/?url='+base_info.profile"
              referrerpolicy="no-referrer"
            ></el-avatar>
            <el-divider></el-divider>
            <div class="auths-name">{{base_info.name}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CrossChart from "@/views/detect/detectResult/components/CrossChart";
import {parseTime} from "@/utils/index"
import {getResultList,getVideoJogInfo} from "@/api/detect_info"
import {getVideoDetectInfo} from "@/api/detect_add"
export default {
  name: "DetectDetails",
  data() {
    return {
      detect_id: this.$route.params["id"],
      bvid:'',
      option: "view",
      base_info:{
        title:'',
        name:'',
        profile:'',
        pub_time:'',
        start_detect_time:'',
        last_detect_time:'',
        view:0,
        like:0,
        favorite:0,
        coins:0,


      },
      view_series:[],
      like_series:[],
      favorite_series:[],
      coins_series:[],
      cross_data: {
        title_text: "数据趋势分析表",
        x_axis:[],
        series: []
      },
      current_page:1,
      total_size:0,
      current_table_data:[],
      tableData: [
        {
          date: "2016-05-02",
          view: 1,
          like: 2231,
          coins: 13123,
          favorite: 43434,
          share: 2312312
        },
        {
          date: "2016-05-02",
          view: 1,
          like: 2231,
          coins: 13123,
          favorite: 43434,
          share: 2312312
        },
         {
          date: "2016-05-02",
          view: 1,
          like: 2231,
          coins: 13123,
          favorite: 43434,
          share: 2312312
        },
         {
          date: "2016-05-02",
          view: 1,
          like: 2231,
          coins: 13123,
          favorite: 43434,
          share: 2312312
        },
      ]
    };
  },
  components: {
    CrossChart
  },
  watch:{
    option(val){
      switch (val) {
        case 'view':
          this.cross_data.series = this.view_series
          break;
        case 'like':
          this.cross_data.series = this.like_series
          break;
        case 'favorite':
          this.cross_data.series = this.favorite_series
          break;
        case 'coins':
          this.cross_data.series = this.coins_series
          break;
      
        default:
          break;
      }
    }
  },
  methods: {
    pageChange(page){
      this.current_page = page
      if(page==Math.ceil(this.total_size/15)){
        this.tableData = this.current_table_data.slice((page-1)*15,this.current_table_data.length)
      }else{
        this.tableData = this.current_table_data.slice((page-1)*15,page*15)
        }
    }
  },
  created() {
    let index = this.detect_id.lastIndexOf('B')
    this.bvid = this.detect_id.substring(index,this.detect_id.length)
    getVideoDetectInfo('bvid='+this.bvid).then(Response=>{
      var data = Response.data
      this.base_info.title = data.title
      this.base_info.pub_time = parseTime(Date(data.pubdate))
      /////
      var owner = data.owner
      this.base_info.name = owner.name
      this.base_info.profile = owner.face
      /////
      var stat = data.stat
      this.base_info.view = stat.view
      this.base_info.like = stat.like
      this.base_info.coins = stat.coin
      this.base_info.favorite = stat.favorite
    })

    getResultList(this.detect_id).then(Response=>{
      var data = Response.data
      var last =  data[data.length-1]
      this.base_info.last_detect_time = last.createTime
      this.cross_data.x_axis=[]
      this.view_series=[],
      this.like_series=[],
      this.favorite_series=[],
      this.share_series=[],
      data.forEach(element => {
        this.cross_data.x_axis.push(element.createTime)
        this.view_series.push(element.videoView)
        this.like_series.push(element.videoLike)
        this.favorite_series.push(element.videoFavorite)
        this.coins_series.push(element.videoCoins)
      });
      this.cross_data.series = this.view_series
      /////
      this.total_size = data.length
      if(this.total_size<=15){
        this.tableData = data
      }else{
        this.current_table_data = data
        this.tableData = this.current_table_data.slice(0,15)
      }
    }),
    


    getVideoJogInfo(this.detect_id).then(Response=>{
      var data = Response.data
      this.base_info.start_detect_time = data.startTime 
    })

    
  }
};
</script>

<style lang='scss' scoped>
.details-head-wrapper {
  border-top: 1px solid #e8e8e8;
  background: #ffffff;
  height: 70px;
  line-height: 70px;
  text-align: left;
  span {
    color: #666;
    margin-left: 10px;
    font-size: 20px;
  }
}
.details-wrapper {
  .detect-info-wrapper {
    padding: 16px;
    background: #ffffff;
    .title {
      font-size: 25px;
      color: #666;
    }
    .date-info {
      margin-top: 25px;
      .time {
        margin-right: 60px;
        color: #999;
      }
    }
    .detect-info {
      margin-top: 45px;
      padding: 15px;
      .item {
        padding: 24px 0 0 24px;
        height: 98px;
        background: rgba(59, 116, 255, 0.02);
        border: 1px solid #dfe8ff;
        line-height: 20px;

        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
  }

  .detect-chart-wrapper {
    margin-top: 20px;
    padding: 16px;
    background: #ffffff;
    .data-option {
      margin-top: 15px;
    }
  }
  .detect-table-wrapper {
    margin-top: 20px;
    padding: 16px;
    background: #ffffff;
    .detect-table {
      margin-top: 20px;
      .pagination {
        margin-top: 15px;
        text-align: center;
      }
    }
  }
}

.auths-wrapper {
  padding: 16px;
  background: #ffffff;
  text-align: center;
  .auths-name {
    font-size: 20px;
    color: #666;
  }
}
</style>