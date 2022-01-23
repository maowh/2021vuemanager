import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
// 导入token的常量
import { TOKEN } from '@/constant'

// 封装和用户登录请求有关的操作信息
export default {
  // 表明一个单独模块，不具备合并到主模块
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },
  actions: {
    // 登录请求动作
    login(context, userInfo) {
      const { username, password } = userInfo
      // 无论登录成功then还是失败catch需要在组件进行对应的处理
      return new Promise((resolve, reject) => {
        login({
          username,
          // 对密码进行md5加密后传给服务器
          password: md5(password)
        })
          .then((data) => {
            this.commit('user/setToken', data.data.data.token)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
