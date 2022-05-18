// 根据权限授权的页面控制组建第一个路由表
import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/ranking',
      name: 'articleRanking',
      component: () => import('@/views/article-ranking/index'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: '/article/:id',
      name: 'articleDetail',
      component: () => import('@/views/article-detail/index'),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
