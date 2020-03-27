<template>
    <div class="card-wrapper">
        <div class="card-title">{{title}}</div>
        <el-divider></el-divider>
        <div class="card-num">{{num}}</div>
    </div>
</template>
<script>
export default {
    name:"CountCard",
    props:{
        title:{
            type:String,
            default:''
        },
        num:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },


}
</script>

<style lang='scss' scoped>
    .card-wrapper{
        border-radius: 5px;
        border: 1px solid #e6e6e6;
        padding: 16px;
        background: #ffffff;
        box-shadow:1px 1px 5px rgb(180, 180, 180);
        .card-title{
            text-align: center;
            font-size: 25px;
            color: #666;
            font-weight: bold;
        }
        .card-num{
             text-align: center;
            font-size: 35px;
            color: #73c6fe;
            font-weight: bold;
        }
    }
</style>