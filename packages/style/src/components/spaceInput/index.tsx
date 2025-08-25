import { useCallback, useEffect, useMemo, useState } from 'react'

import Toggle from '../../baseComponents/toggle'
import LengthInput from '../lengthInput'
import { ConstLength, LengthDefine, SpaceDefine } from '../../type'
import SpaceConvert from '../../convertStyleAndString/spaceConvert'
import ConstInput, { ConstInputOption } from '../constInput'
import { AutoIcon, FitContentIcon, MinContentIcon, MaxContentIcon } from '../../icons'

const constSpaceOptions: ConstInputOption<ConstLength>[] = [
  {
    value: 'auto',
    label: '自动',
    icon: <AutoIcon />,
  },
  {
    value: 'min-content',
    label: '最小内容',
    icon: <MinContentIcon />,
  },
  {
    value: 'max-content',
    label: '最大内容',
    icon: <MaxContentIcon />,
  },
  {
    value: 'fit-content',
    label: '适应内容',
    icon: <FitContentIcon />,
  },
]

export interface Props {
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  value?: SpaceDefine
  supportFr?: boolean
  onChange?: (value: SpaceDefine) => void
}

const spaceConvert = new SpaceConvert()

export default function SpaceInput({ style, className, disabled, value, supportFr, onChange }: Props) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue((old) => {
      if (spaceConvert.compare(old, value)) old

      return value
    })
  }, [value])

  const showMain = useMemo(() => {
    if (typeof _value === 'string' || typeof _value === 'undefined') return true

    return false
  }, [_value])

  const constValue = useMemo(() => {
    if (showMain) return (_value as ConstLength) || 'auto'

    return 'auto'
  }, [_value, showMain])

  const lengthValue = useMemo(() => {
    if (!showMain) return _value as LengthDefine

    return undefined
  }, [_value, showMain])

  const handleChange = useCallback(
    (val: SpaceDefine) => {
      setValue(val)
      onChange?.(val)
    },
    [onChange]
  )

  const handleToggle = useCallback(
    (showMain: boolean) => {
      if (showMain) {
        handleChange('auto')
      } else {
        handleChange({ value: 0, unit: 'px' })
      }
    },
    [handleChange]
  )

  return (
    <Toggle
      style={style}
      className={className}
      disabled={disabled}
      showMain={showMain}
      onToggle={handleToggle}
      mainChild={
        <ConstInput
          disabled={disabled}
          displayAs="radio"
          value={constValue}
          onChange={(val) => showMain && handleChange(val as SpaceDefine)}
          options={constSpaceOptions}
        />
      }
      secondChild={
        <LengthInput
          supportFr={supportFr}
          disabled={disabled}
          value={lengthValue}
          onChange={(val) => !showMain && handleChange(val as SpaceDefine)}
        />
      }
    />
  )
}
