import variables from '@/styles/variables.scss'
// 快捷访问，计算属性
const getters = {
  // 声明token快捷访问
  token: (state) => state.user.token,
  // 判断userInfo是否空对象，用户信息是否存在
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => variables,
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor
}
export default getters
