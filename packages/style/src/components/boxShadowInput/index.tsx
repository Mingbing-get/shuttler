import { useCallback, useEffect, useState } from 'react'
import { IconPlus, IconDelete } from '@arco-design/web-react/icon'
import { Popover, Switch } from '@arco-design/web-react'

import { BoxShadow } from '../../type'
import BoxShadowConvert from '../../convertStyleAndString/boxShadowConvert'

import { LengthInput, ColorInput } from '../'

import './index.scss'

export interface Props {
  value?: BoxShadow[]
  disabled?: boolean
  onChange?: (value?: BoxShadow[]) => void
}

const boxShadowConvert = new BoxShadowConvert()

export default function BoxShadowInput({ value, disabled, onChange }: Props) {
  const [_value, setValue] = useState(value || [])

  useEffect(() => {
    setValue((old) => {
      if (boxShadowConvert.compare(old, value)) return old

      return value || []
    })
  }, [value])

  const handleChange = useCallback(
    (item: BoxShadow, index: number) => {
      setValue((old) => {
        const newVal = [...old]
        newVal.splice(index, 1, item)
        onChange?.(newVal)

        return newVal
      })
    },
    [onChange]
  )

  const handleAdd = useCallback(() => {
    setValue((old) => {
      const newVal = [...old, {}]

      onChange?.(newVal)
      return newVal
    })
  }, [onChange])

  const handleDelete = useCallback(
    (index: number) => {
      setValue((old) => {
        old.splice(index, 1)

        const newValue = [...old]
        onChange?.(newValue)
        return newValue
      })
    },
    [onChange]
  )

  return (
    <div className="box-shadow-input-wrapper">
      {!disabled && (
        <IconPlus
          className="add-box-shadow"
          onClick={handleAdd}
        />
      )}
      {_value.map((item, index) => (
        <div
          className="box-shadow-input-row"
          key={index}>
          <Popover
            trigger="click"
            position="rt"
            triggerProps={{
              showArrow: false,
            }}
            content={
              <RenderSingleBoxShadow
                disabled={disabled}
                value={item}
                onChange={(newItem) => handleChange(newItem, index)}
              />
            }>
            <div className="box-shadow-input-row-label">
              <span>设置</span>
            </div>
          </Popover>

          {!disabled && (
            <IconDelete
              className="delete-icon"
              onClick={() => handleDelete(index)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

interface RenderSingleBoxShadowProps {
  value: BoxShadow
  disabled?: boolean
  onChange?: (value: BoxShadow) => void
}

function RenderSingleBoxShadow({ value, disabled, onChange }: RenderSingleBoxShadowProps) {
  return (
    <div className="box-shadow-single-input-wrapper">
      <div className="box-shadow-single-input-item">
        <span>内阴影</span>
        <Switch
          size="small"
          disabled={disabled}
          checked={value.isInset}
          onChange={(val) => onChange?.({ ...value, isInset: val })}
        />
      </div>
      <div className="box-shadow-single-input-item">
        <span>水平偏移</span>
        <LengthInput
          disabled={disabled}
          value={value.offsetX}
          onChange={(val) => onChange?.({ ...value, offsetX: val })}
        />
      </div>
      <div className="box-shadow-single-input-item">
        <span>垂直偏移</span>
        <LengthInput
          disabled={disabled}
          value={value.offsetY}
          onChange={(val) => onChange?.({ ...value, offsetY: val })}
        />
      </div>
      <div className="box-shadow-single-input-item">
        <span>模糊距离</span>
        <LengthInput
          disabled={disabled}
          value={value.blurRadius}
          onChange={(val) => onChange?.({ ...value, blurRadius: val })}
        />
      </div>
      <div className="box-shadow-single-input-item">
        <span>阴影距离</span>
        <LengthInput
          disabled={disabled}
          value={value.spreadRadius}
          onChange={(val) => onChange?.({ ...value, spreadRadius: val })}
        />
      </div>
      <div className="box-shadow-single-input-item">
        <span>阴影颜色</span>
        <ColorInput
          disabled={disabled}
          value={value.color || ''}
          onChange={(val) => onChange?.({ ...value, color: val })}
        />
      </div>
    </div>
  )
}
