import { useCallback, useEffect, useMemo, useState } from 'react'

import { DirectionSelect as DirectionSelectType, AxiosSelect as AxiosSelectType } from '../../type'
import { DirectionSelectConvert, IConvert } from '../../convertStyleAndString'
import DirectionPickUi, { BlockName } from './ui'

import './index.scss'

interface FourProps<T> {
  mode?: 'all' | 'single'
  convert: IConvert<T>
  value?: DirectionSelectType<T>
  InputRender: (props: { value?: T; blockName?: BlockName; onChange?: (value: T) => void }) => JSX.Element
  onChange?: (value: DirectionSelectType<T>, blockName?: BlockName) => void
}

interface TwoProps<T> {
  mode: 'axios'
  convert: IConvert<T>
  value?: AxiosSelectType<T>
  InputRender: (props: { value?: T; blockName?: BlockName; onChange?: (value: T) => void }) => JSX.Element
  onChange?: (value: AxiosSelectType<T>, blockName?: BlockName) => void
}

type Props<T> = FourProps<T> | TwoProps<T>

export default function DirectionPick<T>({ mode, convert, value, InputRender, onChange }: Props<T>) {
  const [_value, setValue] = useState<DirectionSelectType<T>>()
  const [blockName, setBlockName] = useState<BlockName>()

  const directionSelectConvert = useMemo(() => {
    return new DirectionSelectConvert(convert)
  }, [convert, mode])

  useEffect(() => {
    setValue((old) => {
      const newValue = mode === 'axios' ? axiosValueToDirectionValue(value) : value

      if (directionSelectConvert.compare(old, newValue)) return old

      return newValue
    })
  }, [value, directionSelectConvert, mode])

  const [curShowSpaceValue, isSame] = useMemo(() => {
    if (!_value) return [undefined, true]

    if (blockName === 'top') return [_value[0], true]
    if (blockName === 'right') return [_value[1], true]
    if (blockName === 'bottom') return [_value[2], true]
    if (blockName === 'left') return [_value[3], true]

    if (blockName === 'col') {
      if (convert.compare(_value[0], _value[2])) return [_value[0], true]
      return [undefined, false]
    }

    if (blockName === 'row') {
      if (convert.compare(_value[1], _value[3])) return [_value[1], true]
      return [undefined, false]
    }

    if (convert.compare(_value[0], _value[1]) && convert.compare(_value[0], _value[2]) && convert.compare(_value[0], _value[3])) {
      return [_value[0], true]
    }

    return [undefined, false]
  }, [blockName, _value, convert])

  const handleChange = useCallback(
    (value: T) => {
      setValue((old) => {
        let newValue: DirectionSelectType<T> = []
        if (blockName === 'top') {
          newValue = directionSelectConvert.mergeValue([value, undefined, undefined, undefined], old)
        } else if (blockName === 'right') {
          newValue = directionSelectConvert.mergeValue([undefined, value, undefined, undefined], old)
        } else if (blockName === 'bottom') {
          newValue = directionSelectConvert.mergeValue([undefined, undefined, value, undefined], old)
        } else if (blockName === 'left') {
          newValue = directionSelectConvert.mergeValue([undefined, undefined, undefined, value], old)
        } else if (blockName === 'col') {
          newValue = directionSelectConvert.mergeValue([value, undefined, value, undefined], old)
        } else if (blockName === 'row') {
          newValue = directionSelectConvert.mergeValue([undefined, value, undefined, value], old)
        } else {
          newValue = [value, value, value, value]
        }

        if (mode === 'axios') {
          onChange?.(directionValueToAxiosValue(newValue) || [], blockName)
        } else {
          onChange?.(newValue, blockName)
        }

        return newValue
      })
    },
    [mode, blockName, directionSelectConvert, onChange]
  )

  return (
    <div className="direction-pick-box">
      <DirectionPickUi
        error={!isSame}
        mode={mode}
        onShow={setBlockName}
      />
      <InputRender
        value={curShowSpaceValue}
        blockName={blockName}
        onChange={handleChange}
      />
    </div>
  )
}

function directionValueToAxiosValue<T>(v?: DirectionSelectType<T>): AxiosSelectType<T> | undefined {
  if (!v) return

  return [v[1], v[0]]
}

function axiosValueToDirectionValue<T>(v?: AxiosSelectType<T>): DirectionSelectType<T> | undefined {
  if (!v) return

  return [v[1], v[0], v[1], v[0]]
}
