<template>
  <!-- v-bind="$attrs"父组件的属性会绑定到根元素，例如给父元素绑定类名class属性绑定到el-dropdown中 -->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!-- 图标 -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <div id="guide-theme">
          <svg-icon icon="change-theme"></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div><SelectColor v-model="selectColorVisible"></SelectColor></div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor'

// dialog是否展示
const selectColorVisible = ref(false)
const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
