<template>
   <div>
        <el-dialog
            title="信息展示"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="InfoDialogVisible"
            :close="dialogClose">
            <div></div>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
export default {
    props:{
        InfoDialogVisible:{
            type:Boolean,
            default:false,
        }
    },

}
</script>

<style>

</style>