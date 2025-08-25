import { useCallback, useEffect, useMemo, useState } from 'react'
import { Popover } from '@arco-design/web-react'
import { IconPlus, IconDelete } from '@arco-design/web-react/icon'

import BgImageInput from '../bgImageInput'
import { BgLinearGradientInput, BgRadialGradientInput, ColorInput } from '../'
import { BackgroundConvert } from '../../convertStyleAndString'
import useStyleContext from '../../context/useStyleContext'
import ConstInput, { ConstInputOption } from '../constInput'

import { BackgroundDefine, BgColor, BGImage } from '../../type'
import { ColorIcon, ImgIcon, LinearGradientIcon, RadialGradientIcon } from '../../icons'

import './index.scss'

interface Props {
  disabled?: boolean
  value?: BackgroundDefine
  onChange?: (value?: BackgroundDefine) => void
}

const backgroundTypeOptions: ConstInputOption<BGImage['type'] | BgColor['type']>[] = [
  { value: 'color', label: '颜色', icon: <ColorIcon /> },
  { value: 'img', label: '图片', icon: <ImgIcon /> },
  { value: 'linearGradient', label: '线性渐变色', icon: <LinearGradientIcon /> },
  { value: 'radialGradient', label: '径向渐变色', icon: <RadialGradientIcon /> },
]

export default function BackgroundInput({ value = [], disabled, onChange }: Props) {
  const [_value, setValue] = useState(value)
  const convert = useMemo(() => new BackgroundConvert(), [])
  const { styleVarMap } = useStyleContext()

  useEffect(() => {
    setValue((old) => {
      if (old.length === 0 && value.length === 0) return old

      return value
    })
  }, [value])

  const handleAdd = useCallback(() => {
    setValue((old) => {
      let newValue: BackgroundDefine = [{ type: 'color', value: '' }]
      if (old.length > 0) {
        newValue = [{ type: 'img', value: {} }, ...old]
      }

      onChange?.(newValue)

      return newValue
    })
  }, [onChange])

  const handleChange = useCallback(
    (val: BgColor | BGImage, index: number) => {
      setValue((old) => {
        const newValue = [...old] as BackgroundDefine
        newValue.splice(index, 1, val)

        onChange?.(newValue)
        return newValue
      })
    },
    [onChange]
  )

  const handleDelete = useCallback(
    (index: number) => {
      setValue((old) => {
        const newValue = [...old] as BackgroundDefine
        newValue.splice(index, 1)

        onChange?.(newValue)
        return newValue
      })
    },
    [onChange]
  )

  return (
    <div className="background-input-wrapper">
      {!disabled && (
        <IconPlus
          className="background-input-add-icon"
          onClick={handleAdd}
        />
      )}

      {_value.map((item, index) => (
        <div
          className="background-input-row"
          key={index}>
          <Popover
            getPopupContainer={() => document.body}
            trigger="click"
            position="rt"
            triggerProps={{
              showArrow: false,
            }}
            content={
              <SingleBackgroundInput
                disabled={disabled}
                isLastItem={index + 1 === _value.length}
                value={item}
                onChange={(val) => handleChange(val, index)}
              />
            }>
            <div className="background-input-row-label">
              <span>{convert.singleToString(item, styleVarMap) ? '已设置' : '未设置'}</span>
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

interface SingleBackgroundInputProps {
  isLastItem?: boolean
  value: BgColor | BGImage
  disabled?: boolean
  onChange?: (value: BgColor | BGImage) => void
}

function SingleBackgroundInput({ value, disabled, isLastItem, onChange }: SingleBackgroundInputProps) {
  const afterFilterOptions = useMemo(() => {
    if (isLastItem) return backgroundTypeOptions

    return backgroundTypeOptions.filter((item) => item.value !== 'color')
  }, [isLastItem])

  const handleToggleType = useCallback(
    (type?: string) => {
      if (type === 'color') {
        onChange?.({ type: 'color', value: '' })
      } else if (type === 'img') {
        onChange?.({ type: 'img', value: {} })
      } else if (type === 'linearGradient') {
        onChange?.({ type: 'linearGradient', value: { colorList: [] } })
      } else {
        onChange?.({ type: 'radialGradient', value: { colorList: [] } })
      }
    },
    [onChange]
  )

  return (
    <div className="single-background-input-wrapper">
      <div className="single-background-input-item">
        <ConstInput
          displayAs="radio"
          disabled={disabled}
          value={value?.type}
          options={afterFilterOptions}
          onChange={handleToggleType}
        />
      </div>
      {value.type === 'color' && (
        <div className="single-background-input-item">
          <ColorInput
            disabled={disabled}
            value={value.value}
            onChange={(val) => onChange?.({ type: 'color', value: val || '' })}
          />
        </div>
      )}
      {value.type === 'img' && (
        <BgImageInput
          disabled={disabled}
          className="single-background-input-item"
          value={value.value}
          onChange={(val) => onChange?.({ type: 'img', value: val })}
        />
      )}
      {value.type === 'linearGradient' && (
        <BgLinearGradientInput
          disabled={disabled}
          className="single-background-input-item"
          value={value.value}
          onChange={(val) => onChange?.({ type: 'linearGradient', value: val })}
        />
      )}
      {value.type === 'radialGradient' && (
        <BgRadialGradientInput
          disabled={disabled}
          className="single-background-input-item"
          value={value.value}
          onChange={(val) => onChange?.({ type: 'radialGradient', value: val })}
        />
      )}
    </div>
  )
}
