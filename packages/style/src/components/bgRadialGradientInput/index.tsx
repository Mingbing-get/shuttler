import { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { Select } from '@arco-design/web-react'
import { useHold } from '@shuttler/helper'

import LengthConvert from '../../convertStyleAndString/lengthConvert'
import ConstConvert from '../../convertStyleAndString/constConvert'
import RadialGradientConvert from '../../convertStyleAndString/radialGradientConvert'
import { LengthInput } from '../'
import Toggle from '../../baseComponents/toggle'
import ColorListPicker from '../../baseComponents/colorListPicker'
import { RadialGradient, RadialGradientShape, RadialGradientPosition, Direction } from '../../type'

import DirectionPick from '../../baseComponents/directionPick'
import ConstInput, { ConstInputOption } from '../constInput'

import './index.scss'

export interface Props {
  className?: string
  value: RadialGradient
  disabled?: boolean
  onChange?: (value: RadialGradient) => void
}

interface BgRadialGradientInputChange<K extends keyof RadialGradient = keyof RadialGradient> {
  (key: K, value: RadialGradient[K]): void
}

const lengthConvert = new LengthConvert()
const constConvert = new ConstConvert<Direction>()
const radialConvert = new RadialGradientConvert()

export default function BgRadialGradientInput({ value, disabled, onChange, className }: Props) {
  const [_value, setValue] = useHold(value, onChange)

  const handleChange = useCallback<BgRadialGradientInputChange>((key, value) => {
    setValue((old) => ({
      ...old,
      [key]: value,
    }))
  }, [])

  const showMain = useMemo(() => {
    if (_value.width) return false

    return true
  }, [_value])

  const handleToggle = useCallback((showMain: boolean) => {
    if (showMain) {
      handleChange('width', undefined)
    } else {
      handleChange('width', { value: 0, unit: 'px' })
    }
  }, [])

  return (
    <div className="radial-gradient-wrapper">
      <div className={classNames('radial-gradient-field', className)}>
        <span>形状</span>
        <RadialGradientShapeInput
          disabled={disabled}
          value={_value.shape}
          onChange={(val) => handleChange('shape', val)}
        />
      </div>
      <div className={classNames('radial-gradient-field', className)}>
        <span>位置</span>
        <RadialGradientPositionInput
          disabled={disabled}
          value={_value.position}
          onChange={(val) => handleChange('position', val)}
        />
      </div>
      <div className={classNames('radial-gradient-field', className)}>
        <span>宽度</span>
        <Toggle
          disabled={disabled}
          showMain={showMain}
          mainChild={<span style={{ paddingLeft: 8, fontSize: '0.75rem' }}>无</span>}
          secondChild={
            <LengthInput
              disabled={disabled}
              value={_value.width}
              onChange={(val) => handleChange('width', val)}
            />
          }
          onToggle={handleToggle}
        />
      </div>
      <div className={classNames('linear-gradient-field', className)}>
        <span>颜色</span>
        <ColorListPicker
          disabled={disabled}
          value={_value.colorList}
          onChange={(val) => handleChange('colorList', val)}
        />
      </div>
    </div>
  )
}

interface RadialGradientShapeInputProps {
  value?: RadialGradientShape
  disabled?: boolean
  onChange?: (value?: RadialGradientShape) => void
}
const radialGradientShapeOptions: { value: RadialGradientShape['type']; label: string }[] = [
  { value: 'circle', label: '圆' },
  { value: 'ellipse', label: '椭圆' },
  { value: 'closest-corner', label: '最近角' },
  { value: 'closest-side', label: '最近边' },
  { value: 'farthest-corner', label: '最远角' },
  { value: 'farthest-side', label: '最远边' },
]
function RadialGradientShapeInput({ value, disabled, onChange }: RadialGradientShapeInputProps) {
  const handleChangeType = useCallback(
    (value?: RadialGradientShape['type']) => {
      if (!value) return

      onChange?.({ type: value })
    },
    [onChange],
  )

  return (
    <div className="radial-gradient-shape-input-wrapper">
      <div className="radial-gradient-shape-input-item">
        <Select
          getPopupContainer={() => document.body}
          size="mini"
          disabled={disabled}
          options={radialGradientShapeOptions as any[]}
          value={value?.type || 'circle'}
          onChange={handleChangeType}
        />
      </div>
      {(!value?.type || value?.type === 'circle') && (
        <div className="radial-gradient-shape-input-item">
          <LengthInput
            value={value?.r}
            disabled={disabled}
            onChange={(val) => onChange?.({ type: 'circle', r: val })}
          />
        </div>
      )}
      {value?.type === 'ellipse' && (
        <div className="radial-gradient-shape-input-item">
          <DirectionPick
            mode="axios"
            convert={lengthConvert}
            InputRender={(props) => <LengthInput {...props} disabled={disabled} />}
            value={[value.xr, value.yr]}
            onChange={(val) => onChange?.({ type: 'ellipse', xr: val?.[0], yr: val?.[1] })}
          />
        </div>
      )}
    </div>
  )
}

interface RadialGradientPositionInputProps {
  value?: RadialGradientPosition
  disabled?: boolean
  onChange?: (value?: RadialGradientPosition) => void
}
const directionOptions: ConstInputOption<Direction>[] = [
  { value: 'left', label: '左' },
  { value: 'top', label: '上' },
  { value: 'center', label: '居中' },
  { value: 'bottom', label: '下' },
  { value: 'right', label: '右' },
]
function RadialGradientPositionInput({
  value,
  disabled,
  onChange,
}: RadialGradientPositionInputProps) {
  const showMain = useMemo(() => {
    if (!value?.length) return true

    if (typeof value[0] === 'string') return true

    return false
  }, [value])

  const constValue = useMemo(() => {
    if (!value || radialConvert.isDirectionPosition(value)) return value

    return undefined
  }, [value])

  const axiosValue = useMemo(() => {
    if (!value || radialConvert.isDirectionPosition(value)) return undefined

    return value
  }, [value])

  const handleToggle = useCallback(
    (showMain: boolean) => {
      if (showMain) {
        onChange?.([])
      } else {
        onChange?.([])
      }
    },
    [onChange],
  )

  const getOptions = useCallback((blockName?: string) => {
    if (blockName === 'row') {
      return directionOptions.filter((item) => !['bottom', 'top'].includes(item.value))
    }

    if (blockName === 'col') {
      return directionOptions.filter((item) => !['left', 'right'].includes(item.value))
    }

    return directionOptions.filter((item) => item.value === 'center')
  }, [])

  return (
    <Toggle
      disabled={disabled}
      showMain={showMain}
      mainChild={
        <DirectionPick
          mode="axios"
          convert={constConvert}
          value={constValue}
          onChange={onChange}
          InputRender={(props) => (
            <ConstInput
              displayAs="radio"
              options={getOptions(props.blockName)}
              value={props.value}
              disabled={disabled}
              onChange={(item) => props.onChange?.(item as Direction)}
            />
          )}
        />
      }
      secondChild={
        <DirectionPick
          mode="axios"
          convert={lengthConvert}
          value={axiosValue}
          onChange={(val) => onChange?.(val as any)}
          InputRender={(props) => (
            <LengthInput {...props} disabled={disabled} excludeUnits={['%']} />
          )}
        />
      }
      onToggle={handleToggle}
    />
  )
}
