import IConvert from './convertInterface'

import { BackgroundDefine, BgColor, BGImage, StyleVar } from '../type'
import BgImageConvert from './bgImageConvert'
import LinearGradientConvert from './linearGradientConvert'
import RadialGradientConvert from './radialGradientConvert'
import ColorConvert from './colorConvert'

export default class BackgroundConvert implements IConvert<BackgroundDefine> {
  private bgImageConvert: BgImageConvert
  private linearGradientConvert: LinearGradientConvert
  private radialGradientConvert: RadialGradientConvert
  private colorConvert: ColorConvert

  constructor() {
    this.bgImageConvert = new BgImageConvert()
    this.linearGradientConvert = new LinearGradientConvert()
    this.radialGradientConvert = new RadialGradientConvert()
    this.colorConvert = new ColorConvert()
  }

  compare(v1?: BackgroundDefine, v2?: BackgroundDefine): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (v1.length !== v2.length) return false

    return v1.every((item1, index) => {
      const item2 = v2[index]

      if (item1 === item2) return true

      if (item1.type !== item2.type) return false

      if (item1.type === 'color' && item2.type === 'color') return item1.value === item2.value

      if (item1.type === 'img' && item2.type === 'img') return this.bgImageConvert.compare(item1.value, item2.value)

      if (item1.type === 'linearGradient' && item2.type === 'linearGradient') return this.linearGradientConvert.compare(item1.value, item2.value)

      if (item1.type === 'radialGradient' && item2.type === 'radialGradient') return this.radialGradientConvert.compare(item1.value, item2.value)
    })
  }

  toString(value?: BackgroundDefine, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return undefined

    const resList = value.map((item) => {
      return this.singleToString(item, styleVarMap)
    })

    return resList.filter((item) => !!item).join(',')
  }

  singleToString(value?: BGImage | BgColor, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (value === undefined) return ''

    if (value.type === 'color') return this.colorConvert.toString(value.value, styleVarMap)

    if (value.type === 'img') return this.bgImageConvert.toString(value.value, styleVarMap)

    if (value.type === 'linearGradient') return this.linearGradientConvert.toString(value.value, styleVarMap)

    return this.radialGradientConvert.toString(value.value, styleVarMap)
  }

  obtainDependencies(value?: BackgroundDefine) {
    if (!value) return []

    return value
      .map((item) => {
        if (!item) return []

        if (item.type === 'color') return this.colorConvert.obtainDependencies(item.value)

        if (item.type === 'img') return this.bgImageConvert.obtainDependencies(item.value)

        if (item.type === 'linearGradient') return this.linearGradientConvert.obtainDependencies(item.value)

        return this.radialGradientConvert.obtainDependencies(item.value)
      })
      .flat()
  }

  toStyle(value?: string): BackgroundDefine | undefined {
    throw new Error('Method not implemented.')
  }
}
