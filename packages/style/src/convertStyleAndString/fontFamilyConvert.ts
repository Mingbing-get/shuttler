import { StyleVar, FontFamilyName } from '../type'
import IConvert from './convertInterface'

export default class FontFamilyConvert implements IConvert<FontFamilyName[]> {
  compare(v1?: FontFamilyName[], v2?: FontFamilyName[]): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (v1.length !== v2.length) return false

    for (let i = 0; i < v1.length; i++) {
      if (v1[i] !== v2[i]) return false
    }

    return true
  }

  toString(value?: FontFamilyName[], styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value?.length) return

    return `${value.join(', ')}, sans-serif`
  }

  obtainDependencies(value?: FontFamilyName[] | undefined) {
    return []
  }

  toStyle(value?: string): FontFamilyName[] | undefined {
    return []
  }
}
