import { useCallback } from 'react'
import { IconPlus, IconDelete } from '@arco-design/web-react/icon'
import { InputNumber } from '@arco-design/web-react'

import { TransitionDefine } from '../../type'
import ConstInput, { ConstInputOption } from '../constInput'

import './index.scss'

interface Props {
  disabled?: boolean
  value?: TransitionDefine[]
  onChange?: (value: TransitionDefine[]) => void
}

const propertyOptions: ConstInputOption<TransitionDefine['property']>[] = [
  { value: 'all', label: '所有' },
  { value: 'transform', label: '变换' },
  { value: 'width', label: '宽' },
  { value: 'height', label: '高' },
  { value: 'margin', label: '外边距' },
  { value: 'padding', label: '内边距' },
  { value: 'border-radius', label: '圆角' },
  { value: 'color', label: '颜色' },
  { value: 'background', label: '背景颜色' },
]
const functionOptions: ConstInputOption<Required<TransitionDefine>['function']>[] = [
  { value: 'linear', label: '匀速' },
  { value: 'ease', label: '快-慢' },
  { value: 'ease-in', label: '慢-快' },
  { value: 'ease-in-out', label: '慢-快-慢' },
]

export default function TransitionInput({ disabled, value = [], onChange }: Props) {
  const handleAdd = useCallback(() => {
    onChange?.([{ property: 'all', function: 'linear' }, ...value])
  }, [value, onChange])

  const handleChange = useCallback(
    (index: number, v: TransitionDefine) => {
      const newValue = [...value]

      newValue.splice(index, 1, v)
      onChange?.(newValue)
    },
    [value, onChange]
  )

  const handleDelete = useCallback(
    (index: number) => {
      const newValue = [...value]

      newValue.splice(index, 1)
      onChange?.(newValue)
    },
    [value, onChange]
  )

  return (
    <div className="transition-input-wrapper">
      {!disabled && (
        <IconPlus
          className="transition-input-add"
          onClick={handleAdd}
        />
      )}
      {value.map((item, index) => (
        <div
          className="transition-input-item"
          key={index}>
          <SingleTransition
            value={item}
            disabled={disabled}
            onChange={(v) => handleChange(index, v)}
          />
          {!disabled && (
            <IconDelete
              className="transition-input-delete"
              onClick={() => handleDelete(index)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

interface SingleTransitionProps {
  value: TransitionDefine
  disabled?: boolean
  onChange?: (value: TransitionDefine) => void
}
function SingleTransition({ value, disabled, onChange }: SingleTransitionProps) {
  return (
    <>
      <div className="transition-input-row">
        <label>属性</label>
        <ConstInput
          disabled={disabled}
          options={propertyOptions}
          value={value.property}
          onChange={(v) => onChange?.({ ...value, property: v || 'all' })}
        />
      </div>
      <div className="transition-input-row">
        <label>时长</label>
        <InputNumber
          size="mini"
          disabled={disabled}
          suffix="s"
          step={null as any}
          defaultValue={value.duration}
          onBlur={(e) => onChange?.({ ...value, duration: strToNumber(e) })}
        />
      </div>
      <div className="transition-input-row">
        <label>动画</label>
        <ConstInput
          disabled={disabled}
          options={functionOptions}
          value={value.function}
          onChange={(v) => onChange?.({ ...value, function: v })}
        />
      </div>
    </>
  )
}

function strToNumber(e: React.ChangeEvent<HTMLInputElement>) {
  if (e.target.value === '') return undefined

  const num = Number(e.target.value)
  return isNaN(num) ? undefined : num
}
