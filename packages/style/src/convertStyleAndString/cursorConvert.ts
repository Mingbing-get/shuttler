import IConvert from './convertInterface'

import { ConstCursor, CursorImg, StyleVar } from '../type'

type CursorType = ConstCursor | CursorImg

export default class CursorConvert implements IConvert<CursorType> {
  compare(v1?: CursorType, v2?: CursorType): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (typeof v1 === 'string' || typeof v2 === 'string') return false

    return v1.src === v2.src
  }

  toString(value?: CursorType, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return 'default'

    if (typeof value === 'string') return value

    return `url(${value.src}) 0 0, auto`
  }

  obtainDependencies(value?: CursorType) {
    return []
  }

  toStyle(value?: string): CursorType | undefined {
    throw new Error('Method not implemented.')
  }
}
