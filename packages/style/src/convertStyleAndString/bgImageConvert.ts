import IConvert from './convertInterface'
import AxiosSelectConvert from './axiosSelectConvert'
import LengthConvert from './lengthConvert'
import ConstConvert from './constConvert'

import { BGImgDefine, LengthDefine, AxiosSelect, Direction, StyleVar } from '../type'

export default class BgImageConvert implements IConvert<BGImgDefine> {
  private lengthAxiosConvert: AxiosSelectConvert<LengthDefine>
  private constAxiosConvert: AxiosSelectConvert<string>

  constructor() {
    this.lengthAxiosConvert = new AxiosSelectConvert(new LengthConvert())
    this.constAxiosConvert = new AxiosSelectConvert(new ConstConvert())
  }

  compare(v1?: BGImgDefine, v2?: BGImgDefine): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (v1.src !== v2.src) return false

    if (typeof v1.size === 'string' || typeof v2.size === 'string') {
      if (v1.size !== v2.size) return false
    } else {
      if (!this.lengthAxiosConvert.compare(v1.size, v2.size)) return false
    }

    if (!this.constAxiosConvert.compare(v1.repeat, v2.repeat)) return false

    if (v1.attachment !== v2.attachment) return false

    if (v1.position?.length !== v2.position?.length) return false

    if (v1.position && v2.position) {
      if (this.isDirectionPosition(v1.position) !== this.isDirectionPosition(v2.position)) return false

      if (this.isDirectionPosition(v1.position) && this.isDirectionPosition(v2.position)) {
        if (!this.constAxiosConvert.compare(v1.position, v2.position)) return false
      } else {
        if (!this.lengthAxiosConvert.compare(v1.position as any, v2.position as any)) return false
      }
    }

    return true
  }

  toString(value?: BGImgDefine, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value?.src) return undefined

    let str = `url(${value.src})`

    const repeat = this.constAxiosConvert.toString(value.repeat, styleVarMap)
    if (repeat) {
      str += ` ${repeat}`
    }

    if (value.attachment) {
      str += ` ${value.attachment}`
    }

    let hasPosition = false
    if (value.position) {
      const position = this.isDirectionPosition(value.position)
        ? this.constAxiosConvert.toString(value.position, styleVarMap)
        : this.lengthAxiosConvert.toString(value.position, styleVarMap)

      if (position) {
        str += ` ${position}`
        hasPosition = true
      }
    }

    if (value.size) {
      if (!hasPosition) {
        str += ` 0 0`
      }

      if (typeof value.size === 'string') {
        str += `/${value.size}`
      } else {
        const size = this.lengthAxiosConvert.toString(value.size, styleVarMap)
        if (size) {
          str += `/${size}`
        }
      }
    }

    return str
  }

  obtainDependencies(value?: BGImgDefine) {
    if (!value?.size) return []

    const deps = this.constAxiosConvert.obtainDependencies(value.repeat)

    if (value.position) {
      const positionDeps = this.isDirectionPosition(value.position)
        ? this.constAxiosConvert.obtainDependencies(value.position)
        : this.lengthAxiosConvert.obtainDependencies(value.position)

      deps.push(...positionDeps)
    }

    if (value.size && typeof value.size !== 'string') {
      const sizeDeps = this.lengthAxiosConvert.obtainDependencies(value.size)
      deps.push(...sizeDeps)
    }

    return deps
  }

  isDirectionPosition(position: AxiosSelect<Direction> | AxiosSelect<LengthDefine>): position is AxiosSelect<Direction> {
    if (['string'].includes(typeof position[0]) || ['string'].includes(typeof position[1])) {
      return true
    }

    return false
  }

  toStyle(value?: string): BGImgDefine | undefined {
    throw new Error('Method not implemented.')
  }
}
