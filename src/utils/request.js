import axios from 'axios'

const service = axios.create({
  // 根目录的.env文件的VUE_APP_BASE_API，根据开发环境和生产环境指定不同的baseURL
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

export default service
