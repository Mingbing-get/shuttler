import { Dependency } from '@shuttler/helper'

import { StyleDefine, ClassName, StyleVar } from '../type'
import { defaultConvertStore } from '../defaultConvertStore'
import proLabelConfig from '../proLabelConfig'

export default class StyleConvert {
  compare(v1?: StyleDefine, v2?: StyleDefine): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    for (const _key in v1) {
      const key = _key as keyof StyleDefine
      const convert = this.getConvert(key)

      if (!convert.compare(v1[key] as any, v2[key] as any)) return false
    }

    return true
  }

  toString(
    value?: StyleDefine,
    styleVarMap?: Record<string, StyleVar.Desc>,
  ): React.CSSProperties | undefined {
    if (!value) return undefined

    const result: Record<string, string | undefined> = {}

    for (const _key in value) {
      const key = _key as keyof StyleDefine
      const convert = this.getConvert(key)

      result[key] = convert.toString(value[key] as any, styleVarMap)
    }

    return result
  }

  obtainDependencies(value?: StyleDefine): Dependency[] {
    if (!value) return []

    const deps: Dependency[] = []
    for (const _key in value) {
      const key = _key as keyof StyleDefine
      const convert = this.getConvert(key)
      const label = this.getLabel(key)

      deps.push(
        ...convert.obtainDependencies(value[key]).map((item) => ({
          ...item,
          sourceType: 'style',
          sourcePath: [{ value: key, label }],
        })),
      )
    }

    return deps
  }

  globalStyleToString(
    classNames: Record<string, ClassName>,
    styleVarMap?: Record<string, StyleVar.Desc>,
    prefix?: string[],
  ): string {
    const styleList: string[] = []

    for (const key in classNames) {
      const cssMap = this.toString(classNames[key].value, styleVarMap)
      const cssHoverMap = this.toString(classNames[key].hoverValue, styleVarMap)

      if (cssMap) {
        const str = this.cssMapToString(cssMap)
        const prefixStr = prefix ? prefix.join('') : ''
        styleList.push(`.${prefixStr}${key} {${str}}`)
      }

      if (cssHoverMap) {
        const str = this.cssMapToString(cssHoverMap)
        const prefixStr = prefix ? prefix.join('') : ''
        styleList.push(`.${prefixStr}${key}:hover {${str}}`)
      }
    }

    return styleList.join(' ')
  }

  cssMapToString(cssMap: React.CSSProperties) {
    const cssList: string[] = []

    for (const key in cssMap) {
      const middleLineKey = key.replace(/[A-Z]/g, (chart) => `-${chart.toLowerCase()}`)
      cssList.push(`${middleLineKey}:${(cssMap as Record<string, string>)[key]}`)
    }

    return cssList.join(';')
  }

  classNameToString(classNameList: string[]) {
    return classNameList.join(' ')
  }

  getConvert(type: keyof StyleDefine) {
    const convertDesc = defaultConvertStore.find((item) => item.proList.includes(type))
    if (!convertDesc) {
      throw new Error(`未定义${type}转换器`)
    }

    return convertDesc.convert
  }

  getLabel(type: keyof StyleDefine) {
    return proLabelConfig[type]
  }

  toStyle(value?: string): StyleDefine | undefined {
    throw new Error('Method not implemented.')
  }
}
