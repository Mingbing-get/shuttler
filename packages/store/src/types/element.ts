import { VariableSchema } from '@shuttler/variable'
import { StyleDefine } from '@shuttler/style'
import { Multilingual } from '@shuttler/i18n'

import { ShuttlerState } from './state'

export type JSXRender<T> = (props: T) => any

export type PickFunction<T extends Record<string, any>> = {
  [K in keyof T]: Required<T>[K] extends Function ? K : never
}

export type PickObjectFunction<T extends Record<string, any>> = {
  [K in keyof T]: Required<T>[K] extends Record<string, Function> ? K : never
}

export type PickCSSProperties<T extends Record<string, any>> = {
  [K in keyof T]: Required<T>[K] extends {} | string ? K : never
}

export type PickString<T extends Record<string, any>> = {
  [K in keyof T]: Required<T>[K] extends string ? K : never
}

export type UnionOmit<T, K extends keyof T> = T extends any ? Omit<T, K> : never

export type UnionMerge<T, M> = T extends any ? T & M : never

export type ObjectValue<T extends Record<string, any>> = T[keyof T]

export namespace ShuttlerElement {
  export type Type = string

  export type GetAttrTypeInDynamicVariable<P extends Record<string, any>> = (
    attrKey: Exclude<keyof P, ObjectValue<PickFunction<P>>>,
  ) => Promise<VariableSchema.Desc | undefined>
  // 异步变量会传入未转换公式的props，若需要依赖props，所依赖的props不要使用fx
  export type DynamicVariable<P extends Record<string, any>> = (
    props: P,
    getAttrType: GetAttrTypeInDynamicVariable<P>,
  ) => Promise<VariableSchema.Desc | undefined>

  export type VariableWithDynamic<P extends Record<string, any>> =
    | VariableSchema.Desc
    | DynamicVariable<P>

  export interface SetterBaseProps<T = any> {
    disabled?: boolean
    value?: T
    onChange?: (value?: T) => void
  }

  export interface SetterDynamic<V> {
    _type: 'dynamic'
    fn: (props?: Record<string, any>) => V
  }

  type WithSetterDynamic<T extends Record<string, any>> = {
    [K in keyof T]: T[K] | SetterDynamic<T[K]>
  }

  export interface AttrCommon {
    visible?: (props?: Record<string, any>) => boolean
  }

  export interface UiConfig<P extends SetterBaseProps> extends AttrCommon {
    hiddenLabel?: boolean
    disabledFx?: boolean
    setter?: JSXRender<P>
    setterProps?: WithSetterDynamic<Omit<P, 'value' | 'onChange' | 'disabled'>>
  }

  export interface RefVariable extends AttrCommon {
    type: 'ref'
    label: Multilingual
    hiddenLabel?: boolean
    required?: boolean
    canAcceptTypes?: VariableSchema.Desc['type'][]
  }

  export type ElementAttr = UnionMerge<VariableSchema.Desc, UiConfig<any>> | RefVariable
  export type ElementAttrWithApiName = UnionMerge<VariableSchema.Desc, UiConfig<any>>

  export interface AttrDecoratorBaseProps {
    children?: React.ReactNode
  }
  export interface AttrDecorator<P extends Record<string, any>, DP extends AttrDecoratorBaseProps> {
    id: string
    Render: JSXRender<DP>
    props?: Omit<DP, 'children'>
    childrenOfAttr?: Exclude<keyof P, ObjectValue<PickFunction<P>>>[]
    subDecoratorIds?: string[]
  }

  export interface ClassName {
    label: Multilingual
  }

  export interface Style {
    label: Multilingual
    supportModels?: (keyof StyleDefine)[]
    defaultValue?: StyleDefine
  }

  export interface Slot<P extends Record<string, any>> {
    payload?: Record<string, VariableWithDynamic<P>>
    defaultStyle?: StyleDefine
    isMultiple?: boolean
    label: Multilingual
  }

  export interface Event<P extends Record<string, any>> {
    params?: VariableWithDynamic<P>[]
    return?: VariableWithDynamic<P>
    label: Multilingual
  }

  export interface Desc<P extends Record<string, any>> {
    type: Type
    label: Multilingual
    defaultAttr?: Partial<Pick<P, Exclude<keyof P, ObjectValue<PickFunction<P>>>>>
    className?: Partial<Record<ObjectValue<PickString<P>>, ClassName>>
    style?: Partial<Record<ObjectValue<PickCSSProperties<P>>, Style>>
    attr?: Partial<Record<Exclude<keyof P, ObjectValue<PickFunction<P>>>, ElementAttr>>
    attrDecorators?: AttrDecorator<P, any>[]
    event?: Partial<Record<ObjectValue<PickFunction<P>>, Event<P>>>
    slot?: Partial<
      Record<ObjectValue<PickFunction<P>> | ObjectValue<PickObjectFunction<P>>, Slot<P>>
    >
    export?: {
      attr?: Record<string, VariableWithDynamic<P>>
      event?: Record<string, Event<P>>
    }
    onCreate?: (options: OnCreateOptions) => Promise<void>
    Render: JSXRender<P>
  }

  interface OnCreateOptions {
    currentElement: ShuttlerState.Element
    getElementById: (id: string) => ShuttlerState.Element | undefined
    getEditorById: (id: string) => ShuttlerState.Editor | undefined
    createElement: (
      type: string,
      editorId: string,
      defProps?: Record<string, any>,
    ) => Promise<string>
  }

  export interface DataProps {
    [x: `data-${string}`]: string
  }
}
