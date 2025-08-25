import IConvert from './convertInterface'
import { isStyleExpression, getStyleVar, obtainStyleValueDependencies } from '../utils'
import { Color, StyleVar } from '../type'

export default class ColorConvert implements IConvert<Color> {
  compare(v1?: Color | undefined, v2?: Color | undefined): boolean {
    if (isStyleExpression(v1) && isStyleExpression(v2)) return true

    if (isStyleExpression(v1) || isStyleExpression(v2)) return false

    return v1 === v2
  }

  toString(value?: Color, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (isStyleExpression(value)) {
      return this.toString(getStyleVar<StyleVar.ColorVar>(value, styleVarMap)?.value, styleVarMap)
    }

    return value || 'transparent'
  }

  obtainDependencies(value?: string) {
    return obtainStyleValueDependencies(value)
  }

  toStyle(value?: string): Color | undefined {
    return value
  }
}
