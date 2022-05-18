import router from '@/router'
import store from '@/store'

// 路由守卫，to要到哪里去，from你从哪里来，next是否要去

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
        // await store.dispatch('user/getUserInfo')
        // 获取到解析的permission
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的路由
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 循环添加对应动态路由，使用addRoute方法
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要进行一次主动跳转
        return next(to.path)
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
