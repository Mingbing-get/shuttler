import IConvert from './convertInterface'
import LengthConvert from './lengthConvert'
import { StyleVar, FilterDefine } from '../type'

export default class FilterConvert implements IConvert<FilterDefine[]> {
  private lengthConvert: LengthConvert

  constructor() {
    this.lengthConvert = new LengthConvert()
  }

  compare(v1?: FilterDefine[], v2?: FilterDefine[]): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (v1.length !== v2.length) return false

    return v1.every((item, index) => this.isSameFilter(item, v2[index]))
  }

  toString(value?: FilterDefine[], styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return undefined

    const valList = value.reduce((total: string[], item) => {
      const v = this.filterToString(item, styleVarMap)
      if (v) {
        total.push(v)
      }

      return total
    }, [])

    return valList.join(' ')
  }

  obtainDependencies(value?: FilterDefine[]) {
    if (!value) return []

    return value
      .map((item) => {
        if (item?.function !== 'blur') return []

        return this.lengthConvert.obtainDependencies(item.blurValue)
      })
      .flat()
  }

  filterToString(value: FilterDefine, styleVarMap?: Record<string, StyleVar.Desc>) {
    if (!value.function) return

    if (value.function === 'blur') {
      const v = this.lengthConvert.toString(value.blurValue, styleVarMap)

      if (!v) return

      return `blur(${v})`
    }

    if (value.function === 'hue-rotate') {
      if (!value.rotate) return

      return `hue-rotate(${value.rotate}deg)`
    }

    if (!value.percentage) return

    return `${value.function}(${value.percentage}%)`
  }

  isSameFilter(v1: FilterDefine, v2: FilterDefine) {
    if (v1.function !== v2.function) return false

    if (v1.function === 'blur') {
      return this.lengthConvert.compare(v1.blurValue, v2.blurValue)
    }

    if (v1.function === 'hue-rotate') {
      return v1.rotate === v2.rotate
    }

    return v1.percentage === v2.percentage
  }

  toStyle(value?: string): FilterDefine[] | undefined {
    throw new Error('Method not implemented.')
  }
}
