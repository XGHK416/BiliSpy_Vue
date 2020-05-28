<template>
  <el-dialog
    title="添加管理"
    :visible.sync="dialogVisible"
    width="30%"
    @close="handleClose"
  >
    <div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          
        ></el-option>
      </el-select>
      <div class="account">
          <div style="margin-bottom:10px">账号: {{newAccount.account}}</div>
          <div>密码: {{newAccount.password}}</div>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleComfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addNewMo } from "@/api/mo_manager";
export default {
  name: "AddMo",
  data() {
    return {
      user_id: this.$store.state.user.user_id,
      dialogVisible: false,
      options: [
       
        {
          value: "manager",
          label: "管理员"
        }
      ],
      value: "",
      newAccount:{
          account:'',
          password:''
      }
    };
  },
  methods: {
    handleComfirm() {
      addNewMo(this.user_id,this.value).then(response=>{
          if(response.code==20000){
              this.$message({
                  message: '添加成功',
                  type: 'success',
              });
              this.newAccount.account = response.data.account
              this.newAccount.password = response.data.password
              
          }
      })
    },
    handleClose(){
        this.newAccount.account = '',
        this.newAccount.password = '',
        this.dialogVisible = false
    }
  }
};
</script>

<style lang='scss' scoped>
.account{
    padding: 16px 16px 16px 0px;
    font-size: 20px;
    line-height: 20px;
    color: #666;
}
</style>