<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :uniqueOpened="true"
    default-active="1"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 子集 menu 菜单 -->
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>Navigator One</span>
      </template>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item one</el-menu-item>
    </el-sub-menu>
    <!-- 具体菜单项 -->
    <el-menu-item index="2">
      <i class="el-icon-location"></i>
      <span>Navigator Two</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
