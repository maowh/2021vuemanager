<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx,.xls"
      @change="handleChange"
    />
    <!-- drop当元素或选中的文本在可释放目标上被释放时触发，拖到区域后释放鼠标的时候触发，其余2个是拖到区域后就触发 -->
    <!-- dragover当元素或选中的文本被拖到一个可释放目标上时触发（每100毫秒触发一次） -->
    <!-- dragenter当拖拽元素或选中的文本到一个可释放目标时触发 -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function
})

// 点击上传触发
const loading = ref(false)
const excelUploadInput = ref(null)
// 选择文件的事件，点击选择文件按钮，触发选择文件功能，选择文件成功会触发handleChange事件
const handleUpload = () => {
  // 触发选择文件功能
  excelUploadInput.value.click()
}
// 选中文件之后的回调事件，获取到用户选中的文件
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  // console.log(rawFile)
  upload(rawFile)
}

// 拖拽上传
const handleDrop = (e) => {
  // 上传中
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx，.xls，.csv格式')
    return
  }
  upload(rawFile)
}
// 目标文件被拖拽到区域后
const handleDragover = (e) => {
  // 在拖放操作中给用户的反馈（通常是视觉上的），它会影响在拖拽过程中光标的手势
  // copy在新位置生成源项的副本
  e.dataTransfer.darpEffect = 'copy'
}
// 如果上传文件存在，触发上传事件
const upload = (rawFile) => {
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果用户指定了上传前的回调，那么只有返回true的时候，才会执行对应的后续操作
  // 可以在上传前终止上传操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}
// 读取数据（异步方法）
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // FileReader()为读取计算机文件的类
    const reader = new FileReader()
    // 读取操作完成时触发
    reader.onload = (e) => {
      // 读取文件后对excel文件进行解析，共计9步
      // 1.获取到解析后的数据
      const data = e.target.result
      // 2.利用XLSX对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3.获取第一张表格（工作簿）名称
      const firstSheetName = workbook.SheetNames[0]
      // 4.读取sheet1（第一张表格）的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5.解析数据表头
      const header = getHeaderRow(workSheet)
      // 6.解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7.传入解析之后的数据，将数据头数据体分装为对象传到上一组件
      generateData({ header, results })
      // 8.处理loading
      loading.value = false
      // 9.成功回调
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}
// 根据导入内容，生成数据
const generateData = (excelData) => {
  // 通过回调，将解析后的数据传递到上一层
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
