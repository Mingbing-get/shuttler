import { useCallback, useEffect, useMemo, useState } from 'react'

import { SpaceDefine } from '../../type'
import { SpaceInput } from '../'
import ArrayRender from '../../baseComponents/arrayRender'
import ArrayConvert from '../../convertStyleAndString/arrayConvert'
import SpaceConvert from '../../convertStyleAndString/spaceConvert'

interface Props {
  disabled?: boolean
  value?: SpaceDefine[]
  supportFr?: boolean
  onChange?: (value: SpaceDefine[]) => void
}

export default function ArraySpaceInput({ value, disabled, supportFr, onChange }: Props) {
  const [_value, setValue] = useState(value)

  const convert = useMemo(() => {
    return new ArrayConvert(new SpaceConvert())
  }, [])

  useEffect(() => {
    setValue((old) => {
      if (convert.compare(old, value)) return old

      return value
    })
  }, [value])

  const handleChange = useCallback(
    (value: SpaceDefine[]) => {
      setValue(value)
      onChange?.(value)
    },
    [onChange]
  )

  const handleAdd = useCallback(() => {
    setValue((old) => {
      const newValue = [...(old || [])]
      newValue.push('auto')

      onChange?.(newValue)

      return newValue
    })
  }, [onChange])

  return (
    <ArrayRender
      InputRender={(props) => (
        <SpaceInput
          {...props}
          supportFr={supportFr}
          disabled={disabled}
        />
      )}
      value={_value}
      onChange={handleChange}
      onAdd={handleAdd}
    />
  )
}
