import { ConditionSchema } from '@shuttler/variable'

import { ShuttlerElement } from './element'

export namespace ShuttlerState {
  export type Type = 'root' | 'modal' | 'slot'

  interface BaseEditor<T extends Type> {
    type: T
    alias?: string
    elements: string[]
    classNames?: string[]
    style?: any
  }

  export interface RootEditor extends BaseEditor<'root'> {
    onInit?: any
    onDestroy?: any
  }

  export interface ModalEditor extends BaseEditor<'modal'> {
    onInit?: any
    onDestroy?: any
    header?: any
    placement?: 'center' | 'bottom' | 'top' | 'left' | 'right'
    width?: number
  }

  export interface SlotEditor extends BaseEditor<'slot'> {
    elementId: string
  }

  export type Editor = RootEditor | ModalEditor | SlotEditor

  interface AlwaysVisible {
    type: 'always'
  }

  interface ConditionVisible {
    type: 'condition'
    condition: ConditionSchema.Desc
  }

  export interface Element {
    type: ShuttlerElement.Type
    editorId: string
    slotMap?: Record<string, string[]>
    alias?: string
    props?: Record<string, any>
    visibleCondition?: AlwaysVisible | ConditionVisible
  }

  export interface Desc {
    editorMap: Record<string, Editor>
    elementMap: Record<string, Element>
  }
}
