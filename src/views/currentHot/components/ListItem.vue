<template>
  <div class="item-wrapper">
    <el-row type="flex" style="height:95px">
      <el-col :span="2">
        <img
          style="height:100%;width:100%"
          src="https://i1.hdslb.com/bfs/archive/be4e3836646af3822d99f9c47c4e491f2fb408c3.jpg@143w_88h.webp"
          alt
        />
      </el-col>
      <el-col :span="8" :offset="1">
        <div class="abstract-wrapper">
          <span class="title">{{row.title}}</span>
          <div class="abstract-metric">
            <div style="display:inline;margin-right:7px">
              <svg-icon icon-class="metric_view" class-name="metric-icon" />
              <span class="metric-text">{{row.metric_view}}</span>
            </div>
            <div style="display:inline;margin-right:7px">
              <svg-icon icon-class="metric_comment" class-name="metric-icon" />
              <span class="metric-text">{{row.metric_comment}}</span>
            </div>
            <div style="display:inline;margin-right:7px">
              <svg-icon icon-class="metric_auth" class-name="metric-icon" />
              <span class="metric-text">{{row.metric_auth}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3" :offset="9">
        <div class="score-wrapper">
          <span class="score">{{row.score}}</span>
          <div style="color:#b8c0cc;">综合得分</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss' scope>
.item-wrapper {
  height: 95px;
  // line-height: 100px;
  .abstract-wrapper {
    position: relative;
    height: 100%;
    .title {
      color: #666;
      font-size: 18px;
      font-weight: bold;
    }
    .abstract-metric {
      position: absolute;
      bottom: 15px;
      left: 0;
      .metric-icon {
        color: #99a2aa;
      }
      .metric-text {
        color: #99a2aa;
        margin-left: 5px;
      }
    }
  }
  .score-wrapper {
      padding: 10px;
      line-height: 45px;
      text-align: center;
    .score {
      color: #00a1d6;
      font-weight: 700;
      font-size: 24px;
      margin-bottom: 6px;
      
    }
  }
}
</style>