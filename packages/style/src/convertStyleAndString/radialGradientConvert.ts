import { Dependency } from '@shuttler/helper'

import IConvert from './convertInterface'
import LengthConvert from './lengthConvert'
import AxiosSelectConvert from './axiosSelectConvert'
import ConstConvert from './constConvert'
import { isStyleExpression, getStyleVar, obtainStyleValueDependencies } from '../utils'

import {
  RadialGradient,
  LengthDefine,
  RadialGradientPosition,
  Direction,
  AxiosSelect,
  StyleVar,
} from '../type'

export default class RadialGradientConvert implements IConvert<RadialGradient> {
  private lengthConvert: LengthConvert
  private lengthAxiosSelectConvert: AxiosSelectConvert<LengthDefine>
  private constAxiosSelectConvert: AxiosSelectConvert<string>

  constructor() {
    this.lengthConvert = new LengthConvert()
    this.lengthAxiosSelectConvert = new AxiosSelectConvert(new LengthConvert())
    this.constAxiosSelectConvert = new AxiosSelectConvert(new ConstConvert())
  }

  compare(v1?: RadialGradient, v2?: RadialGradient): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (isStyleExpression(v1) && isStyleExpression(v2)) return true

    if (isStyleExpression(v1) || isStyleExpression(v2)) return false

    if (v1.shape?.type !== v2.shape?.type) return false

    if (v1.shape && v2.shape) {
      if (v1.shape.type === 'circle' && v2.shape.type === 'circle') {
        if (!this.lengthConvert.compare(v1.shape.r, v2.shape.r)) return false
      }
      if (v1.shape.type === 'ellipse' && v2.shape.type === 'ellipse') {
        if (
          !this.lengthConvert.compare(v1.shape.xr, v2.shape.xr) ||
          !this.lengthConvert.compare(v1.shape.yr, v2.shape.yr)
        )
          return false
      }
    }

    if (v1.position?.length !== v2.position?.length) return false

    if (v1.position && v2.position) {
      if (this.isDirectionPosition(v1.position) !== this.isDirectionPosition(v2.position))
        return false

      if (this.isDirectionPosition(v1.position) && this.isDirectionPosition(v2.position)) {
        if (!this.constAxiosSelectConvert.compare(v1.position, v2.position)) return false
      } else {
        if (!this.lengthAxiosSelectConvert.compare(v1.position as any, v2.position as any))
          return false
      }
    }

    if (!this.lengthConvert.compare(v1.width, v2.width)) return false

    if (v1.colorList?.length !== v2.colorList?.length) return false

    if (v1.colorList && v2.colorList) {
      return v1.colorList.every((item1, index) => {
        const item2 = v2.colorList[index]

        return item1.color === item2.color && Math.abs(item1.position - item2.position) < 1e-8
      })
    }

    return true
  }

  toString(
    value?: RadialGradient,
    styleVarMap?: Record<string, StyleVar.Desc>,
  ): string | undefined {
    if (isStyleExpression(value)) {
      return this.toString(
        getStyleVar<StyleVar.RadialGradientVar>(value, styleVarMap)?.value,
        styleVarMap,
      )
    }

    if (!value?.colorList?.length) return undefined

    const resList: string[] = []

    let str = ''
    if (value.shape) {
      str = `${value.shape.type}`

      if (value.shape.type === 'circle') {
        const r = this.lengthConvert.toString(value.shape.r, styleVarMap)
        if (r) {
          str += ` ${r}`
        }
      } else if (value.shape.type === 'ellipse') {
        let xr = this.lengthConvert.toString(value.shape.xr, styleVarMap)
        let yr = this.lengthConvert.toString(value.shape.yr, styleVarMap)

        if (xr || yr) {
          xr = xr || yr
          yr = yr || xr
          str += ` ${xr} ${yr}`
        }
      }
    }

    if (value.position) {
      if (!value.shape) {
        str = 'circle'
      }

      const position = this.isDirectionPosition(value.position)
        ? this.constAxiosSelectConvert.toString(value.position, styleVarMap)
        : this.lengthAxiosSelectConvert.toString(value.position, styleVarMap)

      if (position) {
        str += ` at ${position}`
      }
    }

    if (str) {
      resList.push(str)
    }

    let hasWidth = false
    value.colorList.forEach((item) => {
      const width = this.lengthConvert.toString(value.width, styleVarMap)
      if (!width || !value.width) {
        resList.push(`${item.color} ${item.position}%`)
      } else {
        hasWidth = true
        resList.push(
          `${item.color} ${this.lengthConvert.toString({ value: (item.position * value.width.value) / 100, unit: value.width.unit }, styleVarMap)}`,
        )
      }
    })

    if (resList.length === 1) {
      resList.push(resList[0])
    }

    return `${hasWidth ? 'repeating-radial-gradient' : 'radial-gradient'}(${resList.join(', ')})`
  }

  obtainDependencies(value?: RadialGradient) {
    if (isStyleExpression(value)) {
      return obtainStyleValueDependencies(value)
    }

    if (!value?.colorList?.length) {
      return []
    }

    const deps: Pick<Dependency, 'refType' | 'refPath'>[] = []
    if (value.shape) {
      if (value.shape.type === 'circle') {
        deps.push(...this.lengthConvert.obtainDependencies(value.shape.r))
      } else if (value.shape.type === 'ellipse') {
        deps.push(...this.lengthConvert.obtainDependencies(value.shape.xr))
        deps.push(...this.lengthConvert.obtainDependencies(value.shape.yr))
      }
    }

    if (value.position) {
      const positionDeps = this.isDirectionPosition(value.position)
        ? this.constAxiosSelectConvert.obtainDependencies(value.position)
        : this.lengthAxiosSelectConvert.obtainDependencies(value.position)

      deps.push(...positionDeps)
    }

    deps.push(...this.lengthConvert.obtainDependencies(value.width))

    return deps
  }

  isDirectionPosition(position: RadialGradientPosition): position is AxiosSelect<Direction> {
    if (['string'].includes(typeof position[0]) || ['string'].includes(typeof position[1])) {
      return true
    }

    return false
  }

  toStyle(value?: string): RadialGradient | undefined {
    throw new Error('Method not implemented.')
  }
}
