<template>
  <el-dialog :visible.sync="dialogVisible" @close="announceClose" width="30%" center>
    <div>
      <div class="announce-head">公告</div>
      <el-divider></el-divider>
      <div v-html="announce_text"></div>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getAnnounce} from '@/api/announce';
export default {
  name: "Announce",
  data() {
    return {
      dialogVisible: false,
      announce_text:''
    };
  },
  watch:{
      dialogVisible(val){
          if(val){
            getAnnounce().then(Response=>{
                this.announce_text = Response.data.announceText
            })
          }
      }
  },
  created() {
    // 第一次出现弹窗且根据localStorage只显示一次
    if (localStorage.getItem("announceShow")=="false") {
        this.dialogVisible = true
    }
  },
  methods: {
    announceClose() {
      this.dialogVisible = false;
      localStorage.setItem("announceShow", "true");
    }
  }
};
</script>

<style lang='scss' scopde>
.announce-head {
  font-size: 35px;
  font-weight: bold;
  text-align: center;
}
</style>