import print from 'vue3-print-nb'

// 通过app.use完成全局注册
export default (app) => {
  app.use(print)
}
