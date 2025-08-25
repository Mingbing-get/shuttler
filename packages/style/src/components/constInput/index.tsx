import { Select, Popover, SelectProps } from '@arco-design/web-react'
import classNames from 'classnames'

import './index.scss'

export interface ConstInputOption<T extends string> {
  value: T
  icon?: React.ReactNode
  label?: string
}

interface Props<T extends string> {
  disabled?: boolean
  value?: T
  defaultValue?: T
  onChange?: (value?: T) => void
  displayAs?: 'select' | 'radio'
  options: ConstInputOption<T>[]
}

export default function ConstInput<T extends string>({ disabled, value, defaultValue, displayAs = 'select', options, onChange }: Props<T>) {
  if (displayAs === 'radio') {
    return (
      <div className="east-coder-const-input-radio">
        {options.map((item) => (
          <Popover
            getPopupContainer={() => document.body}
            key={item.value}
            disabled={!item.icon || !item.label}
            trigger="hover"
            content={item.label}>
            <span
              onClick={() => value !== item.value && onChange?.(item.value)}
              className={classNames('east-coder-const-input-radio-item', value === item.value && 'is-active')}>
              {item.icon || item.label}
            </span>
          </Popover>
        ))}
      </div>
    )
  }

  return (
    <Select
      getPopupContainer={() => document.body}
      size="mini"
      disabled={disabled}
      options={options as SelectProps['options']}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    />
  )
}
