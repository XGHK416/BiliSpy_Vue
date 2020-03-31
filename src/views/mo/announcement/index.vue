<template>
  <div class="announce-wrapper">
    <div class="announce">
      <tinymce-editor ref="editor" v-model="msg" :disabled="disabled" @onClick="onClick"></tinymce-editor>
      <div class="option">
        <el-button type="primary">清空所有</el-button>
        <el-button type="primary" plain @click="dialogVisible=true">预览</el-button>
        <el-button type="success" @click="submitAccounce" style="float:right">发布</el-button>
      </div>
    </div>
    <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="30%">
        <div>
            <div v-html="msg">

            </div>
        </div>
        <div slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>


<script>
import TinymceEditor from "./components/TinymceEditor";
import {changeAnnounce,getAnnounce} from '@/api/announce'
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      user_id:this.$store.state.user.user_id,
        dialogVisible:false,
      msg: "",
      disabled: false
    };
  },
  created(){
    getAnnounce().then(Response=>{
      this.msg = Response.data.announceText
    })
  },
  methods: {
    submitAccounce(){
      changeAnnounce(this.msg,this.user_id).then(Response=>{
        this.$message({
          message: '已修改',
          type: 'success'
        })
      })
    },
    // 鼠标单击的事件
    onClick(e, editor) {
      // console.log("Element clicked");
      // console.log(e);
      // console.log(editor);
    },
    // 清空内容
    clear() {
      this.$refs.editor.clear();
    }
  }
};
</script>
<style lang="scss" scoped>
.announce-wrapper {
  padding: 32px;
  .announce{
      padding: 16px;
      background: #ffffff;
      .option{
          margin-top: 15px;
      }
  }
}
</style>