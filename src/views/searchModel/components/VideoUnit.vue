<template>
<div style="margin-bottom:5px">
    <el-card :body-style="{ padding: '0px' }">
      <div class="pic">
          <img :src="data.pic" alt="" referrerpolicy="no-referrer" width="100%">
      </div>
      <div class="title">
          {{data.title}}
      </div>
      <div class="author">
          作者：{{data.author}}
      </div>
      <el-button type="primary" style="width:100%;margin-top:7px" @click="handleInfo">查看详情</el-button>
    </el-card>
</div>
  
</template>

<script>
export default {
    name:"VideoUnit",
    props:{
        data:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        handleInfo(){
            this.$emit('openVideoDialog',this.data.aid)
        }
        
    },
    created() {
        
    },
    

}
</script>

<style scope lang='scss'>
.title{
    padding:3px;
    font-weight: 500;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
}
.author{
    border-top: 1px solid #f1f2f6;
    padding: 3px;
    color: #666;
}
</style>