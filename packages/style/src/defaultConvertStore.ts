import { StyleDefine } from './type'

import IConvert from './convertStyleAndString/convertInterface'
import ColorConvert from './convertStyleAndString/colorConvert'
import ConstConvert from './convertStyleAndString/constConvert'
import SpaceConvert from './convertStyleAndString/spaceConvert'
import LengthConvert from './convertStyleAndString/lengthConvert'
import DirectionSelectConvert from './convertStyleAndString/directionSelectConvert'
import AxiosSelectConvert from './convertStyleAndString/axiosSelectConvert'
import ArrayConvert from './convertStyleAndString/arrayConvert'
import BorderConvert from './convertStyleAndString/borderConvert'
import BoxShadowConvert from './convertStyleAndString/boxShadowConvert'
import CursorConvert from './convertStyleAndString/cursorConvert'
import BackgroundConvert from './convertStyleAndString/backgroundConvert'
import TransformConvert from './convertStyleAndString/transformConvert'
import TransitionConvert from './convertStyleAndString/transitionConvert'
import FilterConvert from './convertStyleAndString/filterConvert'
import NumberConvert from './convertStyleAndString/numberConvert'
import FontFamilyConvert from './convertStyleAndString/fontFamilyConvert'

export interface ConvertDesc {
  proList: (keyof StyleDefine)[]
  type: string
  convert: IConvert<any>
}

export const defaultConvertStore: ConvertDesc[] = [
  {
    proList: ['width', 'maxWidth', 'minWidth', 'height', 'maxHeight', 'minHeight'],
    type: 'spaceConvert',
    convert: new SpaceConvert(),
  },
  {
    proList: ['margin', 'padding', 'borderRadius', 'borderWidth'],
    type: 'lengthDirectionSelectConvert',
    convert: new DirectionSelectConvert(new LengthConvert(), ' ', '0') as any,
  },
  {
    proList: ['color'],
    type: 'colorConvert',
    convert: new ColorConvert(),
  },
  {
    proList: ['fontFamily'],
    type: 'fontFamilyConvert',
    convert: new FontFamilyConvert(),
  },
  {
    proList: ['fontSize', 'gap', 'top', 'left', 'right', 'bottom'],
    type: 'lengthConvert',
    convert: new LengthConvert(),
  },
  {
    proList: ['outline'],
    type: 'borderConvert',
    convert: new BorderConvert(),
  },
  {
    proList: ['borderStyle'],
    type: 'constDirectionSelectConvert',
    convert: new DirectionSelectConvert(new ConstConvert(), ' ', 'none') as any,
  },
  {
    proList: ['borderColor'],
    type: 'colorDirectionSelectConvert',
    convert: new DirectionSelectConvert(new ColorConvert(), ' ', 'none') as any,
  },
  {
    proList: [
      'fontWeight',
      'fontStyle',
      'boxSizing',
      'display',
      'flexDirection',
      'flexWrap',
      'alignItems',
      'justifyContent',
      'gridAutoFlow',
      'position',
      'backgroundClip',
    ],
    type: 'constConvert',
    convert: new ConstConvert(),
  },
  {
    proList: ['zIndex', 'opacity', 'flex'],
    type: 'numberConvert',
    convert: new NumberConvert(),
  },
  {
    proList: ['boxShadow'],
    type: 'boxShadowConvert',
    convert: new BoxShadowConvert(),
  },
  {
    proList: ['gridGap'],
    type: 'lengthAxiosSelectConvert',
    convert: new AxiosSelectConvert(new LengthConvert()) as any,
  },
  {
    proList: ['gridTemplate'],
    type: 'axiosArraySpaceConvert',
    convert: new AxiosSelectConvert(new ArrayConvert(new SpaceConvert()), '/', true) as any,
  },
  {
    proList: ['overflow'],
    type: 'constAxiosSelectConvert',
    convert: new AxiosSelectConvert(new ConstConvert()) as any,
  },
  {
    proList: ['cursor'],
    type: 'cursorConvert',
    convert: new CursorConvert(),
  },
  {
    proList: ['background'],
    type: 'backgroundConvert',
    convert: new BackgroundConvert(),
  },
  {
    proList: ['filter'],
    type: 'filterConvert',
    convert: new FilterConvert(),
  },
  {
    proList: ['transition'],
    type: 'transitionConvert',
    convert: new TransitionConvert(),
  },
  {
    proList: ['transform'],
    type: 'transformConvert',
    convert: new TransformConvert(),
  },
]
