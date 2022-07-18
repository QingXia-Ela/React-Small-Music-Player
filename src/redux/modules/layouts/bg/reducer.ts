
const initBG = require('@/assets/images/bg/base_bg.jpg')

export default function ChangeBG(path: string = initBG, action: { [propName: string]: any }) {
  const { type, data } = action
  switch (type) {
    case 'ChangeBackground':
      return data
    default:
      return initBG
  }
}