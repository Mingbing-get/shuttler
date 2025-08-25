import { useCallback } from 'react'
import { IconPlus, IconDelete } from '@arco-design/web-react/icon'
import { InputNumber, Select } from '@arco-design/web-react'

import { TransformDefine, Number3D, Rotate3D } from '../../type'

import './index.scss'

export interface Props {
  disabled?: boolean
  value?: TransformDefine[]
  onChange?: (value: TransformDefine[]) => void
}

const options: { value: TransformDefine['type']; label: string }[] = [
  { value: 'translate3D', label: '平移' },
  { value: 'scale3D', label: '缩放' },
  { value: 'rotate3D', label: '旋转' },
]

function getLabel(type: TransformDefine['type']) {
  return options.find((item) => item.value === type)?.label
}

export default function TransformInput({ value = [], disabled, onChange }: Props) {
  const handleAdd = useCallback(
    (item: TransformDefine['type']) => {
      onChange?.([{ type: item, value: [] as any }, ...value])
    },
    [onChange, value]
  )

  const handleChange = useCallback(
    (index: number, v: Number3D | Rotate3D['value']) => {
      const newValue = [...value]

      newValue.splice(index, 1, { ...value[index], value: v as any })
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
    <div className="transform-input-wrapper">
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
          triggerElement={<IconPlus className="transform-input-add" />}
        />
      )}
      {value.map((item, index) => (
        <div
          className="transform-input-row"
          key={index}>
          <div className="transform-input-title">
            <label>{getLabel(item.type)}</label>
            {!disabled && (
              <IconDelete
                className="transform-input-delete"
                onClick={() => handleDelete(index)}
              />
            )}
          </div>

          {item.type === 'rotate3D' ? (
            <Number4DInput
              disabled={disabled}
              value={item.value}
              onChange={(v) => handleChange?.(index, v)}
            />
          ) : (
            <Number3DInput
              suffix={item.type === 'scale3D' ? 'x' : 'px'}
              disabled={disabled}
              value={item.value}
              onChange={(v) => handleChange?.(index, v)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

interface Number3DInputProps {
  value: Number3D
  disabled?: boolean
  suffix?: 'px' | 'x'
  onChange?: (value: Number3D) => void
}
function Number3DInput({ value, disabled, suffix, onChange }: Number3DInputProps) {
  return (
    <>
      <InputNumber
        size="mini"
        prefix="x"
        suffix={suffix}
        disabled={disabled}
        value={value[0]}
        onBlur={(e) => onChange?.([strToNumber(e), value[1], value[2]])}
      />
      <InputNumber
        size="mini"
        prefix="y"
        disabled={disabled}
        value={value[1]}
        suffix={suffix}
        onBlur={(e) => onChange?.([value[0], strToNumber(e), value[2]])}
      />
      <InputNumber
        size="mini"
        prefix="z"
        disabled={disabled}
        value={value[2]}
        suffix={suffix}
        onBlur={(e) => onChange?.([value[0], value[1], strToNumber(e)])}
      />
    </>
  )
}

interface Number4DInputProps {
  value: Rotate3D['value']
  disabled?: boolean
  onChange?: (value: Rotate3D['value']) => void
}
function Number4DInput({ value, disabled, onChange }: Number4DInputProps) {
  return (
    <>
      <InputNumber
        size="mini"
        prefix="x"
        disabled={disabled}
        value={value[0]}
        onBlur={(e) => onChange?.([strToNumber(e), value[1], value[2], value[3]])}
      />
      <InputNumber
        size="mini"
        prefix="y"
        disabled={disabled}
        value={value[1]}
        onBlur={(e) => onChange?.([value[0], strToNumber(e), value[2], value[3]])}
      />
      <InputNumber
        size="mini"
        prefix="z"
        disabled={disabled}
        value={value[2]}
        onBlur={(e) => onChange?.([value[0], value[1], strToNumber(e), value[3]])}
      />
      <InputNumber
        size="mini"
        prefix="deg"
        disabled={disabled}
        value={value[3]}
        onBlur={(e) => onChange?.([value[0], value[1], value[2], strToNumber(e)])}
      />
    </>
  )
}

function strToNumber(e: React.ChangeEvent<HTMLInputElement>) {
  if (e.target.value === '') return undefined

  const num = Number(e.target.value)
  return isNaN(num) ? undefined : num
}
