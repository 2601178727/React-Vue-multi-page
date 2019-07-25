<template>
  <div class="vux-box">
    <button-tab>
      <button-tab-item>Today</button-tab-item>
      <button-tab-item selected>This Week</button-tab-item>
      <button-tab-item>This Month</button-tab-item>
    </button-tab>

    <div class="less-box"></div>
  </div>
</template>

<script>
  import {
    ButtonTab,
    ButtonTabItem
  } from 'vux'

  export default {
    components: {
      ButtonTab,
      ButtonTabItem
    },
    data() {
      return {
        selected: 0
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .vux-box {
    width: 100%;
    height: auto;
    .less-box {
      width: 200px;
      height: 200px;
      border: 1px solid red;
    }
  }
</style>