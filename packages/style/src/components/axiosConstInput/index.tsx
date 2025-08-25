import { useMemo } from 'react'

import { AxiosSelect as AxiosSelectType } from '../../type'
import ConstConvert from '../../convertStyleAndString/constConvert'
import DirectionPick from '../../baseComponents/directionPick'
import ConstInput from '../constInput'

interface Props<T extends string> {
  disabled?: boolean
  value?: AxiosSelectType<T>
  displayAs?: 'select' | 'radio'
  onChange?: (value: AxiosSelectType<T>) => void
  options: { value: T; label?: string }[]
}

export default function AxiosConstInput<T extends string>({ value, disabled, displayAs, onChange, options }: Props<T>) {
  const convert = useMemo(() => {
    return new ConstConvert<T>()
  }, [])

  return (
    <DirectionPick
      mode="axios"
      InputRender={(props) => (
        <ConstInput
          displayAs={displayAs}
          options={options}
          value={props.value}
          disabled={disabled}
          onChange={(item) => props.onChange?.(item as T)}
        />
      )}
      value={value}
      onChange={onChange}
      convert={convert}
    />
  )
}
