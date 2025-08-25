import IConvert from './convertInterface'
import LengthConvert from './lengthConvert'
import { SpaceDefine, StyleVar } from '../type'
import { isStyleExpression, getStyleVar, obtainStyleValueDependencies } from '../utils'

export default class SpaceConvert implements IConvert<SpaceDefine> {
  private lengthConvert: LengthConvert
  constructor() {
    this.lengthConvert = new LengthConvert()
  }

  compare(v1?: SpaceDefine, v2?: SpaceDefine): boolean {
    if (typeof v1 === 'string' && typeof v2 === 'string') {
      return v1 === v2
    }

    if (typeof v1 === 'string' || typeof v2 === 'string') return false

    return this.lengthConvert.compare(v1, v2)
  }

  toString(value?: SpaceDefine, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return undefined

    if (typeof value === 'string') return value

    if (isStyleExpression(value)) {
      return this.toString(getStyleVar<StyleVar.Space>(value, styleVarMap)?.value, styleVarMap)
    }

    return this.lengthConvert.toString(value, styleVarMap)
  }

  obtainDependencies(value?: SpaceDefine) {
    if (!value || typeof value === 'string') return []

    if (isStyleExpression(value)) {
      return obtainStyleValueDependencies(value)
    }

    return this.lengthConvert.obtainDependencies(value)
  }

  toStyle(value?: string): SpaceDefine | undefined {
    throw new Error('Method not implemented.')
  }
}
