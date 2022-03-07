import path from 'path'
import i18n from '@/i18n'
// 筛选出可供搜索的路由对象，routes 路由表，basePath 基础路径，默认为/
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let res = []
  for (const route of routes) {
    // 创建包含path和title的item
    const data = {
      // 将基础路径和路由表路径合并
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在meta时，使用i18n进行国际化解析，组合成新的title
    // 动态路由不允许被检索
    // 正则
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }
    // 存在children时，迭代进行处理
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
