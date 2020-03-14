<template>
  <div>
      <VideoTop></VideoTop>
      <VideoInfoContent></VideoInfoContent>
  </div>
</template>

<script>
import VideoTop from './components/VideoTop'
import VideoInfoContent from './components/VideoInfoContent'
export default {
    name:"VideoInfo",
    components:{
        "VideoTop":VideoTop,
        "VideoInfoContent":VideoInfoContent
    },
    data(){
        return{
            video_id :this.$route.params["id"],
        }
    },
    methods:{

    },

}
</script>

<style>

</style>