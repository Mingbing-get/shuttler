import { Multilingual } from '@shuttler/i18n'

export type Unit = 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw' | 'fr'

export type ConstLength = 'auto' | 'min-content' | 'max-content' | 'fit-content'

export type ConstCursor =
  | 'auto'
  | 'default'
  | 'none'
  | 'context-menu'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'cell'
  | 'crosshair'
  | 'text'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'move'
  | 'no-drop'
  | 'not-allowed'
  | 'e-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'col-resize'
  | 'row-resize'
  | 'all-scroll'
  | 'zoom-in'
  | 'zoom-out'
  | 'grab'
  | 'grabbing'

export interface CursorImg {
  type: 'img'
  src: string
}

export interface LengthDefine<T extends Unit = Unit> {
  value: number
  unit: T
}

export type Direction = 'left' | 'top' | 'bottom' | 'right' | 'center'

export type DirectionSelect<T> = [T?, T?, T?, T?]

export type AxiosSelect<T> = [T?, T?]

export type Color = string

export interface LinearGradient {
  angle?: number
  width?: LengthDefine
  colorList: {
    color: Color
    position: number
  }[]
}

export type ConstShape = {
  type: 'closest-corner' | 'closest-side' | 'farthest-corner' | 'farthest-side'
}
export type CircleShape = {
  type: 'circle'
  r?: LengthDefine
}
export type EllipseShape = {
  type: 'ellipse'
  xr?: LengthDefine
  yr?: LengthDefine
}

export type RadialGradientShape = ConstShape | CircleShape | EllipseShape
export type RadialGradientPosition =
  | AxiosSelect<Direction>
  | AxiosSelect<LengthDefine<Exclude<Unit, '%'>>>

export interface RadialGradient {
  shape?: RadialGradientShape
  position?: RadialGradientPosition
  width?: LengthDefine
  colorList: {
    color: Color
    position: number
  }[]
}

export type BGImgDefine = {
  src?: string
  size?: 'auto' | 'cover' | 'contain' | AxiosSelect<LengthDefine>
  // box?: 'border-box' | 'padding-box' | 'content-box'
  position?: AxiosSelect<Direction> | AxiosSelect<LengthDefine>
  repeat?: AxiosSelect<'stretch' | 'repeat' | 'space' | 'round' | 'no-repeat'>
  attachment?: 'scroll' | 'fixed' | 'local'
}

export type BgColor = { type: 'color'; value: Color }

export type BGImage =
  | {
      type: 'img'
      value: BGImgDefine
    }
  | {
      type: 'linearGradient'
      value: LinearGradient
    }
  | {
      type: 'radialGradient'
      value: RadialGradient
    }

export type BackgroundDefine = BGImage[] | [...BGImage[], BgColor]

export interface BoxShadow {
  isInset?: boolean
  offsetX?: LengthDefine
  offsetY?: LengthDefine
  blurRadius?: LengthDefine
  spreadRadius?: LengthDefine
  color?: Color
}

export type SpaceDefine = LengthDefine | ConstLength

export type DisplayDefine = '' | 'flex' | 'inline-flex' | 'inline-grid' | 'grid'
export type FlexDirectionDefine = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type FlexWrapDefine = 'nowrap' | 'wrap'
export type AlignItemsDefine = 'start' | 'center' | 'end' | 'stretch'
export type JustifyContentDefine =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'space-around'
  | 'space-between'
export type GridAutoFlowDefine = 'row' | 'column' | 'row dense' | 'column dense'

export type BorderLineStyle = 'dashed' | 'solid' | 'dotted' | 'double'

export interface BorderDefine {
  width?: LengthDefine
  lineStyle?: BorderLineStyle
  color?: Color
}

export type UndefinedNumber = number | undefined
export type Number3D = [UndefinedNumber, UndefinedNumber, UndefinedNumber]
export interface Rotate3D {
  type: 'rotate3D'
  value: Tuple4<UndefinedNumber>
}
export interface Translate3D {
  type: 'translate3D'
  value: Number3D
}
export interface Scale3D {
  type: 'scale3D'
  value: Number3D
}
export type TransformDefine = Rotate3D | Translate3D | Scale3D
type Tuple4<TItem> = [TItem, ...TItem[]] & { length: 4 }
export type Matrix4D = Tuple4<Tuple4<number>>

export interface TransitionDefine {
  property:
    | 'all'
    | 'width'
    | 'height'
    | 'margin'
    | 'padding'
    | 'border-radius'
    | 'color'
    | 'background'
    | 'transform'
  duration?: number
  function?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out'
}

export type PositionDefine = 'static' | 'absolute' | 'fixed' | 'relative' | 'sticky'

