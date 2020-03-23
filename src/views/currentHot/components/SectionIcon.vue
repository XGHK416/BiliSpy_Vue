<template>
  <el-row type="flex" justify="center">
    <el-col :span="2" v-for="item in section_list" :key="item.name">
      <div class="item">
        <div class="section-panel" @click="handleChangeSection(item)">
          <div class="section-icon-wrapper icon-section" :style="{'background-color':item.color}">
            <span class="section-wrapper-text">{{item.name}}</span>
          </div>
        </div>
        <!-- <el-tooltip class="item" effect="dark" content="今日更新181" placement="bottom">
          <span class="current-num">181</span>
        </el-tooltip> -->
      </div>
    </el-col>
  </el-row>
</template>

<script>
import $bus from '@/utils/eventBus'
export default {
  name: "SectionIcon",
  data() {
    return {
      section_list:[
        {
          name:'全站',
          tid:0,
          color:'#40c9c6'
        },
        {
          name:'动画',
          tid:1,
          color:'#b26ffe'
        },
        {
          name:'国创相关',
          tid:168,
          color:'#79c7cc'
        },
        {
          name:'音乐',
          tid:3,
          color:'#6fbbfe'
        },
        {
          name:'舞蹈',
          tid:129,
          color:'#fe6f73'
        },
        {
          name:'游戏',
          tid:4,
          color:'#fe6fbb'
        },
        {
          name:'科技',
          tid:36,
          color:'#337ab3'
        },
        {
          name:'数码',
          tid:188,
          color:'#8b98e3'
        },
        {
          name:'生活',
          tid:160,
          color:'#6f73fe'
        },
        {
          name:'鬼畜',
          tid:119,
          color:'#fc4a1a'
        },
        {
          name:'时尚',
          tid:155,
          color:'#ba6a83'
        },
        {
          name:'娱乐',
          tid:5,
          color:'#14b38e'
        },
        {
          name:'影视',
          tid:181,
          color:'#8cc743'
        }
      ]
    };
  },
  methods: {
    handleChangeSection(item){
      $bus.$emit('handleSectionChange',item.tid)
    }
  }
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
  
  }
}
</style>