<template>
  <router-view />
</template>

<script setup>
// export default {
//   name: 'App'
// }
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})
</script>

<style></style>
