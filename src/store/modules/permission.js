import { publicRoutes, privateRoutes } from '@/router'
export default {
  namespaced: true,
  state: () => ({
    // 路由表：初始时所拥有的路由表
    routes: publicRoutes
  }),
  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    // 根据权限数据筛选路由，menus权限数据
    filterRoutes(context, menus) {
      // 筛选之后，获取到的需要通过addRoute进行添加的路由表数组
      const routes = []

      menus.forEach((key) => {
        // 把根据name能匹配到的路由添加到路由表里
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })

      // 所有不匹配的路由，全部进入404的路由配置，固定配置
      // 该配置必须在所有路由指定之后，添加在动态路由添加之后
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)

      return routes
    }
  }
}
