<template>
  <div id="uploadProfile">
    <my-upload
      v-model="show"
      :width="400"
      :height="400"
      method="PUT"
      :params="profileUploadParam"
      url="http://localhost:8080/bili-api/space/updateProfile"
      img-format="png"
      :withCredentials="withCredentials"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
  </div>
</template>
<script>
import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
export default {
  components: {
    'my-upload': myUpload
  },
  props: {
    uploadprofile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show:false,
      imgDataUrl: '' ,// the datebase64 url of created image,
      profileUploadParam: {
        'userId': this.$store.state.user.user_id
      },
      withCredentials: true,

    }
  },
  methods: {
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      // this.$store.dispatch('user/updateProfile',jsonData['data'])
      console.log(jsonData)
      console.log('field: ' + field)
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    }
  }
}
</script>
