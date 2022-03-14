<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧menu -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    ></sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部navbar -->
        <navbar></navbar>
        <!-- tags -->
        <TagsView id="guide-tags"></TagsView>
      </div>
      <!-- 内容区appmain -->
      <appMain></appMain>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/sidebar'
import TagsView from '@/components/TagsView'
// import variables from '@/styles/variables.scss'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  // 动态计算宽度，需要减去左侧菜单栏的宽度
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sidebarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
