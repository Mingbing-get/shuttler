import { Dependency } from '@shuttler/helper'
import { StyleVar } from '../type'

export default interface IConvert<T> {
  compare(v1?: T, v2?: T): boolean
  toString(value?: T, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined
  toStyle(value?: string): T | undefined
  obtainDependencies(value?: T): Pick<Dependency, 'refPath' | 'refType'>[]
}
