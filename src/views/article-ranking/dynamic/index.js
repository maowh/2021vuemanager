// 1、动态的列数据
// 2、被勾选的动态列数据
// 3、table的列数据
import DynamicData from './DynamicData'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

// 暴露出动态的列数据
export const dynamicData = ref(DynamicData())

// DynamicData()函数中已经国际化，当语言切换直接监控即可
watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLable()
})

// 创建 被勾选的动态列数据
export const selectDynamicLable = ref([])

// 默认全部勾选
const initSelectDynamicLable = () => {
  selectDynamicLable.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLable()

// 声明table的列数据
export const tableColumns = ref([])
watch(
  selectDynamicLable,
  (val) => {
    tableColumns.value = []
    // 遍历列数据，从中判断出当前列是否是被勾选
    const selectData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
