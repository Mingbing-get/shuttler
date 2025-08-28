import { ShuttlerElement } from './types/element'

export default class ElementManager {
  private elementMap: Record<ShuttlerElement.Type, ShuttlerElement.Desc<any>> = {}

  addElement(ele: ShuttlerElement.Desc<any>) {
    this.elementMap[ele.type] = ele

    return this
  }

  getElementByType<T extends Record<string, any>>(
    type: ShuttlerElement.Type,
  ): ShuttlerElement.Desc<T> | undefined {
    return this.elementMap[type]
  }
}
