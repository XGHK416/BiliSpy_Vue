<template>
  <div>
    <TopInfo></TopInfo>

      {{this.$route.params}}
  </div>
</template>

<script>
import TopInfo from './components/topInfo'
export default {
    name: 'Info',
    components: {
      "TopInfo": TopInfo,
    }
}
</script>

<style>

</style>