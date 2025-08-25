import { useMemo } from 'react'

import { DirectionSelect, SpaceDefine } from '../../type'
import { SpaceInput } from '../'
import SpaceConvert from '../../convertStyleAndString/spaceConvert'
import DirectionPick from '../../baseComponents/directionPick'

interface Props {
  disabled?: boolean
  value?: DirectionSelect<SpaceDefine>
  onChange?: (value: DirectionSelect<SpaceDefine>) => void
}

export default function DirectionSpaceInput({ value, disabled, onChange }: Props) {
  const convert = useMemo(() => {
    return new SpaceConvert()
  }, [])

  return (
    <DirectionPick
      InputRender={(props) => (
        <SpaceInput
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
