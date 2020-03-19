<template>
  <div class="side-wrapper">
    <div class="side-head-wrapper">
      <span>分组管理</span>
    </div>
    <div class="side-content-wrapper">
      <!-- addbutton -->
      <div class="add-group" @click="dialogFormVisible = true">
        <div class="icon-wrapper icon-add" style="display: inline;">
          <svg-icon icon-class="add" class-name="add-icon" />
        </div>
        <span>添加分组</span>
      </div>
      <!-- menu -->
      <div class="menu-wrapper">
        <el-menu
          default-active="uploaderUnclassified"
          class="el-menu-vertical-demo"
          @select="handleSelect"
        >
          <el-submenu index="uploader">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>up主</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="uploaderUnclassified">全部</el-menu-item>
              <el-menu-item
                v-for="item in uploaderGroup"
                :key="item.groupId"
                :index="item.groupId"
              >{{item.groupName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="video">
            <template slot="title">
              <i class="el-icon-film"></i>
              <span>视频</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="videoUnclassified">全部</el-menu-item>
              <el-menu-item
                v-for="item in videoGroup"
                :key="item.groupId"
                :index="item.groupId"
              >{{item.groupName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog title="新增收藏夹" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="group_form">
        <el-form-item label="收藏夹名">
          <el-input v-model="group_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收藏夹区域">
          <el-select v-model="group_form.type" placeholder="请选择收藏夹区域">
            <el-option label="视频" value="video"></el-option>
            <el-option label="up主" value="uploader"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findFavoriteGroup, addGroup } from "@/api/favorite";
export default {
  name: "FavoriteSide",
  components: {},
  data() {
    return {
      user_id: this.$store.state.user.user_id,

      current_type: "uploader",
      current_group: "uploaderUnclassified",
      uploaderGroup: [],
      videoGroup: [],
      ////dialog
      dialogFormVisible: false,
      group_form: {
        name: "",
        type: ""
      }
    };
  },
  methods: {
    handleSelect(index, indexPath) {
      var type = indexPath[0];
      var groupId = indexPath[1];
      this.$emit("handleSideSelect", [type, groupId]);
    },
    findUploaderGroup() {
      findFavoriteGroup(this.user_id, "uploader").then(response => {
        this.uploaderGroup = response.data;
        this.$emit("giveUploaderGroup", this.uploaderGroup);
      });
    },
    findVideoGroup() {
      findFavoriteGroup(this.user_id, "video").then(response => {
        this.videoGroup = response.data;
        this.$emit("giveVideoGroup", this.videoGroup);
      });
    },
    //dialog
    submitNewGroup() {
      var { name, type } = this.group_form;
      if (name != "" && type != "") {
        addGroup(this.user_id, type, name).then(response => {
          this.$message({
            message: "成功添加",
            type: "success"
          });
          if (type == "video") {
            this.findVideoGroup();
          } else {
            this.findUploaderGroup();
          }
          this.dialogFormVisible = false;
        });
      } else {
        this.$message({
          message: "请填写完整",
          type: "warning"
        });
      }
    }
  },
  created() {
    this.$emit("handleSideSelect", [this.current_type, this.current_group]);
    this.findUploaderGroup(), this.findVideoGroup();
  }
};
</script>

<style lang='scss' scope>
.side-wrapper {
  .side-head-wrapper {
    text-align: center;
    height: 48px;
    line-height: 48px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-top: 0;
  }
  .side-content-wrapper {
    padding: 16px;
    .add-group {
      text-align: center;
      line-height: 40px;
      height: 40px;
      background: #ffffff;
      border: 1px dashed #3b74ff;
      color: #3b74ff;
      cursor: pointer;
    }
    .menu-wrapper {
      margin-top: 15px;
      // padding-left: 5px;
      .menu-button {
        margin-left: 75px;
        height: 25px;
        width: 25px;
      }
    }
  }
}
</style>