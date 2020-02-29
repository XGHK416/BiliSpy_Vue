<template>
  <div class="competing-wrapper">
    <div class="competing-table-wrapper">
      <span>核心数据对比</span>
      <el-table :data="tableData" stripe style="width: 100%" script>
        <el-table-column label="up主" align="center">
          <template slot-scope="{row}">
            <el-avatar shape="square" :src="row.profile"></el-avatar>
            <div>{{ row.nickname}}</div>
          </template>
        </el-table-column>
        <el-table-column label="粉丝数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.fans }}</span>
          </template>
        </el-table-column>
        <el-table-column label="粉丝增长率" align="center">
          <template slot-scope="{row}">
            <span>{{ row.fans_rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="视频数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.video_publish }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平均视频观看人数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.avage_watch }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-tag type="danger" v-if="row.isOri" size="small">本体</el-tag>
            <el-popconfirm v-else title="这是一段内容确定删除吗？" @onConfirm="test">
              <el-button type="info" plain size="small" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="option-panel-wrapper">
        <div class="option-panel">
          <el-tooltip class="item" effect="dark" content="有系统推荐与之相类似的up主" placement="left-start">
            <el-button type="success" plain>推荐加入</el-button>
          </el-tooltip>
          <el-button type="info" plain>手动添加</el-button>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="competing-cross-wrapper">
      每日对比
      <CrossChart></CrossChart>
    </div>
  </div>
</template>

<script>
import CrossChart from "../../baseAnalysis/components/CrossChart";
export default {
  name: "Competing",
  components: {
    CrossChart: CrossChart
  },
  data() {
    return {
      tableData: [
        {
          profile:
            "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
          nickname: "明日方舟官方",
          fans: 2222,
          video_publish: 290,
          //   粉丝增长率
          fans_rate: 29000,
          //   视频平均观看人数
          avage_watch: 212,
          isOri: true
        },
        {
          profile:
            "https://xghk416.oss-cn-beijing.aliyuncs.com/BiliSpy/userProfile/user1.png",
          nickname: "明日方舟官方",
          fans: 2222,
          video_publish: 290,
          //   粉丝增长率
          fans_rate: 29000,
          //   视频平均观看人数
          avage_watch: 212,
          isOri: false
        }
      ]
    };
  },
  methods: {
    test() {
      this.$message({
        message: "success",
        type: "success"
      });
    }
  }
};
</script>

<style lang="scss" scope>
.option-panel-wrapper {
  position: relative;
  text-align: center;
  padding: 30px 200px;
}
.competing-cross-wrapper {
  padding-top: 50px;
}
</style>