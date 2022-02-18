import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

// 快捷访问，计算属性
const getters = {
  // 声明token快捷访问
  token: (state) => state.user.token,
  // 判断userInfo是否空对象，用户信息是否存在
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => state.user.userInfo,
  // cssVar: (state) => variables,
  // cssVar为计算属性，属性里面的值发生变化会自动计算变化
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor
}
export default getters
