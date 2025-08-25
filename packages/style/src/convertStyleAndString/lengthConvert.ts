import { LengthDefine, StyleVar, Unit } from '../type'
import IConvert from './convertInterface'
import { isStyleExpression, getStyleVar, obtainStyleValueDependencies } from '../utils'

export default class LengthConvert implements IConvert<LengthDefine> {
  compare(v1?: LengthDefine, v2?: LengthDefine): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (isStyleExpression(v1) && isStyleExpression(v2)) return true

    if (isStyleExpression(v1) || isStyleExpression(v2)) return false

    return v1.value === v2.value && v1.unit === v2.unit
  }

  toString(value?: LengthDefine, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return undefined

    if (isStyleExpression(value)) {
      return this.toString(getStyleVar<StyleVar.Length>(value, styleVarMap)?.value, styleVarMap)
    }

    return `${value.value}${value.unit}`
  }

  obtainDependencies(value?: LengthDefine<Unit>) {
    return obtainStyleValueDependencies(value)
  }

  toStyle(value?: string): LengthDefine | undefined {
    throw new Error('Method not implemented.')
  }
}
