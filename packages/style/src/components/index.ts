import withExpress from '../baseComponents/withExpression'
import _LengthInput, { Props as LengthInputProps } from './lengthInput'
import _SpaceInput, { Props as SpaceInputProps } from './spaceInput'
import _ColorInput, { Props as ColorInputProps } from './colorInput'
import _BoxShadowInput, { Props as BoxShadowInputProps } from './boxShadowInput'
import _BgLinearGradientInput, { Props as BgLinearGradientInputProps } from './bgLinearGradientInput'
import _BgRadialGradientInput, { Props as BgRadialGradientInputProps } from './bgRadialGradientInput'
import _TransitionInput, { Props as TransitionInputProps } from './transformInput'

export { default as FieldRender } from './fieldRender'

export { default as DirectionSpaceInput } from './directionSpaceInput'
export { default as DirectionLengthInput } from './directionLengthInput'
export { default as DirectionConstInput } from './directionConstInput'
export { default as DirectionColorInput } from './directionColorInput'
export { default as ConstInput } from './constInput'
export { default as NumberInput } from './numberInput'
export { default as BorderInput } from './borderInput'
export { default as AxiosConstInput } from './axiosConstInput'
export { default as AxiosLengthInput } from './axiosLengthInput'
export { default as AxiosArraySpaceInput } from './axiosArraySpaceInput'
export { default as ArraySpaceInput } from './arraySpaceInput'
export { default as CursorInput } from './cursorInput'
export { default as BackgroundInput } from './backgroundInput'
export { default as TransitionInput } from './transitionInput'
export { default as FilterInput } from './filterInput'
export { default as PositionInput } from './positionInput'
export { default as FontFamilyInput } from './fontFamilyInput'

export const LengthInput = withExpress<LengthInputProps>(_LengthInput, 'length')
export const SpaceInput = withExpress<SpaceInputProps>(_SpaceInput, 'space')
export const ColorInput = withExpress<ColorInputProps>(_ColorInput, 'color')
export const BoxShadowInput = withExpress<BoxShadowInputProps>(_BoxShadowInput, 'boxShadow', true)
export const BgLinearGradientInput = withExpress<BgLinearGradientInputProps>(_BgLinearGradientInput, 'linearGradient', true)
export const BgRadialGradientInput = withExpress<BgRadialGradientInputProps>(_BgRadialGradientInput, 'radialGradient', true)
export const TransformInput = withExpress<TransitionInputProps>(_TransitionInput, 'transform', true)
