<template>
  <div class="app-main"><router-view></router-view></div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.app-main {
  // 100vh为整个屏幕高度，浏览器可视区域高度，动态变量,减去navbar高度
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
