<template>
  <div class="detect-wrapper">
    <div class="detect-head">
      <span>侦测清单</span>
    </div>
    <div class="detect-content-wrapper">
      <div class="content">
        <el-button type="primary" size="mini">侦测记录</el-button>
        <div class="uploader-detect detect-button">
          <div class="icon-wrapper icon-add">
            <svg-icon icon-class="add" class-name="add-icon" />
          </div>
          <span>创建up主监控任务</span>
        </div>
        <div class="video-detect detect-button">
          <div class="icon-wrapper icon-add">
            <svg-icon icon-class="add" class-name="add-icon" />
          </div>
          <span>创建视频监控任务</span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="detect-tip">通过监控，可了解图文如何传播、生命周期能有多长以及用户喜欢在什么时候点击图文进行阅读。</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserDetect",
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss' scope>
.detect-wrapper {
  background: #ffffff;
  .detect-head {
      padding: 5px;
    border-bottom: #e0e0e0 1px solid;
    // height: 30px;
    text-align: left;
    line-height: 30px;
    padding-left: 10px;
  }
  .detect-content-wrapper {
    padding: 16px;
    .icon-wrapper {
      display: inline;
    }
    .detect-button {
      color: #2c3243;
      font-size: 20px;
      text-align: center;
      line-height: 150px;
      margin-top: 10px;
      height: 150px;
      width: 100%;
      border: dimgray 1px dashed;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        border: #6fbbfe 1px dashed;
        color: #6fbbfe;
      }
    }
    .detect-foot {
      padding: 10px;
      padding-top: 0px;
      text-align: center;
      line-height: 60px;
      height: 60px;
      padding: 5px;
      color: dimgray;
    }
  }
}
</style>