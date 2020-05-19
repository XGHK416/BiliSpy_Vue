<template>
  <div class="hot-wrapper">
    <div>
      <div class="head">
        <span>分区选择</span>
      </div>
      <div class="section-wrapper">
        <section-icon></section-icon>
      </div>
    </div>
    <div style="margin-top:25px">
      <div class="list-wrapper">
        <section-list></section-list>
      </div>
    </div>
  </div>
</template>

<script>
import SectionIcon from "./components/SectionIcon";
import SectionList from "./components/SectionList";
export default {
  components: {
    SectionIcon,
    SectionList,
  },
  name: "CurrentHot",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss' scope>
.hot-wrapper {
  padding: 32px;
  background: #f1f2f6;
  .head {
    background: #ffffff;
    padding: 5px;
    height: 30px;
    color: #666;
    border-bottom: 1px solid #e6e6e6;
  }
  .section-wrapper {
    padding: 16px;
    background: #ffffff;
  }
  .list-wrapper {
    padding: 16px;
    background: #ffffff;
  }
}
</style>