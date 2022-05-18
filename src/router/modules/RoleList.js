// 根据权限授权的页面控制组建第一个路由表
import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/role',
      name: 'userRole',
      component: () => import('@/views/role-list/index'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
