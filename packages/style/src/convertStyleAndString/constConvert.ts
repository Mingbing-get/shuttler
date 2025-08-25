import { StyleVar } from '../type'
import IConvert from './convertInterface'

export default class ConstConvert<T extends string = string> implements IConvert<T> {
  compare(v1?: T, v2?: T): boolean {
    return v1 === v2
  }

  toString(value?: T, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    return value
  }

  obtainDependencies(value?: T | undefined) {
    return []
  }

  toStyle(value?: string): T | undefined {
    return value as T
  }
}
