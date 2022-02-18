import formula from '@/constant/formula'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import axios from 'axios'
// 把生成的样式表写入到style中
export const writeNewStyle = (newstyle) => {
  const style = document.createElement('style')
  style.innerText = newstyle
  // 将element-plus的css样式表放入页面头进行覆盖使用
  document.head.appendChild(style)
}

// 根据主题色，生成最新的样式表
export const generateNewStyle = async (primaryColor) => {
  // 1、根据主色生成色值表
  const colors = generateColors(primaryColor)
  // 2、获取当前element-plus的默认样式表，并且把需要进行替换的色值打上标记，为打上文字的css值
  let cssText = await getOriginalStyle()
  // 3、遍历生成的色值表，在 默认样式表 进行全局替换
  // 无论前面有多少个空格，进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  return cssText
}

export const generateColors = (primary) => {
  if (!primary) return
  const colors = {
    primary
  }
  Object.keys(formula).forEach((key) => {
    // 将主色primary替换为外部引入的parimary
    const value = formula[key].replace(/primary/g, primary)
    // 采用rgbHex生成16进制色值
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  console.log(colors)
  return colors
}

// 获取当前element-plus的默认样式表
export const getOriginalStyle = async () => {
  // 获取当前element-plus的版本
  const version = require('element-plus/package.json').version
  // 获取element-plus的当前版本的css样式表
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  // 获取css样式
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

// 并且把需要进行替换的色值打上标记(定义需要打标记的色值)
const getStyleTemplate = (data) => {
  // element-plus默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    // 利用正则表达式查找色值并替换
    data = data.replace(new RegExp(key, 'ig'), value)
  })

  return data
}
