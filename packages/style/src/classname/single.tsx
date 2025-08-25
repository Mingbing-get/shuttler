import { Collapse } from '@arco-design/web-react'
import StyleSetter from '../setter'

import { ClassName, StyleVar } from '../type'

interface Props {
  style?: React.CSSProperties
  styleVarMap?: Record<string, StyleVar.Desc>
  disabled?: boolean
  value: ClassName
  onChange?: (value: ClassName) => void
}

export default function SingleClassName({ style, value, disabled, styleVarMap, onChange }: Props) {
  return (
    <div
      className="single-class-name"
      style={style}>
      <Collapse defaultActiveKey={['style', 'hover-style']}>
        <Collapse.Item
          name="style"
          header="样式">
          <StyleSetter
            disabled={disabled || value.disabled}
            value={value.value}
            styleVarMap={styleVarMap}
            onChange={(v) => onChange?.({ ...value, value: v })}
          />
        </Collapse.Item>
        <Collapse.Item
          name="hover-style"
          header="鼠标悬浮时样式">
          <StyleSetter
            disabled={disabled || value.disabled}
            value={value.hoverValue}
            styleVarMap={styleVarMap}
            onChange={(v) => onChange?.({ ...value, hoverValue: v })}
          />
        </Collapse.Item>
      </Collapse>
    </div>
  )
}
