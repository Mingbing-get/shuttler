import { useMemo } from 'react'

import { AxiosSelect as AxiosSelectType, SpaceDefine } from '../../type'
import DirectionPick from '../../baseComponents/directionPick'

import ArraySpaceInput from '../arraySpaceInput'
import ArrayConvert from '../../convertStyleAndString/arrayConvert'
import SpaceConvert from '../../convertStyleAndString/spaceConvert'

interface Props {
  disabled?: boolean
  value?: AxiosSelectType<SpaceDefine[]>
  supportFr?: boolean
  onChange?: (value: AxiosSelectType<SpaceDefine[]>) => void
}

export default function AxiosLengthInput({ value, disabled, supportFr, onChange }: Props) {
  const convert = useMemo(() => {
    return new ArrayConvert(new SpaceConvert())
  }, [])

  return (
    <DirectionPick
      InputRender={(props) => (
        <ArraySpaceInput
          {...props}
          supportFr={supportFr}
          disabled={disabled}
        />
      )}
      mode="axios"
      value={value}
      onChange={onChange}
      convert={convert}
    />
  )
}
