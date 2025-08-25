import IConvert from './convertInterface'
import { DirectionSelect, StyleVar } from '../type'

export default class DirectionSelectConvert<T> implements IConvert<DirectionSelect<T>> {
  private itemConvert: IConvert<T>
  private splitStr: string
  private emptyReplace?: string

  constructor(itemConvert: IConvert<T>, splitStr?: string, emptyReplace?: string) {
    this.itemConvert = itemConvert
    this.splitStr = splitStr || ' '
    this.emptyReplace = emptyReplace
  }

  mergeValue(v1: DirectionSelect<T>, v2?: DirectionSelect<T>) {
    if (!v2) return v1

    const newVal: DirectionSelect<T> = []
    for (let i = 0; i < 4; i++) {
      if (v1[i] !== undefined) {
        newVal[i] = v1[i]
      } else {
        newVal[i] = v2[i]
      }
    }

    return newVal
  }

  compare(v1?: DirectionSelect<T>, v2?: DirectionSelect<T>): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    return v1.every((item, index) => this.itemConvert.compare(item, v2[index]))
  }

  toString(value?: DirectionSelect<T>, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return undefined

    return value
      .map((item) => {
        const v = this.itemConvert.toString(item, styleVarMap)

        if (v === undefined || v === null || v === '') return this.emptyReplace

        return v
      })
      .join(this.splitStr)
  }

  obtainDependencies(value?: DirectionSelect<T>) {
    if (!value) return []

    return value.map((item) => this.itemConvert.obtainDependencies(item)).flat()
  }

  toStyle(value?: string): DirectionSelect<T> | undefined {
    throw new Error('Method not implemented.')
  }
}
