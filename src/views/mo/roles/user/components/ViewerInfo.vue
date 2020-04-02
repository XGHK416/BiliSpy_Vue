<template>
  <div>
    <el-dialog title :visible.sync="dialogVisible" width="45">
      <div class="container">
        <el-row>
          <el-col :span="5">
            <el-avatar :size="170" :src="info.base_info.profile" shape="square"></el-avatar>
          </el-col>
          <el-col :span="1">
            <div >
              <el-tag v-if="info.base_info.role=='manager'" type="primary">管理者</el-tag>
              <el-tag v-else-if="info.base_info.role=='admin'" type="success">监督者</el-tag>
              <el-tag v-else type="info">浏览者</el-tag>
              <el-tag v-if="info.base_info.usable=='1'" type="success" effect="dark" style="margin-top:10px">正常</el-tag>
              <el-tag v-else type="warning" effect="dark" style="margin-top:10px">封禁中</el-tag>
              <el-tag v-if="info.base_info.isCold==1" type="warning" effect="dark" style="margin-top:10px">冻结</el-tag>
            </div>
          </el-col>
          <el-col :span="10" :offset="7">
            <div class="info-left-wrapper">
              <div>
                <span>名字：</span>
                {{info.base_info.nickName}}
              </div>
              <div>
                <span>id：</span>
                {{info.base_info.userId}}
              </div>
              <div>
                <span>电话：</span>
                {{info.auths.phone}}
              </div>
              <div>
                <span>邮箱：</span>
                {{info.auths.email}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class="operation-wrapper">
          <div class="head">
            <el-date-picker
              v-model="time_filter"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @change="selectChange"
            ></el-date-picker>
          </div>

          <div class="contain">
            <el-table ref="filterTable" :data="tableData" style="width: 100%" height="600">
              <el-table-column prop="create_time" label="日期" column-key="create_time"></el-table-column>
              <el-table-column prop="operate_type" label="操作业务"></el-table-column>
              <el-table-column prop="context" label="具体操作"></el-table-column>
              <!-- <el-table-column
                prop="operate_level"
                label="标签"
                width="100"
                :filters="[{ text: '1级', value: '1' }, { text: '2级', value: '2' },{ text: '3级', value: '3' },{ text: '4级', value: '4' },{ text: '5级', value: '5' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <el-tag :type="tagType(scope.row.operate_level)" disable-transitions>{{scope.row.operate_level+'级'}}</el-tag>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getViewerOperate } from "@/api/mo_manager";
import { parseTime } from "@/utils/index";
export default {
  name: "Info",
  props: {
    info: {
      type: Object,
      required: true
    },
    currentId: {
      type: String,
      required: true
    }
  },
  watch: {
    currentId(value) {
      var date = parseTime(Date.now(), "{y}-{m}-{d}");
      getViewerOperate(value, this.user_id, date).then(response => {
        this.tableData = response.data;
      });
    }
  },
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      time_filter: "",
      dialogVisible: false,
      tableData: []
    };
  },
  methods: {
    selectChange() {
      getViewerOperate(this.currentId, this.user_id, this.time_filter).then(
        response => {
          this.tableData = response.data;
        }
      );
    },
    filterTag(value, row) {
      return row.operate_level === value;
    },
    tagType(tag) {
      switch (tag) {
        case "1":
          return "info";
          break;
        case "2":
          return "success";
          break;
        case "3":
          return "warning";
          break;
        case "4":
          return "danger";
          break;
        case "5":
          return "primary";
          break;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.container {
  .info-left-wrapper {
    
    font-size: 20px;
    color: #666;
    div {
      margin-bottom: 15px;
      border-bottom: 1px solid #e6e6e6;
    }
    span {
      font-weight: bold;
    }
    .status-introduce {
      margin-top: 5px;
      padding: 5px 10px;
      min-height: 70px;
      border-radius: 5px;
      border: 1px solid #e6e6e6;
    }
  }
  .operation-wrapper {
    .head {
      height: 50px;
      padding: 5px;
      border-bottom: none;
    }
    .contain {
      // max-height: 500px;
      border: 1px solid #e6e6e6;
    }
  }
}
</style>