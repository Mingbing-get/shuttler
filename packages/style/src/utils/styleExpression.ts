import { StyleExpression, StyleVar } from '../type'

export function isStyleExpression(value: any): value is StyleExpression {
  return value?.type === 'style_express'
}

export function getStyleVar<T extends StyleVar.Desc>(value: StyleExpression, styleVarMap?: Record<string, StyleVar.Desc>): T | undefined {
  if (!value.styleVarId) return

  return styleVarMap?.[value.styleVarId] as T
}
