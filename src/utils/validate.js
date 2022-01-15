// 判断是否为外部资源
export function isExternal(path) {
  // 如果是以以下几个开头的就是外部资源
  return /^(https?:|mailto:|tel:)/.test(path)
}
