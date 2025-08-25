import { useMemo } from 'react'

import { AxiosSelect as AxiosSelectType, LengthDefine } from '../../type'
import DirectionPick from '../../baseComponents/directionPick'
import { LengthInput } from '../'
import LengthConvert from '../../convertStyleAndString/lengthConvert'

interface Props {
  disabled?: boolean
  value?: AxiosSelectType<LengthDefine>
  onChange?: (value: AxiosSelectType<LengthDefine>) => void
}

export default function AxiosLengthInput({ disabled, value, onChange }: Props) {
  const convert = useMemo(() => {
    return new LengthConvert()
  }, [])

  return (
    <DirectionPick
      mode="axios"
      value={value}
      InputRender={(props) => (
        <LengthInput
          {...props}
          disabled={disabled}
        />
      )}
      onChange={onChange}
      convert={convert}
    />
  )
}
