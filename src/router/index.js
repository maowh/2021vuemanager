import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'
import store from '@/store'

// 导入页面权限控制的路由表
import UserManage from './modules/userManage'
import RoleList from './modules/RoleList'
import PermissionList from './modules/PermissionList'
import Aticle from './modules/Aticle'
import ArticleCreate from './modules/ArticleCreate'

/* 私有路由表 */
// export const privateRoutes = [
//   {
//     path: '/user',
//     component: layout,
//     redirect: '/user/manage',
//     meta: {
//       title: 'user',
//       icon: 'personnel'
//     },
//     children: [
//       {
//         path: '/user/manage',
//         name: 'userManage',
//         component: () => import('@/views/user-manage/index'),
//         meta: {
//           title: 'userManage',
//           icon: 'personnel-manage'
//         }
//       },
//       {
//         path: '/user/role',
//         name: 'userRole',
//         component: () => import('@/views/role-list/index'),
//         meta: {
//           title: 'roleList',
//           icon: 'role'
//         }
//       },
//       {
//         path: '/user/permission',
//         name: 'userPermission',
//         component: () => import('@/views/permission-list/index'),
//         meta: {
//           title: 'permissionList',
//           icon: 'permission'
//         }
//       },
//       {
//         // 当路由的props设置为true时，route.params将被设置为组件的props
//         path: '/user/info/:id',
//         name: 'userInfo',
//         component: () => import('@/views/user-info/index'),
//         props: true,
//         meta: {
//           title: 'userInfo'
//         }
//       },
//       {
//         path: '/user/import',
//         name: 'import',
//         component: () => import('@/views/import/index'),
//         meta: {
//           title: 'excelImport'
//         }
//       }
//     ]
//   },
//   {
//     path: '/article',
//     component: layout,
//     redirect: '/article/ranking',
//     meta: {
//       title: 'article',
//       icon: 'article'
//     },
//     children: [
//       {
//         path: '/article/ranking',
//         name: 'articleRanking',
//         component: () => import('@/views/article-ranking/index'),
//         meta: {
//           title: 'articleRanking',
//           icon: 'article-ranking'
//         }
//       },
//       {
//         path: '/article/:id',
//         name: 'articleDetail',
//         component: () => import('@/views/article-detail/index'),
//         meta: {
//           title: 'articleDetail'
//         }
//       },
//       {
//         path: '/article/create',
//         name: 'articleCreate',
//         component: () => import('@/views/article-create/index'),
//         meta: {
//           title: 'articleCreate',
//           icon: 'article-create'
//         }
//       },
//       {
//         path: '/article/editor/:id',
//         name: 'articleEditor',
//         component: () => import('@/views/article-create/index'),
//         meta: {
//           title: 'articleEditor'
//         }
//       }
//     ]
//   }
// ]

// 根据页面权限重写受控路由表
export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Aticle,
  ArticleCreate
]
/* 公开路由表 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    redirect: '/profile',
    component: layout,
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      // 404
      {
        path: '404',
        name: '/404',
        component: () => import('@/views/error-page/404')
      },
      // 401
      {
        path: '401',
        name: '/401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  // routes: [...publicRoutes, ...privateRoutes]
  routes: publicRoutes
})

// 问题：进入后，路由表无变化，需要重新刷新页面显示正确路由表
// 原因：退出登录后，路由表还在被缓存，再次登录，路由表还是上次登录的路由表信息
// 初始化路由表
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    // 获取所有的页面权限，removeRoute通过name将添加的授权路由全部删除
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router
