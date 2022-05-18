// 根据权限授权的页面控制组建第一个路由表
import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  // 指定name进行路由添加和跳转
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage',
      name: 'userManage',
      component: () => import('@/views/user-manage/index'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      // 当路由的props设置为true时，route.params将被设置为组件的props
      path: '/user/info/:id',
      name: 'userInfo',
      component: () => import('@/views/user-info/index'),
      props: true,
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      name: 'import',
      component: () => import('@/views/import/index'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
