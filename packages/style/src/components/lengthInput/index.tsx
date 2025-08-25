import { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { InputNumber, Input, Select } from '@arco-design/web-react'

import LengthConvert from '../../convertStyleAndString/lengthConvert'

import { LengthDefine, Unit } from '../../type'

import './index.scss'

export interface Props {
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  excludeUnits?: Unit[]
  value?: LengthDefine
  supportFr?: boolean
  onChange?: (value: LengthDefine) => void
}

const unitOptions: { value: Unit; label: Unit }[] = [
  {
    value: 'px',
    label: 'px',
  },
  {
    value: 'em',
    label: 'em',
  },
  {
    value: 'rem',
    label: 'rem',
  },
  {
    value: '%',
    label: '%',
  },
  {
    value: 'vh',
    label: 'vh',
  },
  {
    value: 'vw',
    label: 'vw',
  },
  {
    value: 'fr',
    label: 'fr',
  },
]

const lengthConvert = new LengthConvert()

export default function LengthInput({ className, style, disabled, excludeUnits, value, supportFr, onChange }: Props) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue((old) => {
      if (lengthConvert.compare(old, value)) return old

      return value
    })
  }, [value])

  const handleChangeValue = useCallback((val?: number) => {
    setValue((old) => ({ unit: old?.unit || 'px', value: val || 0 }))
  }, [])

  const handleChangeUnit = useCallback(
    (val?: Unit) => {
      setValue((old) => {
        const newValue = { unit: val || 'px', value: old?.value || 0 }

        onChange?.(newValue)

        return newValue
      })
    },
    [onChange]
  )

  const handleBlur = useCallback(() => {
    if (!_value) return

    onChange?.(_value)
  }, [_value, onChange])

  const filterUnitOptions = useMemo(() => {
    let leftOptions = unitOptions

    if (excludeUnits) {
      leftOptions = leftOptions.filter((option) => !excludeUnits.includes(option.value))
    }

    if (!supportFr) {
      leftOptions = leftOptions.filter((option) => option.value !== 'fr')
    }

    return leftOptions
  }, [excludeUnits, supportFr])

  return (
    <Input.Group
      compact
      className={classNames('length-input-wrapper', className)}
      style={style}>
      <InputNumber
        size="mini"
        disabled={disabled}
        style={{ flex: 1 }}
        value={_value?.value}
        onChange={handleChangeValue}
        onBlur={handleBlur}
      />
      <Select
        getPopupContainer={() => document.body}
        size="mini"
        disabled={disabled}
        style={{ width: 60 }}
        placeholder="选择单位"
        value={_value?.unit || 'px'}
        options={filterUnitOptions}
        onChange={handleChangeUnit}
      />
    </Input.Group>
  )
}
