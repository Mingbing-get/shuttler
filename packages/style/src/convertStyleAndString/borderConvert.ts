import IConvert from './convertInterface'
import ColorConvert from './colorConvert'
import ConstConvert from './constConvert'
import LengthConvert from './lengthConvert'

import { BorderDefine, StyleVar } from '../type'

export default class BorderConvert implements IConvert<BorderDefine> {
  private colorConvert: ColorConvert
  private constConvert: ConstConvert
  private lengthConvert: LengthConvert

  constructor() {
    this.colorConvert = new ColorConvert()
    this.constConvert = new ConstConvert()
    this.lengthConvert = new LengthConvert()
  }

  compare(v1?: BorderDefine, v2?: BorderDefine): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (!this.lengthConvert.compare(v1.width, v2.width)) return false

    if (!this.colorConvert.compare(v1.color, v2.color)) return false

    if (!this.constConvert.compare(v1.lineStyle, v2.lineStyle)) return false

    return true
  }

  toString(value?: BorderDefine, styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return

    const width = this.lengthConvert.toString(value.width, styleVarMap) || '1px'
    const style = this.constConvert.toString(value.lineStyle, styleVarMap) || 'solid'
    const color = this.colorConvert.toString(value.color, styleVarMap) || '#ccc'

    return `${width} ${style} ${color}`
  }

  obtainDependencies(value?: BorderDefine) {
    if (!value) return []

    return [
      ...this.lengthConvert.obtainDependencies(value.width),
      ...this.constConvert.obtainDependencies(value.lineStyle),
      ...this.colorConvert.obtainDependencies(value.color),
    ]
  }

  toStyle(value?: string): BorderDefine | undefined {
    throw new Error('Method not implemented.')
  }
}
