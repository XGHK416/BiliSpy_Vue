<template>
  <el-container class="favorite-wrapper">
    <el-aside width="250px">
      <favorite-side @handleSideSelect="handleSideSelect" @giveUploaderGroup="giveUploaderGroup" @giveVideoGroup="giveVideoGroup"></favorite-side>
    </el-aside>
    <el-container>
      <el-header style="height:48px">
        <div class="favorite-head-wrapper">
          <span>收藏夹</span>
        </div>
      </el-header>

      <el-main>
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
</template>

<script>
import FavoriteContent from "./components/favoriteContent";

import FavoriteSide from "./components/favoriteSide";
import { findFavoriteList } from "@/api/favorite";
export default {
  name: "Favorite",
  components: {
    FavoriteContent,
    FavoriteSide
  },
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      table_data: [],
      type: "uploader",

      table_data_type: "",
      table_data_group_id: "",

      videoGroup:[],
      uploaderGroup:[],
    };
  },
  methods: {
    giveVideoGroup(data){
      this.videoGroup = data
    },
    giveUploaderGroup(data){
      this.uploaderGroup=data
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
}
</style>