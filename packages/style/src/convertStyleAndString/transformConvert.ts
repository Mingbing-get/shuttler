import IConvert from './convertInterface'
import { TransformDefine, Rotate3D, Translate3D, Scale3D, Matrix4D, UndefinedNumber, StyleVar } from '../type'
import { isStyleExpression, getStyleVar, obtainStyleValueDependencies } from '../utils'

export default class TransformConvert implements IConvert<TransformDefine[]> {
  compare(v1?: TransformDefine[], v2?: TransformDefine[]): boolean {
    if (v1 === v2) return true

    if (!v1 || !v2) return false

    if (isStyleExpression(v1) && isStyleExpression(v2)) return true

    if (isStyleExpression(v1) || isStyleExpression(v2)) return false

    if (v1.length !== v2.length) return false

    return v1.every((item1, index) => {
      const item2 = v2[index]

      return item1.type === item2.type && this.isSameNumber3D(item1.value, item2.value)
    })
  }

  toString(value?: TransformDefine[], styleVarMap?: Record<string, StyleVar.Desc>): string | undefined {
    if (isStyleExpression(value)) {
      return this.toString(getStyleVar<StyleVar.Transform>(value, styleVarMap)?.value, styleVarMap)
    }

    if (!value?.length) return undefined

    const matrixList = value.map((v) => this.translateItemToMatrix(v))
    const dotMatrix = this.dotMatrix4D(matrixList)

    const v: number[] = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        v[i + j * 4] = dotMatrix[i][j]
      }
    }

    return `matrix3d(${v.join(',')})`
  }

  obtainDependencies(value?: TransformDefine[]) {
    return obtainStyleValueDependencies(value)
  }

  isSameNumber3D(v1: UndefinedNumber[], v2: UndefinedNumber[]) {
    if (v1.length !== v1.length) return false

    return v1.every((v, i) => v === v2[i])
  }

  dotMatrix4D(list: Matrix4D[]): Matrix4D {
    const firstMatrix = list[0]

    for (let i = 1; i < list.length; i++) {
      for (let j = 0; j < 4; j++) {
        const row = [...firstMatrix[j]]
        for (let k = 0; k < 4; k++) {
          const col = [list[i][0][k], list[i][1][k], list[i][2][k], list[i][3][k]]
          firstMatrix[j][k] = this.dotVictor4D(row, col)
        }
      }
    }

    return firstMatrix
  }

  dotVictor4D(v1: number[], v2: number[]) {
    return v1.reduce((total, val, i) => total + val * v2[i], 0)
  }

  translateItemToMatrix(value: Rotate3D | Translate3D | Scale3D) {
    if (value.type === 'rotate3D') {
      return this.rotateToMatrix(value)
    }
    if (value.type === 'translate3D') {
      return this.translateToMatrix(value)
    }
    return this.scaleToMatrix(value)
  }

  rotateToMatrix(value: Rotate3D): Matrix4D {
    const x = value.value[0] || 0
    const y = value.value[1] || 0
    const z = value.value[2] || 0
    const halfA = (((value.value[3] || 0) / 180) * Math.PI) / 2
    const sc = Math.sin(halfA) * Math.cos(halfA)
    const sq = Math.sin(halfA) * Math.sin(halfA)

    return [
      [1 - 2 * (y * y + z * z) * sq, 2 * (x * y * sq - z * sc), 2 * (x * z * sq + y * sc), 0],
      [2 * (x * y * sq + z * sc), 1 - 2 * (x * x + z * z) * sq, 2 * (y * z * sq - x * sc), 0],
      [2 * (x * z * sq - y * sc), 2 * (y * z * sq + x * sc), 1 - 2 * (x * x + y * y) * sq, 0],
      [0, 0, 0, 1],
    ]
  }

  translateToMatrix(value: Translate3D): Matrix4D {
    return [
      [1, 0, 0, value.value[0] || 0],
      [0, 1, 0, value.value[1] || 0],
      [0, 0, 1, value.value[2] || 0],
      [0, 0, 0, 1],
    ]
  }

  scaleToMatrix(value: Scale3D): Matrix4D {
    return [
      [value.value[0] || 1, 0, 0, 0],
      [0, value.value[1] || 1, 0, 0],
      [0, 0, value.value[2] || 1, 0],
      [0, 0, 0, 1],
    ]
  }

  toStyle(value?: string): TransformDefine[] | undefined {
    throw new Error('Method not implemented.')
  }
}
