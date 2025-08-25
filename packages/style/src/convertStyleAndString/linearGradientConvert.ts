import IConvert from './convertInterface'
import LengthConvert from './lengthConvert'
import { isStyleExpression, getStyleVar, obtainStyleValueDependencies } from '../utils'
import { LinearGradient, StyleVar } from '../type'

export default class LinearGradientConvert implements IConvert<LinearGradient> {
  private lengthConvert: LengthConvert

  constructor() {
    this.lengthConvert = new LengthConvert()
  }

  compare(v1?: LinearGradient, v2?: LinearGradient): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (isStyleExpression(v1) && isStyleExpression(v2)) return true

    if (isStyleExpression(v1) || isStyleExpression(v2)) return false

    if (v1.angle !== v2.angle) return false

    if (!this.lengthConvert.compare(v1.width, v2.width)) return false

    if (v1.colorList?.length !== v2.colorList?.length) return false

    if (!v1.colorList || !v2.colorList) return false

    return v1.colorList.every((item1, index) => {
      const item2 = v2.colorList[index]

      return item1.color === item2.color && Math.abs(item1.position - item2.position) < 1e-8
    })
  }

  toString(value?: LinearGradient, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (isStyleExpression(value)) {
      return this.toString(getStyleVar<StyleVar.LinearGradientVar>(value, styleVarMap)?.value, styleVarMap)
    }

    if (!value?.colorList?.length) return undefined

    const resList: string[] = []
    if (value.angle) {
      resList.push(`${value.angle}deg`)
    }

    let hasWidth = false
    value.colorList.forEach((item) => {
      const width = this.lengthConvert.toString(value.width, styleVarMap)
      if (!width || !value.width) {
        resList.push(`${item.color} ${item.position}%`)
      } else {
        hasWidth = true
        resList.push(`${item.color} ${this.lengthConvert.toString({ value: (item.position * value.width.value) / 100, unit: value.width.unit }, styleVarMap)}`)
      }
    })

    if (resList.length === 1) {
      resList.push(resList[0])
    }

    return `${hasWidth ? 'repeating-linear-gradient' : 'linear-gradient'}(${resList.join(', ')})`
  }

  obtainDependencies(value?: LinearGradient) {
    if (!value) return []

    if (isStyleExpression(value)) {
      return obtainStyleValueDependencies(value)
    }

    return this.lengthConvert.obtainDependencies(value.width)
  }

  toStyle(value?: string): LinearGradient | undefined {
    throw new Error('Method not implemented.')
  }
}
