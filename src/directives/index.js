import print from 'vue3-print-nb'
import permission from './permission'

// 通过app.use完成全局注册
export default (app) => {
  app.use(print)
  // 注册permission指令
  app.directive('permission', permission)
}
