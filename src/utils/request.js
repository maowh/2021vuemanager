import axios from 'axios'
// 导入element的消息提示
import { ElMessage } from 'element-plus'

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

// 响应拦截器，对获取的data中的token数据进行处理
service.interceptors.response.use(
  // 请求成功
  (response) => {
    const { success, message, data } = response.data
    // 需要判断当前请求是否成功
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败（请求成功，业务失败），消息提示
      ElMessage.error(message)
      // 传递服务端返回的错误信息提示
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  (error) => {
    ElMessage.error(error)
    return Promise.reject(error)
  }
)

export default service
