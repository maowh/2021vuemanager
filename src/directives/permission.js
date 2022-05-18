import store from '@/store'

function checkPermission(el, binding) {
  // 获取传递对应的权限值
  const { value } = binding
  // 获取当前用户的所有功能权限
  const points = store.getters.userInfo.permission.points
  // value必须是一个数组
  if (value && value instanceof Array) {
    // 匹配用户所有功能权限对应的指令，如果成功，返回功能权限
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    // 匹配失败
    if (!hasPermission) {
      // parentNode存在话，删除对应的功能按钮DOM
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin","editor"...]')
  }
}

export default {
  // mounted生命周期两个参数，指令绑定的DOM：el，指令传过来的数据：binding
  // 在绑定元素的父组件被挂载之后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的VNode及其子组件的VNode更新后调用
  updated(el, binding) {
    checkPermission(el, binding)
  }
}
