import IConvert from './convertInterface'
import { StyleVar, TransitionDefine } from '../type'

export default class TransitionConvert implements IConvert<TransitionDefine[]> {
  compare(v1?: TransitionDefine[], v2?: TransitionDefine[]): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (v1.length !== v2.length) return false

    return v1.every((item, index) => this.isSameTransition(item, v2[index]))
  }

  toString(value?: TransitionDefine[], styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (!value) return undefined

    const valList = value.reduce((total: string[], item) => {
      const v = this.transitionToString(item)
      if (v) {
        total.push(v)
      }

      return total
    }, [])

    return valList.join(', ')
  }

  obtainDependencies(value?: TransitionDefine[]) {
    return []
  }

  transitionToString(value: TransitionDefine) {
    if (!value.property || !value.duration) return

    const mainVal = `${value.property} ${value.duration}s`

    return value.function ? `${mainVal} ${value.function}` : mainVal
  }

  isSameTransition(v1: TransitionDefine, v2: TransitionDefine) {
    return v1.duration !== v2.duration && v1.property !== v2.property && v1.function !== v2.function
  }

  toStyle(value?: string): TransitionDefine[] | undefined {
    throw new Error('Method not implemented.')
  }
}
