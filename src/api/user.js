import request from '@/utils/request'

// 获取项目功能
export const feature = () => {
  return request({
    url: '/user/feature'
  })
}

// 获取章节功能
export const chapter = () => {
  return request({
    url: '/user/chapter'
  })
}
