import { useCallback, useEffect, useMemo, useState } from 'react'
import { Select, SelectProps } from '@arco-design/web-react'

import Toggle from '../../baseComponents/toggle'
import ReadFileBase64 from '../../baseComponents/readFileBase64'
import { ConstCursor, CursorImg } from '../../type'
import CursorConvert from '../../convertStyleAndString/cursorConvert'

type CursorType = ConstCursor | CursorImg

interface Props {
  value?: CursorType
  disabled?: boolean
  onChange?: (value?: CursorType) => void
}

const convert = new CursorConvert()

const cursorOptions = [
  'auto',
  'default',
  'none',
  'context-menu',
  'help',
  'pointer',
  'progress',
  'wait',
  'cell',
  'crosshair',
  'text',
  'vertical-text',
  'alias',
  'copy',
  'move',
  'no-drop',
  'not-allowed',
  'e-resize',
  'n-resize',
  'ne-resize',
  'nw-resize',
  's-resize',
  'se-resize',
  'sw-resize',
  'w-resize',
  'ew-resize',
  'ns-resize',
  'nesw-resize',
  'nwse-resize',
  'col-resize',
  'row-resize',
  'all-scroll',
  'zoom-in',
  'zoom-out',
  'grab',
  'grabbing',
].map((item) => ({ value: item, label: item }))

export default function CursorInput({ value, disabled, onChange }: Props) {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue((old) => {
      if (convert.compare(old, value)) return old

      return value
    })
  }, [value])

  const handleToggle = useCallback(
    (showMain: boolean) => {
      const newValue: CursorType = showMain ? 'default' : { type: 'img', src: '' }
      setValue(newValue)
      onChange?.(newValue)
    },
    [onChange]
  )

  const handleChange = useCallback(
    (newValue: CursorType) => {
      setValue(newValue)
      onChange?.(newValue)
    },
    [onChange]
  )

  const showMain = useMemo(() => {
    if (typeof _value === 'string' || typeof _value === 'undefined') return true

    return false
  }, [_value])

  const mainValue = useMemo(() => {
    if (typeof _value === 'string') return _value

    return 'default'
  }, [_value])

  const secondValue = useMemo(() => {
    if (!_value) return undefined
    if (typeof _value === 'string' || !_value.src) return undefined

    return _value.src
  }, [_value])

  return (
    <Toggle
      showMain={showMain}
      disabled={disabled}
      mainChild={
        <Select
          getPopupContainer={() => document.body}
          size="mini"
          disabled={disabled}
          style={{ border: 'none', width: '100%', minWidth: '6rem' }}
          value={mainValue}
          options={cursorOptions as SelectProps['options']}
          onChange={handleChange}
        />
      }
      secondChild={
        <ReadFileBase64
          disabled={disabled}
          style={{ paddingRight: 8 }}
          value={secondValue}
          onChange={(val) => handleChange({ type: 'img', src: val || '' })}
        />
      }
      onToggle={handleToggle}
    />
  )
}
