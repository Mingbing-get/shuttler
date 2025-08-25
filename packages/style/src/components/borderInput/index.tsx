import { useCallback, useEffect, useState } from 'react'

import BorderConvert from '../../convertStyleAndString/borderConvert'
import { BorderDefine } from '../../type'
import { LengthInput, ColorInput } from '..'
import ConstInput, { ConstInputOption } from '../constInput'
import { SolidLineIcon, DashedLineIcon, DottedLineIcon, DoubleLineIcon } from '../../icons'

import './index.scss'

interface Props {
  value?: BorderDefine
  disabled?: boolean
  onChange?: (value: BorderDefine) => void
}

const borderConvert = new BorderConvert()
const borderStyleOptions: ConstInputOption<Required<BorderDefine>['lineStyle']>[] = [
  { value: 'solid', label: '实线', icon: <SolidLineIcon /> },
  { value: 'dashed', label: '虚线', icon: <DashedLineIcon /> },
  { value: 'dotted', label: '点线', icon: <DottedLineIcon /> },
  { value: 'double', label: '双实线', icon: <DoubleLineIcon /> },
]

interface BorderInputSingleChange<K extends keyof BorderDefine = keyof BorderDefine> {
  (key: K, value: BorderDefine[K]): void
}

export default function BorderInput({ value, disabled, onChange }: Props) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue((old) => {
      if (borderConvert.compare(old, value)) return old

      return value
    })
  }, [value])

  const handleChange = useCallback<BorderInputSingleChange>(
    (key, value) => {
      setValue((old) => {
        const newValue = { ...old, [key]: value }
        onChange?.(newValue)
        return newValue
      })
    },
    [onChange]
  )

  return (
    <div className="border-input-wrapper">
      <div className="border-input-item">
        <span>粗细</span>
        <LengthInput
          disabled={disabled}
          value={_value?.width}
          onChange={(val) => handleChange('width', val)}
        />
      </div>
      <div className="border-input-item">
        <span>样式</span>
        <ConstInput
          displayAs="radio"
          disabled={disabled}
          value={_value?.lineStyle}
          options={borderStyleOptions}
          onChange={(val) => handleChange('lineStyle', val)}
        />
      </div>
      <div className="border-input-item">
        <span>颜色</span>
        <ColorInput
          disabled={disabled}
          value={_value?.color || ''}
          onChange={(val) => handleChange('color', val)}
        />
      </div>
    </div>
  )
}
