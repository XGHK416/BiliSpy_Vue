<template>
  <div>
    <div class="add-head-wrapper">
      <span>添加监控</span>
    </div>
    <div class="detect-add-wrapper">
      <div class="detect-add">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="up主侦测" name="uploader"></el-tab-pane>
          <el-tab-pane label="视频侦测" name="video"></el-tab-pane>
        </el-tabs>
      </div>
      <!-- !!!!!!!!!!!!! -->
      <div class="object-add-wrapper">
        <div class="object-option-wrapper border">
          <span style="font-size:15px;color:#666">添加侦测对象</span>
          <div class="object-list" v-if="object_list.length!=0">
            <el-tag
              :key="tag.name"
              v-for="tag in object_list"
              closable
              :disable-transitions="false"
              @close="handleCancleObject(tag)"
            >{{tag.name}}</el-tag>
          </div>
          <div class="add-option" @click="handleAdd" v-else>
            <svg-icon icon-class="add" class-name="add-icon"></svg-icon>
          </div>
        </div>
        <!-- ////////////// -->
        <div class="base-option-wrapper border">
          <div class="date-option-wrapper">
            <span style="font-size:15px;color:#666">选择时间</span>
            <div class="date-option">
              <el-date-picker
                v-model="date_select"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </div>
          <el-divider></el-divider>
          <!-- ---------- -->
          <div class="num-option-wrapper" v-if="activeName=='uploader'">
            <span style="font-size:15px;color:#666">视频统计</span>
            <div class="num-option">
              <el-radio-group v-model="num">
                <el-radio :label="1">前一条</el-radio>
                <el-radio :label="2">前两条</el-radio>
                <el-radio :label="3">前三条</el-radio>
                <el-radio :label="999">全部</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="rate-option-wrapper border">
          <span style="font-size:15px;color:#666">频率设置</span>
          <div class="rate-option">
            <el-radio-group v-model="rate">
              <el-radio :label="5">5分钟</el-radio>
              <el-radio :label="10">10分钟</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- //////////////////////////////// -->
        <div class="submit">
          <el-button type="primary" @click="handleDetect">确定</el-button>
        </div>
      </div>
    </div>
    <!-- 用户选单 -->
    <uploader-menu
      :max-select="1"
      :have-search="true"
      :data="menu_select_data"
      :total-page="total_page"
      :page-size="20"
      :visiable="uploader_menu_visible"
      @handleSelect="handleSelect"
      @handlePageChange="handlePageChange"
      @handleDiselect="handleDiselect"
      @handleClose="handleClose"
      @handleSearch="handleSearch"
    ></uploader-menu>
    <!-- 视频选单 -->
    <el-dialog title="视频选单" :visible.sync="video_menu_visible" width="25%" center>
      <div v-loading="video_loading">
        <el-input v-model="video_key" style="width:75%;margin-right:10px" placeholder="请输入bvid号"></el-input>
        <el-button type="primary" @click="selectVideo">查询</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getVideoDetectInfo, addJob, getUploaderList,getUploader } from "@/api/detect_add";
