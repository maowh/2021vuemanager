<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFilter } from '@/filters'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
// 定义一个发射事件
const emits = defineEmits('update:modelValue')

// 关闭事件
const closed = () => {
  // 在父组件将modelValue变为false
  emits('update:modelValue', false)
}
// 导出文件名
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})
// 点击确定按钮
const loading = ref(false)

const onConfirm = async () => {
  loading.value = true
  // 获取的服务端数据
  const allUser = (await getUserManageAllList()).list
  // 动态导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // excel表头
    header: Object.keys(USER_RELATIONS),
    // excel数据
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName
  })
  closed()
}
// 当我们使用export_json_to_excel的时候，我们传递的data数据，它必须是一个二维数组
const formatJson = (headers, rows) => {
  // 大的数组
  return rows.map((item) => {
    // 大数组里面的小数组[["张三",'2021-9-6'],["王五",'2020-9-6'],["赵六",'2022-9-6']]
    return Object.keys(headers).map((key) => {
      // 角色需要进行特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        // 只获取title的数据
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
