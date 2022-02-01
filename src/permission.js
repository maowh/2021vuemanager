import router from '@/router'
import store from '@/store'

// 白名单，用户未登录也可以进入的页面
const whiteList = ['/login']

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 1.用户已登录，不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 2.用户未登录，只允许进入login
    // 判断是否在白名单中，如果在可以跳转
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
