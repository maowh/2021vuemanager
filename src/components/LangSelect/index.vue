<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSelectLanguage"
  >
    <div>
      <el-tooltip :effect="effect" content="国际化">
        <div id="guide-lang">
          <svg-icon icon="language"></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const store = useStore()
const language = computed(() => store.getters.language)

// 切换语言的方法
const i18n = useI18n()
const handleSelectLanguage = (lang) => {
  // 切换i18n 的locale
  i18n.locale.value = lang
  // 修改vuex中保存的language
  store.commit('app/setLanguage', lang)
  // 更新成功
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
<style lang="scss" scoped></style>
