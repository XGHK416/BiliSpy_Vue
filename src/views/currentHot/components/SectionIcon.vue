<template>
  <el-row type="flex" justify="center">
    <el-col :span="2">
      <div class="item">
        <div class="section-panel">
          <div class="section-icon-wrapper icon-section">
            <span class="section-wrapper-text">动画</span>
          </div>
        </div>
        <el-tooltip class="item" effect="dark" content="今日更新181" placement="bottom">
          <span class="current-num">181</span>
        </el-tooltip>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="item">
        <div class="section-panel">
          <div class="section-icon-wrapper icon-section">
            <span class="section-wrapper-text">动画</span>
          </div>
        </div>
        <el-tooltip class="item" effect="dark" content="今日更新181" placement="bottom">
          <span class="current-num">181</span>
        </el-tooltip>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="item">
        <div class="section-panel">
          <div class="section-icon-wrapper icon-section">
            <span class="section-wrapper-text">动画</span>
          </div>
        </div>
        <el-tooltip class="item" effect="dark" content="今日更新181" placement="bottom">
          <span class="current-num">181</span>
        </el-tooltip>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="item">
        <div class="section-panel">
          <div class="section-icon-wrapper icon-section">
            <span class="section-wrapper-text">动画</span>
          </div>
        </div>
        <el-tooltip class="item" effect="dark" content="今日更新181" placement="bottom">
          <span class="current-num">181</span>
        </el-tooltip>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="item">
        <div class="section-panel">
          <div class="section-icon-wrapper icon-section">
            <span class="section-wrapper-text">动画</span>
          </div>
        </div>
        <el-tooltip class="item" effect="dark" content="今日更新181" placement="bottom">
          <span class="current-num">181</span>
        </el-tooltip>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="item">
        <div class="section-panel">
          <div class="section-icon-wrapper icon-section">
            <span class="section-wrapper-text">动画</span>
          </div>
        </div>
        <el-tooltip class="item" effect="dark" content="今日更新181" placement="bottom">
          <span class="current-num">181</span>
        </el-tooltip>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "SectionIcon",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss' scope>
.item {
    text-align: center;
  .current-num {
    font-size: 22px;
    color: #666;
    cursor: pointer;
  }
  .section-panel {
    margin: 0 auto;
    padding: 10px 10px 10px 10px;
    height: 90px;
    width: 90px;
    // cursor: pointer;
    position: relative;
    overflow: hidden;
    color: #666;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;

    .section-icon-wrapper {
      color: #fff;
      // padding: 15px;
      height: 100%;
      width: 100%;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      text-align: center;
      font-size: 25px;
      line-height: 70px;
    }
    .icon-section {
      // color: #40c9c6;
      background: #40c9c6;
    }
  }
}
</style>