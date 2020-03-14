<template>
  <div>
    <div class="top-container">
      <el-row type="flex">
        <el-col :span="10" class="top-left-container top-container-common">
          <el-row type="flex" class="base-info-wrapper" :gutter="20">
            <el-col :span="7">
              <div class="img-wrapper">
                <img
                  style="min-height:70px;width:100%"
                  :src="return_profile('https://i1.hdslb.com/bfs/archive/bfe378396ecb2015eacbe7a8006788daed3140d3.jpg@160w_100h_100Q_1c.webp')"
                  alt
                />
              </div>
            </el-col>
            <el-col :span="17">
              <div class="base-info">
                <div class="title">标题：123</div>
                <div class="tag">
                  <el-tag type="success" size="medium">标签1</el-tag>
                  <el-tag type="success" size="medium">标签2</el-tag>
                  <el-tag type="success" size="medium">标签3</el-tag>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="abstract-wrapper">
            <el-col :span="24">
              <div class="video-abstract">
                简介：
                <span>ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="14" class="top-right-container">
          <el-row :gutter="30" class="panel-wrapper" style="margin:0px">
            <el-col :span="12">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-view">
                  <svg-icon icon-class="view" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">观看</div>
                  <count-to
                    :start-val="0"
                    :end-val="12311"
                    :duration="3000"
                    class="card-panel-num"
                  />个
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-like">
                  <svg-icon icon-class="like" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">点赞</div>
                  <count-to
                    :start-val="0"
                    :end-val="12311"
                    :duration="3000"
                    class="card-panel-num"
                  />个
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-coins">
                  <svg-icon icon-class="coins" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">硬币</div>
                  <count-to
                    :start-val="0"
                    :end-val="12311"
                    :duration="3000"
                    class="card-panel-num"
                  />个
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-favorite">
                  <svg-icon icon-class="favorite" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">收藏</div>
                  <count-to
                    :start-val="0"
                    :end-val="12311"
                    :duration="3000"
                    class="card-panel-num"
                  />个
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  name: "VideoTop",
  components: {
    CountTo: CountTo
  },
  props: {},
  data() {
    return {};
  },
  methods: {
    return_profile(url) {
      return "https://images.weserv.nl/?url=" + url;
    }
  },
  created() {}
};
</script>

<style lang="scss" scope>
.top-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .top-left-container {
    padding: 16px;
    padding-bottom: 0px;
    background: #ffffff;
    .base-info-wrapper {
      // text-align: left;
      padding: 16px;
      //   padding-bottom: 0px;
      background: #ffffff;
      border-bottom: 1px rgb(240, 242, 245) solid;
      .base-info {
        height: 100%;
        position: relative;
        .title {
          color: #666;
          font-size: 23px;
          font-weight: bold;
        }
        .tag {
          position: absolute;
          bottom: 10px;
          text-align: left;
        }
      }
    }
    .abstract-wrapper {
      padding: 16px 16px 0 16px;
      background: #ffffff;
      .video-abstract {
        color: #666;
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        text-overflow: ellipsis;
        // white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .top-right-container {
    // padding-bottom: 0px;
    .panel-wrapper {
      border-left: 1px rgb(240, 242, 245) solid;
      padding: 16px;
      background: #ffffff;
      .card-panel {
        margin-top: 10px;
        //   height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.05);
        &:hover {
          .card-panel-icon-wrapper {
            color: #fff;
          }
          .icon-view {
            background: #40c9c6;
          }
          .icon-like {
            background: #36a3f7;
          }
          .icon-coins {
            background: #f4516c;
          }
          .icon-favorite {
            background: #34bfa3;
          }
        }
        .icon-view {
          color: #40c9c6;
        }
        .icon-like {
          color: #36a3f7;
        }
        .icon-coins {
          color: #f4516c;
        }
        .icon-favorite {
          color: #34bfa3;
        }
        .card-panel-icon-wrapper {
          float: left;
          margin: 14px 0 0 14px;
          padding: 16px;
          transition: all 0.38s ease-out;
          border-radius: 6px;
        }
        .card-panel-icon {
          float: left;
          font-size: 48px;
        }
        .card-panel-description {
          float: right;
          font-weight: bold;
          margin: 26px;
          margin-left: 0px;
          .card-panel-text {
            line-height: 18px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 20px;
            margin-bottom: 12px;
          }
          .card-panel-num {
            font-size: 25px;
          }
        }
      }
    }
  }
}
</style>