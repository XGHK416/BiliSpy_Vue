<template>
  <div>
    <el-dialog title :visible.sync="dialogVisible" width="45">
      <div class="container">
        <el-row>
          <el-col :span="5">
            <el-avatar :size="170" :src="info.avatar" shape="square"></el-avatar>
          </el-col>
          <el-col :span="1">
            <div>
              <el-tag type="success" effect="dark">管理员</el-tag>
              <el-tag type="success" style="margin-top:5px">活跃</el-tag>
            </div>
          </el-col>
          <el-col :span="10" :offset="7">
            <div class="info-left-wrapper">
              <div>
                <span>名字：</span>
                {{info.name}}
              </div>
              <div>
                <span>id：</span>
                {{info.moid}}
              </div>
              <span>封禁情况:</span>
              <div class="status-introduce">表现正常</div>
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
              <el-table-column prop="date" label="日期" column-key="date"></el-table-column>
              <el-table-column prop="operation_service" label="操作业务"></el-table-column>
              <el-table-column prop="operation_content" label="具体操作"></el-table-column>
              <el-table-column
                prop="tag"
                label="标签"
                width="100"
                :filters="[{ text: '1级', value: '1级' }, { text: '2级', value: '2级' },{ text: '3级', value: '3级' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <el-tag :type="tagType(scope.row.tag)" disable-transitions>{{scope.row.tag}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: {
    info: {
      type: Object,
      default: function() {
        return {
          name: "ssd",
          moid: "sd",
          avatar:
            "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        };
      }
    }
  },
  data() {
    return {
      time_filter: "",
      dialogVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          operation_service: "登录",
          operation_content: "在厦门市登录",
          tag: "3级"
        },
        {
          date: "2016-05-02",
          operation_service: "登录",
          operation_content: "在厦门市登录",
          tag: "1级"
        },
        {
          date: "2016-05-02",
          operation_service: "登录",
          operation_content: "在厦门市登录",
          tag: "2级"
        },
        {
          date: "2016-05-02",
          operation_service: "登录",
          operation_content: "在厦门市登录",
          tag: "3级"
        }
      ]
    };
  },
  methods: {
    selectChange() {
      console.log(this.time_filter);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    tagType(tag) {
      switch (tag) {
        case "1级":
          return "success";
          break;
        case "2级":
          return "warning";
          break;
        case "3级":
          return "danger";
          break;
        default:
          return "info";
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
    div:not(:last-child) {
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
      border: 1px solid #e6e6e6;
    }
  }
}
</style>