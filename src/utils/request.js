import axios from 'axios'

const service = axios.create({
  // 根目录的.env文件的VUE_APP_BASE_API，根据开发环境和生产环境指定不同的baseURL
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 添加 icode
  config.headers.icode = '77A346E549F3ECF4'
  // 必须返回 config
  return config
})

export default service
