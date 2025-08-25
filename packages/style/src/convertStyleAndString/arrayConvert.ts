import IConvert from './convertInterface'
import { StyleVar } from '../type'

export default class ArrayConvert<T> implements IConvert<Array<T>> {
  private itemConvert: IConvert<T>
  private splitStr: string

  constructor(itemConvert: IConvert<T>, splitStr?: string) {
    this.itemConvert = itemConvert
    this.splitStr = splitStr || ' '
  }

  compare(v1?: Array<T>, v2?: Array<T> | undefined): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    return v1.every((item, index) => this.itemConvert.compare(item, v2[index]))
  }

  toString(value?: Array<T>, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return undefined

    return value.map((item) => this.itemConvert.toString(item, styleVarMap)).join(this.splitStr)
  }

  obtainDependencies(value?: T[]) {
    if (!value) return []

    return value.map((item) => this.itemConvert.obtainDependencies(item)).flat()
  }

  toStyle(value?: string): Array<T> | undefined {
    throw new Error('Method not implemented.')
  }
}
