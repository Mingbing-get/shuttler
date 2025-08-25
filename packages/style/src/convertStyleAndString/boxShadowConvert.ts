import IConvert from './convertInterface'
import LengthConvert from './lengthConvert'
import ColorConvert from './colorConvert'
import { isStyleExpression, getStyleVar, obtainStyleValueDependencies } from '../utils'
import { BoxShadow, StyleVar } from '../type'

export default class BoxShadowConvert implements IConvert<BoxShadow[]> {
  private lengthConvert: LengthConvert
  private colorConvert: ColorConvert

  constructor() {
    this.lengthConvert = new LengthConvert()
    this.colorConvert = new ColorConvert()
  }

  compare(v1?: BoxShadow[], v2?: BoxShadow[]): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (isStyleExpression(v1) && isStyleExpression(v2)) return true

    if (isStyleExpression(v1) || isStyleExpression(v2)) return false

    if (v1.length !== v2.length) return false

    return v1.every((item1, index) => {
      const item2 = v2[index]

      return (
        !!item1.isInset === !!item2.isInset &&
        this.lengthConvert.compare(item1.offsetX, item2.offsetX) &&
        this.lengthConvert.compare(item1.offsetY, item2.offsetY) &&
        this.lengthConvert.compare(item1.blurRadius, item2.blurRadius) &&
        this.lengthConvert.compare(item1.spreadRadius, item2.spreadRadius) &&
        this.colorConvert.compare(item1.color, item2.color)
      )
    })
  }

  toString(value?: BoxShadow[], styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (isStyleExpression(value)) {
      return this.toString(getStyleVar<StyleVar.BoxShadowVar>(value, styleVarMap)?.value, styleVarMap)
    }

    if (!value?.length) return

    const boxShadowStrList = value.map((item) => this.singleToString(item, styleVarMap))

    return boxShadowStrList.join(',')
  }

  singleToString(value?: BoxShadow, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return

    let str = ''

    if (value.isInset) {
      str += 'inset'
    }

    str += ` ${this.lengthConvert.toString(value.offsetX, styleVarMap) || '0'} ${this.lengthConvert.toString(value.offsetY, styleVarMap) || '0'}`

    if (value.blurRadius) {
      str += ` ${this.lengthConvert.toString(value.blurRadius, styleVarMap)}`
    }

    if (value.spreadRadius) {
      if (!value.blurRadius) {
        str += ' 0'
      }
      str += ` ${this.lengthConvert.toString(value.spreadRadius, styleVarMap)}`
    }

    str += ` ${this.colorConvert.toString(value.color, styleVarMap)}`

    return str
  }

  obtainDependencies(value?: BoxShadow[]) {
    if (!value) return []

    if (isStyleExpression(value)) {
      return obtainStyleValueDependencies(value)
    }

    return value
      .map((item) => [
        ...this.lengthConvert.obtainDependencies(item.offsetX),
        ...this.lengthConvert.obtainDependencies(item.offsetY),
        ...this.lengthConvert.obtainDependencies(item.blurRadius),
        ...this.lengthConvert.obtainDependencies(item.spreadRadius),
        ...this.colorConvert.obtainDependencies(item.color),
      ])
      .flat()
  }

  toStyle(value?: string): BoxShadow[] | undefined {
    throw new Error('Method not implemented.')
  }
}
