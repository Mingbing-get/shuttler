import { useMemo } from 'react'
import { Select } from '@arco-design/web-react'
import { useEffectCallback } from '@shuttler/helper'
import { i18n } from '@shuttler/i18n'

import useStyleContext from '../../context/useStyleContext'
import { StyleExpression, StyleVar } from '../../type'

interface Props {
  value: StyleExpression
  type: StyleVar.Type
  disabled?: boolean
  onChange?: (value: StyleExpression) => void
}

interface Option {
  value: string
  label: string
}

export default function StyleExpressionRender({ value, type, disabled, onChange }: Props) {
  const { styleVarMap } = useStyleContext()

  const options = useMemo(() => {
    return Object.entries(styleVarMap || {}).reduce((total: Option[], [id, info]) => {
      if (info.type === type) {
        total.push({
          value: id,
          label: i18n.translateFillEmpty(info.alias || ''),
        })
      }

      return total
    }, [])
  }, [type, styleVarMap])

  const handleFilterOption = useEffectCallback(
    (inputValue: string, option: React.ReactElement<{ value: string; children: string }>) => {
      return option.props.children.includes(inputValue)
    },
    [options],
  )

  return (
    <Select
      size="mini"
      showSearch
      placeholder="请选择样式变量"
      disabled={disabled}
      options={options}
      filterOption={handleFilterOption}
      value={value.styleVarId}
      onChange={(v) => onChange?.({ ...value, styleVarId: v })}
    />
  )
}
