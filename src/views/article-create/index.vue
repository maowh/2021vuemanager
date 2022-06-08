<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        maxlength="20"
        clearable
        v-model="title"
        :placeholder="$t('msg.article.titlePlaceholder')"
      ></el-input>
      <!-- 父组件将title的值赋予子组件markdown的title参数 -->
      <!-- 子组件发射@onSuccess后,父组件接收，执行onSuccess方法 -->
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown"
          ><markdown
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></markdown
        ></el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor"
          ><editor
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></editor
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Editor from './components/Editor'
import Markdown from './components//Markdown'
import { articleDetail } from '@/api/article'
import { useRoute } from 'vue-router'

const title = ref('')
const activeName = ref('markdown')
const onSuccess = () => {
  title.value = ''
}
// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题
  title.value = detail.value.title
}
if (articleId) {
  getArticleDetail()
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
