import { useCallback } from 'react'
import { IconDelete, IconPlus } from '@arco-design/web-react/icon'

import './index.scss'

interface Props<T> {
  disabled?: boolean
  value?: Array<T>
  InputRender: (props: { value?: T; onChange?: (value: T) => void }) => JSX.Element
  onChange?: (value: Array<T>) => void
  onAdd?: () => void
}

export default function ArrayRender<T>({ disabled, value, InputRender, onChange, onAdd }: Props<T>) {
  const handleChange = useCallback(
    (newItem: T, index: number) => {
      const newValue = [...(value || [])]

      newValue.splice(index, 1, newItem)
      onChange?.(newValue)
    },
    [value, onChange]
  )

  const onDelete = useCallback(
    (index: number) => {
      const newValue = [...(value || [])]

      newValue.splice(index, 1)
      onChange?.(newValue)
    },
    [value, onChange]
  )

  return (
    <div className="array-render-wrapper">
      {value?.map((item, index) => (
        <div
          key={index}
          className="array-render-item">
          <InputRender
            value={item}
            onChange={(newItem) => handleChange(newItem, index)}
          />
          {!disabled && (
            <IconDelete
              className="array-render-delete"
              onClick={() => onDelete(index)}
            />
          )}
        </div>
      ))}
      {!disabled && (
        <div className="array-render-item">
          <span>添加子项：</span>
          <IconPlus
            className="array-render-add"
            onClick={onAdd}
          />
        </div>
      )}
    </div>
  )
}