import { generateCron } from "@/utils/cron";
import UploaderMenu from "@/components/UploaderMenu/index";
export default {
  name: "DetectAdd",
  components: {
    UploaderMenu
  },
  data() {
    return {
      activeName: "uploader",
      // ///////////
      object_list: [],
      date_select: [],
      num: 1,
      rate: 5,
      //   日期禁用
      pickerOptions: {
        disabledDate(time) {
          // console.log(time.getTime()>this.limit_date.getTime())
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      ////////////
      // 查询选单
      total_page: 0,
      uploader_menu_visible: false,
      video_menu_visible: false,
      video_key: "",
      video_loading: false,
      // 查询的结果
      menu_select_data: []
    };
  },
  created(){
    var type = this.$route.params.type;
    var id = this.$route.params.id;
    if(id!=undefined){
      var params = "mid="+id
      getUploader(params).then(Response=>{
        var data = Response.data
        var item_ = {
          name:data.name,
          id:data.mid,
          profile: "https://images.weserv.nl/?url=https:" +data.face
        }
        this.object_list.push(item_)

      })
    }
    this.activeName = type
  },
  methods: {
    // 提交申请
    handleDetect() {
      if (this.object_list.length == 0 || this.date_select.length == 0) {
        this.$message({
          message: "请完整填写信息",
          type: "warning"
        });
      } else {
        var cron = generateCron(this.rate);
        var jobInfo = {
          userId: this.$store.state.user.user_id,
          jobType: this.activeName + "Job",
          cornExpression: cron,
          detectObject: this.object_list[0].name,
          detectObjectId: this.object_list[0].id,
          detectObjectProfile: this.object_list[0].profile,
          detectTime: this.num,
          duringDate: this.date_select[0] + "," + this.date_select[1]
        };
        if("videoJob"==jobInfo.jobType){
          jobInfo.auths=this.object_list[0].auths,
          jobInfo.auths_id=this.object_list[0].auths_id
          jobInfo.auths_profile=this.object_list[0].auths_profile
        }
        addJob(jobInfo).then(Response => {});
      }
    },

    // 选择切换
    handleClick() {
      this.object_list = [];
    },

    handleAdd() {
      // 打开添加列表
      if (this.activeName == "uploader") {
        this.uploader_menu_visible = true;
      } else {
        this.video_menu_visible = true;
      }
    },
    handleCancleObject(tag) {
      //取消选择
      this.object_list.splice(this.object_list.indexOf(tag), 1);
    },

    // ---查询选单--用户
    handlePageChange(input, page, page_size) {
      var params = "page=" + page + "&keyword=" + input;
      this.getUploaderList_(params);
    },
    // 选择
    handleSelect(item, id_list, index) {
      var item_ = {
        name: item.name,
        id: item.mid,
        profile: item.profile
      };
      this.object_list.push(item_);
    },
    // 取消选择
    handleDiselect(item, id_list, index) {
      this.object_list.splice(this.object_list.indexOf(item), 1);
    },
    // 关闭
    handleClose() {
      if (this.activeName == "uploader") {
        this.uploader_menu_visible = false;
      } else {
        this.video_menu_visible = false;
      }
    },
    // 搜索
    handleSearch(input, page, page_size) {
      var params = "page=" + page + "&keyword=" + input;
      this.getUploaderList_(params);
    },
    getUploaderList_(params) {
      getUploaderList(params).then(Response => {
        this.menu_select_data = [];
        var item = {};
        this.total_page = Response.data.numResults;
        Response.data.result.forEach(element => {
          item.name = element.uname;
          item.mid = element.mid;
          item.profile = "https://images.weserv.nl/?url=https:" + element.upic;
          item.abstract = element.usign;
          this.menu_select_data.push(item);
          item = {};
        });
      });
    },

    // ---查询选单--视频
    selectVideo() {
      if (this.video_key == "") {
        this.$message({
          message: "请输入信息",
          type: "warning"
        });
      } else if (this.object_list > 0) {
        this.$message({
          message: "目前仅支持一个哦",
          type: "warning"
        });
      } else {
        var params = "bvid=" + this.video_key;
        this.video_loading = true;
        getVideoDetectInfo(params).then(Response => {
          var item = {
            name: Response.data.title,
            id: Response.data.bvid,
            profile: Response.data.pic,
            auths: Response.data.owner.name,
            auths_id: Response.data.owner.mid,
            auths_profile: Response.data.owner.face
          };
          this.object_list.push(item);
          this.video_loading = false;
          this.video_menu_visible = false;
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.add-head-wrapper {
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
.detect-add-wrapper {
  padding: 32px;
  .detect-add {
    padding: 16px;
    background: #ffffff;
  }
  .object-add-wrapper {
    padding: 16px;
    background: #ffffff;
    .border {
      border: 1px solid #e8e8e8;
    }
    .object-option-wrapper {
      padding-left: 20px;
      height: 90px;
      line-height: 90px;
      position: relative;
      .el-tag + .el-tag {
        margin-left: 10px;
      }
      .object-list {
        display: inline-block;
        margin-left: 10px;
      }
      .add-option {
        text-align: center;
        color: #999;
        font-size: 20px;
        left: 130px;
        width: 180px;
        position: absolute;
        line-height: 70px;
        height: 70px;
        top: 50%;
        margin-top: -35px;
        border: 1px dashed #999;
        cursor: pointer;
        &:hover {
          border: #6fbbfe 1px dashed;
          color: #6fbbfe;
        }
      }
    }

    .base-option-wrapper {
      margin-top: 20px;
      padding: 16px;
      .date-option-wrapper {
        .date-option {
          margin-left: 20px;
          display: inline-block;
        }
      }
      .num-option-wrapper {
        .num-option {
          margin-top: 15px;
        }
      }
    }
    .rate-option-wrapper {
      padding: 16px;
      margin-top: 20px;
      .rate-option {
        margin-top: 15px;
      }
    }
    .submit {
      margin-top: 20px;
    }
  }
}
</style>