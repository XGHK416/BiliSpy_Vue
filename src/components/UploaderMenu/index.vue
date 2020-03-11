<template>
  <el-dialog
      class="addDialog-wrapper"
      :title="menueTitle"
      :visible.sync="visible_"
      width="30%"
      @close="handleClose"
    >
      <el-input
        v-model="search_input"
        placeholder="请输入up主"
        v-if="haveSearch"
        style="width:70%"
      ></el-input>
      <el-button
        type="primary"
        v-if="haveSearch"
        @click="handleSearch()"
      >搜索</el-button>
      <div class="addList-wrapper">
        <el-row :gutter="30">
          <el-col :span="12" v-for="(item,index) in data" :key="item.mid+''">
            <div class="list-item">
              <div style="display:inline-block">
                <el-avatar shape="square" :size="45" :src="item.profile"></el-avatar>
              </div>
              <div class="item-cotent-wrapper">
                <div class="item-cotent">
                  <span class="item-title">{{item.name}}</span>
                  <div class="item-select">
                    <el-button
                      type="success"
                      size="mini"
                      v-if="!verifyItemInList(item.mid)"
                      @click="handleSelect(item,index)"
                    >添加</el-button>
                    <el-button type="warning" size="mini" v-else @click="handleDiselect(item,index)">取消</el-button>
                  </div>
                </div>
                <div class="item-abstract">
                  <span>{{item.abstract}}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        small
        layout="prev, pager, next"
        v-if="totalPage>0"
        :total="totalPage"
        :page-size="6"
        style="margin-top:30px"
        @current-change="menuPageChange"
        @prev-click="menuPageChange"
        @next-click="menuPageChange"
      ></el-pagination>
    </el-dialog>
</template>

<script>
export default {
    name: "UploaderMenu",
    props:{
        menueTitle:{
            type:String,
            default:"up主选单"
        },
        visiable:{
            type:Boolean,
            default:false,
        },
        haveSearch:{
            type:Boolean,
            default:false,
        },
        data:{
            type:Array,
            function () {
                return []
            }
        },
        // pagination
        totalPage:{
            type:Number,
            default:0
        },
    },
    data() {
        return {
          item_id_list:[],
          visible_:false,
          search_input:"",
        }
    },
    watch:{
      'visiable':function(val){
        this.visible_ = val
      }
    },
    methods:{
        verifyItemInList(mid){
          if (this.item_id_list.indexOf(mid)>=0){
            return true
          }else return false
        },
        menuPageChange(page) {
          this.$emit("handlePageChange",this.search_input,page,6)
        },
        handleSelect(item,index){
          this.item_id_list.push(item.mid)
          this.$emit("handleSelect",item,this.item_id_list,index)
        },
        handleDiselect(item,index){
          var list_index = this.item_id_list.indexOf(item.mid)
          this.item_id_list.splice(list_index,1)
          this.$emit("handleDiselect",item,this.item_id_list,list_index)
        },
        handleClose(){
          this.$emit('handleClose')
        },
        handleSearch(){
          this.item_id_list
          this.$emit("handleSearch",this.search_input,1,6)
        }
    },
    created(){
        // console.log(title)
    }

}
</script>

<style lang="scss" scope>
.addDialog-wrapper {
  text-align: center;
  .el-dialog__footer {
    background-color: #f9f9f9;
  }
  .addList-wrapper {
    padding-top: 26px;
    min-height: 60px;
    .list-item {
      margin-top: 10px;
      padding: 10px 5px 5px 10px;
      border: 1px solid #f0eded;
      border-radius: 4px;
      text-align: left;
      display: flex;
      .item-cotent-wrapper {
        width: calc(100% - 45px);
        height: 100%;
        padding-left: 12px;
        display: table;
        table-layout: fixed;
        .item-cotent {
          height: 67%;
          color: #333;
          position: relative;
          margin-bottom: 10px;
          .item-title {
            font-size: 17px;
            max-width: 150px;
            color: #333;
          }
          .item-select {
            position: absolute;
            top: 0px;
            right: 10px;
          }
        }
        .item-abstract {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          color: rgba(44, 50, 67, 0.65);
        }
      }
    }
  }
}

</style>