import { useCallback } from 'react'
import { IconPlus, IconDelete } from '@arco-design/web-react/icon'
import { InputNumber, Select } from '@arco-design/web-react'

import { LengthInput } from '..'
import { FilterDefine } from '../../type'

import './index.scss'

export interface Props {
  disabled?: boolean
  value?: FilterDefine[]
  onChange?: (value: FilterDefine[]) => void
}

const options: { value: FilterDefine['function']; label: string }[] = [
  { value: 'blur', label: '模糊' },
  { value: 'brightness', label: '亮度' },
  { value: 'contrast', label: '对比度' },
  { value: 'grayscale', label: '灰度' },
  { value: 'hue-rotate', label: '色相旋转' },
  { value: 'invert', label: '反转' },
  { value: 'opacity', label: '透明度' },
  { value: 'saturate', label: '饱和度' },
  { value: 'sepia', label: '褐色度' },
]

function getLabel(type: FilterDefine['function']) {
  return options.find((item) => item.value === type)?.label
}

export default function TransformInput({ value = [], disabled, onChange }: Props) {
  const handleAdd = useCallback(
    (item: FilterDefine['function']) => {
      onChange?.([{ function: item }, ...value])
    },
    [onChange, value]
  )

  const handleChange = useCallback(
    (index: number, v: FilterDefine['blurValue'] | number) => {
      const newValue = [...value]

      const newItem = { ...newValue[index] }
      if (newItem.function === 'blur') {
        newItem.blurValue = v as FilterDefine['blurValue']
      } else if (newItem.function === 'hue-rotate') {
        newItem.rotate = v as number
      } else {
        newItem.percentage = v as number
      }

      newValue.splice(index, 1, newItem)
      onChange?.(newValue)
    },
    [onChange, value]
  )

  const handleDelete = useCallback(
    (index: number) => {
      const newValue = [...value]

      newValue.splice(index, 1)
      onChange?.(newValue)
    },
    [onChange, value]
  )

  return (
    <div className="filter-input-wrapper">
      {!disabled && (
        <Select
          getPopupContainer={() => document.body}
          options={options}
          triggerProps={{
            showArrow: false,
            position: 'bl',
            trigger: 'hover',
            style: {
              width: 160,
            },
          }}
          value=""
          onChange={handleAdd}
          triggerElement={<IconPlus className="filter-input-add" />}
        />
      )}
      {value.map((item, index) => (
        <div
          className="filter-input-row"
          key={index}>
          <label>{getLabel(item.function)}</label>
          {item.function === 'blur' ? (
            <LengthInput
              disabled={disabled}
              value={item.blurValue}
              onChange={(v) => handleChange?.(index, v)}
            />
          ) : (
            <InputNumber
              disabled={disabled}
              value={item.function === 'hue-rotate' ? item.rotate : item.percentage}
              onChange={(v) => handleChange?.(index, v)}
              suffix={item.function === 'hue-rotate' ? 'deg' : '%'}
              size="mini"
            />
          )}
          {!disabled && (
            <IconDelete
              className="filter-input-delete"
              onClick={() => handleDelete(index)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
