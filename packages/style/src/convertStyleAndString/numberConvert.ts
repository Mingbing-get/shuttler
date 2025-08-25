import { StyleVar } from '../type'
import IConvert from './convertInterface'

export default class NumberConvert implements IConvert<number> {
  compare(v1?: number, v2?: number): boolean {
    return v1 === v2
  }

  toString(value?: number, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    return value ? `${value}` : undefined
  }

  obtainDependencies(value?: number | undefined) {
    return []
  }

  toStyle(value?: string): number | undefined {
    return value ? Number(value) : undefined
  }
}
