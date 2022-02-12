import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
// 非vue组件使用store的方法
import store from '@/store'

export default (app) => {
  // app.use(ElementPlus, { locale })
  app.use(ElementPlus, { locale: store.getters.language === 'en' ? en : zhCn })
}
