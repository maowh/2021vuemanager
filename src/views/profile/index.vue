<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard class="project-card" :features="featureData"></ProjectCard>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('msg.profile.feature')" name="Feature">
              <Feature :features="featureData"></Feature
            ></el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="Chapter">
              <Chapter></Chapter
            ></el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="Author">
              <Author></Author
            ></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from './components/ProjectCard'
import Feature from './components/Feature'
import Chapter from './components/Chapter'
import Author from './components/Author'
import { feature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

const activeName = ref('Feature')

const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await feature()
}
getFeatureData()
// 重新获取接口国际化数据
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.my-container {
  .project-card {
    margin-right: 20px;
  }
}
</style>
