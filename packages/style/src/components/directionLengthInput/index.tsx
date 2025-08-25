import { useMemo } from 'react'

import { DirectionSelect, LengthDefine } from '../../type'
import { BlockName } from '../../baseComponents/directionPick/ui'
import DirectionPick from '../../baseComponents/directionPick'
import { LengthInput } from '../'
import LengthConvert from '../../convertStyleAndString/lengthConvert'

interface Props {
  value?: DirectionSelect<LengthDefine>
  disabled?: boolean
  onlySingle?: boolean
  onChange?: (value: DirectionSelect<LengthDefine>, blockName?: BlockName) => void
}

export default function DirectionLengthInput({ value, disabled, onlySingle, onChange }: Props) {
  const convert = useMemo(() => {
    return new LengthConvert()
  }, [])

  return (
    <DirectionPick
      mode={onlySingle ? 'single' : 'all'}
      InputRender={(props) => (
        <LengthInput
          {...props}
          disabled={disabled}
        />
      )}
      value={value}
      onChange={onChange}
      convert={convert}
    />
  )
}
