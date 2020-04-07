<template>
  <div>
    <div class="add-head-wrapper">
      <span>添加监控</span>
    </div>
    <div class="detect-add-wrapper">
      <div class="detect-add">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="up主侦测" name="uploader">
          </el-tab-pane>
          <el-tab-pane label="视频侦测" name="video">
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- !!!!!!!!!!!!! -->
      <div class="object-add-wrapper">
        <div class="object-option-wrapper border">
          <span style="font-size:15px;color:#666">添加侦测对象</span>
          <div class="add-option">
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
              <el-radio :label="2">10分钟</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- //////////////////////////////// -->
        <div class="submit">
          <el-button type="primary">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetectAdd",
  components: {
    
  },
  data() {
    return {
      activeName: "uploader",
      // ///////////
      date_select: "",
      num: 0,
      rate: 0,
      //   日期禁用
      pickerOptions: {
        disabledDate(time) {
          // console.log(time.getTime()>this.limit_date.getTime())
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      }
    };
  },
  methods: {
    handleClick() {}
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