import { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { InputNumber } from '@arco-design/web-react'
import { useHold } from '@shuttler/helper'

import { LinearGradient } from '../../type'
import ColorListPicker from '../../baseComponents/colorListPicker'
import Toggle from '../../baseComponents/toggle'
import { LengthInput } from '../'

import './index.scss'

export interface Props {
  className?: string
  disabled?: boolean
  value: LinearGradient
  onChange?: (value: LinearGradient) => void
}

interface BgLinearGradientInputChange<K extends keyof LinearGradient = keyof LinearGradient> {
  (key: K, value: LinearGradient[K]): void
}

export default function BgLinearGradientInput({ className, disabled, value, onChange }: Props) {
  const [_value, setValue] = useHold(value, onChange)

  const handleChange = useCallback<BgLinearGradientInputChange>((key, value) => {
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
    <div className="linear-gradient-wrapper">
      <div className={classNames('linear-gradient-field', className)}>
        <span>角度</span>
        <InputNumber
          size="mini"
          disabled={disabled}
          value={_value.angle}
          onChange={(val) => handleChange('angle', val)}
        />
      </div>
      <div className={classNames('linear-gradient-field', className)}>
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
