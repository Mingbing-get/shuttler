import { useMemo } from 'react'

import { DirectionSelect } from '../../type'
import ConstInput, { ConstInputOption } from '../constInput'
import DirectionPick from '../../baseComponents/directionPick'
import ConstConvert from '../../convertStyleAndString/constConvert'

interface Props<T extends string> {
  value?: DirectionSelect<T>
  disabled?: boolean
  onChange?: (value: DirectionSelect<T>) => void
  options: ConstInputOption<T>[]
}

export default function DirectionConstInput<T extends string>({ value, disabled, onChange, options }: Props<T>) {
  const convert = useMemo(() => {
    return new ConstConvert<T>()
  }, [])

  return (
    <DirectionPick
      InputRender={(props) => (
        <ConstInput
          displayAs="radio"
          disabled={disabled}
          options={options}
          value={props.value}
          onChange={props.onChange as any}
        />
      )}
      value={value}
      onChange={onChange}
      convert={convert}
    />
  )
}
