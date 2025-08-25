import { useMemo } from 'react'

import { DirectionSelect, Color } from '../../type'
import DirectionPick from '../../baseComponents/directionPick'
import ColorConvert from '../../convertStyleAndString/colorConvert'
import { ColorInput } from '..'

import './index.scss'

interface Props {
  value?: DirectionSelect<Color>
  disabled?: boolean
  onChange?: (value: DirectionSelect<Color>) => void
}

export default function DirectionColorInput({ value, disabled, onChange }: Props) {
  const convert = useMemo(() => {
    return new ColorConvert()
  }, [])

  return (
    <DirectionPick
      InputRender={({ value, onChange }) => (
        <ColorInput
          disabled={disabled}
          value={value || ''}
          onChange={onChange as any}
        />
      )}
      value={value}
      onChange={onChange}
      convert={convert}
    />
  )
}
