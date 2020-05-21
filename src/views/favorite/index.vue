<template>
  <div>
    <el-container class="favorite-wrapper">
      <el-aside width="250px">
        <favorite-side
          ref="favorite_side"
          @handleSideSelect="handleSideSelect"
          @giveUploaderGroup="giveUploaderGroup"
          @giveVideoGroup="giveVideoGroup"
        ></favorite-side>
      </el-aside>
      <el-container>
        <el-header style="height:48px">
          <div class="favorite-head-wrapper">
            <span>收藏夹</span>
          </div>
        </el-header>

        <el-main style="background: #f1f2f6;">
          <div class="manage-favorites" style="text-align:right;padding-right:16px">
            <el-button type="primary" @click="handleManager()">管理收藏夹</el-button>
          </div>
          <favorite-content
            :table-data="table_data"
            :type="type"
            @reflashDate="reflashDate"
            :uploader-group="uploaderGroup"
            :video-group="videoGroup"
          ></favorite-content>
        </el-main>
      </el-container>
    </el-container>

    <!-- 修改收藏dialog -->
    <el-dialog title="管理收藏夹" :visible.sync="managerDialog" width="40%">
      <div>
        <el-radio-group
          v-model="managerOption"
          size="medium"
          class="manager_option"
          @change="handleManagerOptionChange"
        >
          <el-radio-button label="video">视频收藏</el-radio-button>
          <el-radio-button label="uploader">up主收藏</el-radio-button>
        </el-radio-group>
        <div class="managerTable">
          <el-table :data="managerData" style="width: 100%">
            <el-table-column prop="groupName" label="收藏名"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div style="text-align:right">
                  <el-button type="success" @click="handleChangeName(scope.row,scope.$index)">改名</el-button>
                  <el-popover placement="top" :ref="scope.$index">
                    <p>确定删除吗？删除后改收藏夹内容将以并删除</p>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="scope._self.$refs[scope.$index].doClose()"
                      >取消</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="scope._self.$refs[scope.$index].doClose();comfirmDelete(scope.row,scope.$index)"
                      >确定</el-button>
                    </div>
                    <el-button type="warning" slot="reference">删除</el-button>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="managerDialog = false">取 消</el-button>
        <el-button type="primary" @click="managerDialog = false">确 定</el-button>
      </div>
      <el-dialog append-to-body title="新收藏名" :visible.sync="newGroupNameDialog" width="25%">
        <div>
          <el-input v-model="newGroupName" placeholder="新收藏名" style="width:85%"></el-input>
          <el-button type="primary" style="width:14%" @click="submitNewName()">提交</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import FavoriteContent from "./components/favoriteContent";

import FavoriteSide from "./components/favoriteSide";
import { findFavoriteList, updateGroup, cancelGroup } from "@/api/favorite";
export default {
  name: "Favorite",
  components: {
    FavoriteContent,
    FavoriteSide
  },
  data() {
    return {
      // 收藏夹管理
      managerDialog: false,
      managerOption: "video",
      managerData: [],
      newGroupNameDialog: false,
      newGroupName: "",
      new_name_item: {},

      user_id: this.$store.state.user.user_id,
      table_data: [],
      type: "uploader",

      table_data_type: "",
      table_data_group_id: "",

      videoGroup: [],
      uploaderGroup: []
    };
  },
  methods: {
    giveVideoGroup(data) {
      this.videoGroup = data;
    },
    giveUploaderGroup(data) {
      this.uploaderGroup = data;
    },

    // 打开管理
    handleManager() {
      this.managerDialog = true;
      this.managerData = this.$refs.favorite_side.videoGroup;
    },
    // 切换管理收藏夹dialog
    handleManagerOptionChange() {
      if (this.managerOption == "video") {
        this.managerData = this.$refs.favorite_side.videoGroup;
      } else {
        this.managerData = this.$refs.favorite_side.uploaderGroup;
      }
    },
    // 确认删除
    comfirmDelete(row, index) {
      cancelGroup(row.groupId).then(Response => {
        if (this.managerOption == "video") {
          this.$refs.favorite_side.videoGroup.splice(index, 1);
        } else {
          this.$refs.favorite_side.uploaderGroup.splice(index, 1);
        }
        this.$message({
          message: "已删除",
          type: "success"
        });
      });
    },
    // 改名选项
    handleChangeName(row, index) {
      console.log(row);
      this.new_name_item = {
        name: row.groupName,
        id: row.groupId,
        index: index
      };

      this.newGroupNameDialog = true;
    },
    // 确认改名
    submitNewName() {
      updateGroup(this.new_name_item.id, this.newGroupName).then(Response => {
        this.$message({
          message: "已修改",
          type: "success"
        });
        if (this.managerOption == "video") {
          this.$refs.favorite_side.videoGroup[
            this.new_name_item.index
          ].groupName = this.newGroupName;
        } else {
          this.$refs.favorite_side.uploaderGroup[
            this.new_name_item.index
          ].groupName = this.newGroupName;
        }
      });
    },

    handleSideSelect(params) {
      this.table_data_type = params[0];
      this.table_data_group_id = params[1];
      if (
        this.table_data_group_id == "uploaderUnclassified" ||
        this.table_data_group_id == "videoUnclassified"
      ) {
        this.table_data_group_id = null;
      }
      findFavoriteList(
        this.user_id,
        this.table_data_type,
        this.table_data_group_id
      ).then(response => {
        this.table_data = response["data"];
        this.type = this.table_data_type;
      });
    },
    reflashDate() {
      findFavoriteList(
        this.user_id,
        this.table_data_type,
        this.table_data_group_id
      ).then(response => {
        this.table_data = response["data"];
        this.type = this.table_data_type;
      });
    }
  },
  created() {}
};
</script>

<style lang='scss' scope>
.favorite-wrapper {
  height: calc(100vh - 50px);
  border-top: 1px solid #e0e0e0;
}
.el-header {
  height: 48px;
  background-color: #ffffff;
  color: #333;
  line-height: 48px;
}

.el-aside {
  background: #ffffff;
  color: #333;
}

.el-main {
  color: #333;
  text-align: center;
  .manager_option {
    text-align: center;
    width: auto;
  }
}
</style>