export type FontFamilyName =
  | 'SimSun'
  | 'SimHei'
  | 'KaiTi'
  | 'FangSong'
  | 'YouYuan'
  | 'STSong'
  | 'STHeiti'
  | 'STKaiti'
  | 'STFangsong'
  | 'STXihei'
  | 'STXingkai'
  | 'STZhongsong'
  | 'monospace'
  | 'cursive'
  | 'fantasy'
  | 'system-ui'
  | 'ui-monospace'
  | 'ui-rounded'
  | 'math'
  | 'fangsong'
  | 'Microsoft YaHei'
  | 'Arial'
  | 'Helvetica'
  | 'Tahoma'
  | 'Verdana'
  | 'Trebuchet MS'
  | 'Times New Roman'
  | 'Georgia'
  | 'Courier New'
  | 'Arial Black'
  | 'Impact'
  | 'Lucida Sans Unicode'
  | 'Lucida Grande'
  | 'Palatino Linotype'
  | 'Book Antiqua'

export interface FilterDefine {
  function:
    | 'blur'
    | 'brightness'
    | 'contrast'
    | 'grayscale'
    | 'hue-rotate'
    | 'invert'
    | 'opacity'
    | 'saturate'
    | 'sepia'
  blurValue?: LengthDefine
  percentage?: number
  rotate?: number
}

export interface StyleDefine {
  display?: DisplayDefine
  flexDirection?: FlexDirectionDefine
  flexWrap?: FlexWrapDefine
  gap?: LengthDefine
  alignItems?: AlignItemsDefine
  justifyContent?: JustifyContentDefine
  gridAutoFlow?: GridAutoFlowDefine
  gridTemplate?: AxiosSelect<SpaceDefine[]>
  gridGap?: AxiosSelect<LengthDefine>
  flex?: number

  width?: SpaceDefine
  maxWidth?: SpaceDefine
  minWidth?: SpaceDefine
  height?: SpaceDefine
  maxHeight?: SpaceDefine
  minHeight?: SpaceDefine

  margin?: DirectionSelect<LengthDefine>
  padding?: DirectionSelect<LengthDefine>

  borderWidth?: DirectionSelect<LengthDefine>
  borderStyle?: DirectionSelect<BorderLineStyle>
  borderColor?: DirectionSelect<Color>
  outline?: BorderDefine
  borderRadius?: DirectionSelect<LengthDefine>

  position?: PositionDefine
  top?: LengthDefine
  right?: LengthDefine
  bottom?: LengthDefine
  left?: LengthDefine
  zIndex?: number

  color?: Color
  opacity?: number
  background?: BackgroundDefine
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | 'text'
  filter?: FilterDefine[]

  fontSize?: LengthDefine
  fontWeight?: 'normal' | 'bold'
  fontStyle?: 'normal' | 'italic'
  fontFamily?: FontFamilyName[]

  boxSizing?: 'content-box' | 'border-box'
  boxShadow?: BoxShadow[]
  cursor?: ConstCursor | CursorImg
  overflow?: AxiosSelect<'unset' | 'hidden' | 'visible' | 'auto' | 'scroll'>

  transform?: TransformDefine[]
  transition?: TransitionDefine[]
}

export interface FieldRenderProps<T> {
  label: string
  value?: T
  disabled?: boolean
  style?: StyleDefine
  onChange?: (value?: T) => void
  onChangeStyle?: (style?: StyleDefine) => void
  onMergeStyle?: (style?: StyleDefine) => void
}

export interface StyleRenderConfig {
  groupLabelMap: Record<string, string>
  fieldRender: {
    [key in keyof StyleDefine]: {
      groupKey: string
      label: string
      Render: (props: FieldRenderProps<StyleDefine[key]>) => React.ReactNode
    }
  }
}

// StyleVar
export type StyleExpression = {
  type: 'style_express'
  styleVarId?: string
}

export namespace StyleVar {
  export type Type =
    | 'length'
    | 'space'
    | 'color'
    | 'linearGradient'
    | 'radialGradient'
    | 'boxShadow'
    | 'transform'

  export interface Base<T extends Type, V> {
    type: T
    alias?: Multilingual
    value?: V
    disabled?: boolean
  }

  export interface Length extends Base<'length', LengthDefine> {}
  export interface Space extends Base<'space', SpaceDefine> {}
  export interface ColorVar extends Base<'color', Color> {}
  export interface LinearGradientVar extends Base<'linearGradient', LinearGradient> {}
  export interface RadialGradientVar extends Base<'radialGradient', RadialGradient> {}
  export interface BoxShadowVar extends Base<'boxShadow', BoxShadow[]> {}
  export interface Transform extends Base<'transform', TransformDefine[]> {}

  export type Desc =
    | Length
    | Space
    | ColorVar
    | LinearGradientVar
    | RadialGradientVar
    | BoxShadowVar
    | Transform
}

// style var group
export interface StyleVarGroup {
  active?: boolean
  disabled?: boolean
  id: string
  alias: Multilingual
  vars: Record<string, StyleVar.Desc>
}

// className
export interface ClassName {
  alias?: Multilingual
  disabled?: boolean
  hoverValue?: StyleDefine
  value?: StyleDefine
}
