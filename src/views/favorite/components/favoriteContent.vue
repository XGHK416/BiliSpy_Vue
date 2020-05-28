<template>
  <div class="content-wrapper">
    <div class="content">
      <el-table
        class="table"
        stripe
        :key="tableKey"
        v-loading="listLoading"
        :data="tableData"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="id" align="center">
          <template slot-scope="{row}">
            <span>{{ row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="{row}">
            <span>{{ row.NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="{row}">
            <div>
              <img
                v-if="type=='uploader'"
                style="height:40px;min-width:40px"
                :src="row.avater"
                referrerpolicy="no-referrer"
                alt
              />
              <img
                v-else
                style="height:40px;width:75px"
                :src="row.avater"
                alt
                referrerpolicy="no-referrer"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="{row}">
            <span>{{row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{doParseTime(row.create_time)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" plain @click="cancle(row.favorite_id)">取消</el-button>
            <el-button type="success" size="mini" plain @click="info(row)">查看</el-button>
            <el-button type="warning" size="mini" plain @click="jumpTo(row)">跳转</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- dialog -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="favorite_form">
        <el-form-item label="选择加入分区">
          <el-select
            v-model="favorite_form.group_id"
            placeholder="请选择收藏夹区域"
            v-if="type=='uploader'"
          >
            <el-option
              v-for="item in uploaderGroup"
              :key="item.id"
              :label="item.groupName"
              :value="item.groupId"
            ></el-option>
          </el-select>
          <el-select v-model="favorite_form.group_id" placeholder="请选择收藏夹区域" v-else>
            <el-option
              v-for="item in videoGroup"
              :key="item.id"
              :label="item.groupName"
              :value="item.groupId"
            ></el-option>
          </el-select>
          <el-form-item label="备注">
            <el-input type="text" v-model="favorite_form.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index";
import { unFavorite, updateFavorite } from "@/api/favorite";
export default {
  name: "FavoriteContent",
  components: {},
  props: {
    tableData: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: "uploader"
    },
    uploaderGroup: {
      type: Array,
      default: []
    },
    videoGroup: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      favorite_form: {
        id: "",
        group_id: "",
        remark: ""
      },

      dialogFormVisible: false,

      jump_url: {
        video: "/dataTable/VideoInfo/",
        uploader: "/dataTable/uploaderInfo/"
      },

      tableKey: "",
      listLoading: false
    };
  },
  methods: {
    // getUploaderGroup(data) {
    //   console.log(data)
    //   this.uploader_group = data;
    // },
    // getVideoGroup(data) {
    //   this.video_group = data;
    // },
    jumpTo(row){
      if(row.type=="uploader")
      this.$router.push({
        name: "UploaderInfo",
        params: { id: row.id }
      });
      else{
         this.$router.push({
        name: "VideoInfo",
        params: { id: row.id }
      });
      }
    },
    doRefresh() {
      this.$emit("reflashDate");
    },
    doParseTime(time) {
      return parseTime(time, null);
    },
    return_href(uid) {
      return "https://space.bilibili.com/" + uid;
    },
    cancle(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          unFavorite(id).then(response => {
            this.doRefresh();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitForm() {
      var { id, group_id, remark } = this.favorite_form;
      if (group_id != "") {
        updateFavorite(id, group_id, remark).then(response => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialogFormVisible = false;
          this.$emit("reflashDate");
        });
      } else {
        this.$message({
          message: "请填写完整",
          type: "warning"
        });
      }
    },
    info(row) {
      this.favorite_form.id = row.favorite_id;
      this.dialogFormVisible = true;
    }
  },
  created() {
    //  this.$on("giveUploaderGroup", function(data) {
    //   console.log("sdf"+data);
    // });
    // this.$on("giveVideoGroup", function(data) {
    //   console.log(data);
    // });
  }
};
</script>

<style lang='scss' scope>
.content-wrapper {
  padding: 16px;
  .content {
    height: 1000px;
    background: #ffffff;
  }
}
</style>