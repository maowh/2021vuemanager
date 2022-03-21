import dayjs from 'dayjs'

const dateFilter = (val, format = 'YYYY-MM-DD') => {
  // 如果val可以转换为数字就转换为数字
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}
export default (app) => {
  app.config.globalProperties.$filters = { dateFilter }
}
