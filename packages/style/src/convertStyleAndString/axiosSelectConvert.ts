import IConvert from './convertInterface'
import { AxiosSelect, StyleVar } from '../type'

export default class AxiosSelectConvert<T> implements IConvert<AxiosSelect<T>> {
  private itemConvert: IConvert<T>
  private splitStr: string
  private excludeEmpty?: boolean

  constructor(itemConvert: IConvert<T>, splitStr?: string, excludeEmpty?: boolean) {
    this.itemConvert = itemConvert
    this.splitStr = splitStr || ' '
    this.excludeEmpty = excludeEmpty
  }

  mergeValue(v1: AxiosSelect<T>, v2?: AxiosSelect<T>) {
    if (!v2) return v1

    const newVal: AxiosSelect<T> = []
    for (let i = 0; i < 2; i++) {
      if (v1[i] !== undefined) {
        newVal[i] = v1[i]
      } else {
        newVal[i] = v2[i]
      }
    }

    return newVal
  }

  compare(v1?: AxiosSelect<T>, v2?: AxiosSelect<T> | undefined): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    return v1.every((item, index) => this.itemConvert.compare(item, v2[index]))
  }

  toString(value?: AxiosSelect<T>, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return undefined

    return value
      .reduce((total: (string | undefined)[], item) => {
        const val = this.itemConvert.toString(item, styleVarMap)
        if (this.excludeEmpty && !val?.replaceAll(' ', '')) return total

        total.push(val)
        return total
      }, [])
      .join(this.splitStr)
  }

  obtainDependencies(value?: AxiosSelect<T>) {
    if (!value) return []

    return value.map((item) => this.itemConvert.obtainDependencies(item)).flat()
  }

  toStyle(value?: string): AxiosSelect<T> | undefined {
    throw new Error('Method not implemented.')
  }
}
