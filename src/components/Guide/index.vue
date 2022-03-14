<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <div id="guide-start" @click="onClick">
        <svg-icon icon="guide"></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './steps'

const i18n = useI18n()

let driver = null // eslint-disable-line no-unused-vars
onMounted(() => {
  driver = new Driver({
    opacity: 0.1,
    animate: false, // 设置 false: 会没有动画, opacity 失效
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})

const onClick = () => {
  // driver执行前需要指定步骤
  driver.defineSteps(steps(i18n))
  // driver执行
  driver.start()
}
</script>

<style lang="scss" scoped></style>
