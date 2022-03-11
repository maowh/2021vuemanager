// 创建不需要保存路由的白名单
const whiteList = ['/login', '/404', '401']

// 不在白名单中的可以保存
export function isTags(path) {
  return !whiteList.includes(path)
}
