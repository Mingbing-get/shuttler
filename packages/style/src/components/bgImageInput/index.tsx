import { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'

import { BGImgDefine, Direction } from '../../type'

import LengthConvert from '../../convertStyleAndString/lengthConvert'
import ConstConvert from '../../convertStyleAndString/constConvert'
import BgImageConvert from '../../convertStyleAndString/bgImageConvert'

import Toggle from '../../baseComponents/toggle'
import ReadFileBase64 from '../../baseComponents/readFileBase64'
import DirectionPick from '../../baseComponents/directionPick'
import { LengthInput } from '../'

import ConstInput, { ConstInputOption } from '../constInput'

import './index.scss'

interface Props {
  disabled?: boolean
  className?: string
  value: BGImgDefine
  onChange?: (value: BGImgDefine) => void
}

interface BgImageInputChange<K extends keyof BGImgDefine = keyof BGImgDefine> {
  (key: K, val: BGImgDefine[K]): void
}

const bgImageConvert = new BgImageConvert()
const lengthConvert = new LengthConvert()
const constConvert = new ConstConvert()
const directionConvert = new ConstConvert<Direction>()

const repeatOptions: ConstInputOption<'stretch' | 'repeat' | 'space' | 'round' | 'no-repeat'>[] = [
  { value: 'stretch', label: '默认' },
  { value: 'repeat', label: '重复' },
  { value: 'space', label: '留白' },
  { value: 'round', label: '缩放' },
  { value: 'no-repeat', label: '无' },
]

const attachmentOptions: ConstInputOption<'scroll' | 'fixed' | 'local'>[] = [
  { value: 'scroll', label: '跟随容器' },
  { value: 'fixed', label: '固定' },
  { value: 'local', label: '跟随内容' },
]

export default function BgImageInput({ disabled, className, value, onChange }: Props) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue((old) => {
      if (bgImageConvert.compare(old, value)) return old

      return value
    })
  }, [value])

  const handleChange = useCallback<BgImageInputChange>(
    (key, val) => {
      setValue((old) => {
        const newValue = { ...old, [key]: val }

        onChange?.(newValue)
        return newValue
      })
    },
    [onChange]
  )

  return (
    <>
      <div className={classNames('bg-image-input-field', className)}>
        <span>图片</span>
        <ReadFileBase64
          disabled={disabled}
          value={_value.src}
          onChange={(val) => handleChange('src', val)}
        />
      </div>
      <div className={classNames('bg-image-input-field', className)}>
        <span>大小</span>
        <BgSizeInput
          disabled={disabled}
          value={value.size}
          onChange={(val) => handleChange('size', val)}
        />
      </div>
      <div className={classNames('bg-image-input-field', className)}>
        <span>位置</span>
        <BgPositionInput
          disabled={disabled}
          value={value.position}
          onChange={(val) => handleChange('position', val)}
        />
      </div>
      <div className={classNames('bg-image-input-field', className)}>
        <span>重复</span>
        <DirectionPick
          mode="axios"
          value={value.repeat}
          convert={constConvert}
          InputRender={(props) => (
            <ConstInput
              displayAs="radio"
              options={repeatOptions}
              value={props.value}
              disabled={disabled}
              onChange={props.onChange as any}
            />
          )}
          onChange={(val) => handleChange('repeat', val as BGImgDefine['repeat'])}
        />
      </div>
      <div className={classNames('bg-image-input-field', className)}>
        <span>滚动</span>
        <ConstInput
          displayAs="radio"
          options={attachmentOptions}
          value={value.attachment || 'scroll'}
          disabled={disabled}
          onChange={(val) => handleChange('attachment', val)}
        />
      </div>
    </>
  )
}

interface BgSizeInputProps {
  value: BGImgDefine['size']
  disabled?: boolean
  onChange?: (value: BGImgDefine['size']) => void
}

const sizeOptions: ConstInputOption<'auto' | 'cover' | 'contain'>[] = [
  { value: 'auto', label: '自动' },
  { value: 'cover', label: '覆盖容器' },
  { value: 'contain', label: '显示全图' },
]

function BgSizeInput({ value, disabled, onChange }: BgSizeInputProps) {
  const handleToggleSize = useCallback(
    (showMain: boolean) => {
      const newVal: BGImgDefine['size'] = showMain ? undefined : []

      onChange?.(newVal)
    },
    [onChange]
  )

  const showMain = useMemo(() => {
    if (typeof value === 'string' || !value) return true

    return false
  }, [value])

  const constValue = useMemo(() => {
    if (typeof value === 'string') return value
  }, [value])

  const axiosValue = useMemo(() => {
    if (typeof value === 'string' || !value) return undefined

    return value
  }, [value])

  return (
    <Toggle
      showMain={showMain}
      disabled={disabled}
      mainChild={
        <ConstInput
          displayAs="radio"
          options={sizeOptions}
          value={constValue}
          disabled={disabled}
          onChange={(val) => onChange?.(val as BGImgDefine['size'])}
        />
      }
      secondChild={
        <DirectionPick
          mode="axios"
          value={axiosValue}
          convert={lengthConvert}
          InputRender={(props) => (
            <LengthInput
              {...props}
              disabled={disabled}
            />
          )}
          onChange={onChange}
        />
      }
      onToggle={handleToggleSize}
    />
  )
}

interface BgPositionInputProps {
  value: BGImgDefine['position']
  disabled?: boolean
  onChange?: (value: BGImgDefine['position']) => void
}

const positionOptions: ConstInputOption<Direction>[] = [
  { value: 'left', label: '左' },
  { value: 'top', label: '上' },
  { value: 'center', label: '居中' },
  { value: 'bottom', label: '下' },
  { value: 'right', label: '右' },
]

function BgPositionInput({ value, disabled, onChange }: BgPositionInputProps) {
  const handleToggleSize = useCallback(
    (showMain: boolean) => {
      const newVal: BGImgDefine['position'] = showMain ? [] : []

      onChange?.(newVal)
    },
    [onChange]
  )

  const showMain = useMemo(() => {
    if (!value?.length) return true

    if (typeof value[0] === 'string') return true

    return false
  }, [value])

  const constValue = useMemo(() => {
    if (!value || bgImageConvert.isDirectionPosition(value)) return value

    return undefined
  }, [value])

  const axiosValue = useMemo(() => {
    if (!value || bgImageConvert.isDirectionPosition(value)) return undefined

    return value
  }, [value])

  const getOptions = useCallback((blockName?: string) => {
    if (blockName === 'row') {
      return positionOptions.filter((item) => !['bottom', 'top'].includes(item.value))
    }

    if (blockName === 'col') {
      return positionOptions.filter((item) => !['left', 'right'].includes(item.value))
    }

    return positionOptions.filter((item) => item.value === 'center')
  }, [])

  return (
    <Toggle
      disabled={disabled}
      showMain={showMain}
      mainChild={
        <DirectionPick
          mode="axios"
          convert={directionConvert}
          value={constValue}
          onChange={onChange}
          InputRender={(props) => (
            <ConstInput
              displayAs="radio"
              disabled={disabled}
              options={getOptions(props.blockName)}
              value={props.value}
              onChange={(item) => props.onChange?.(item as Direction)}
            />
          )}
        />
      }
      secondChild={
        <DirectionPick
          mode="axios"
          value={axiosValue}
          convert={lengthConvert}
          InputRender={(props) => (
            <LengthInput
              {...props}
              disabled={disabled}
            />
          )}
          onChange={onChange}
        />
      }
      onToggle={handleToggleSize}
    />
  )
}
