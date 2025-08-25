import { ColorPicker } from '@arco-design/web-react'

import presetColors from '../../baseComponents/colorPickerPanel/presetColors'
import { Color } from '../../type'

import './index.scss'

export interface Props {
  value?: Color
  disabled?: boolean
  onChange?: (value?: Color) => void
}

export default function ColorInput({ value, disabled, onChange }: Props) {
  return (
    <ColorPicker
      size="mini"
      disabled={disabled}
      value={value || ''}
      onChange={onChange}
      showPreset
      triggerProps={{
        getPopupContainer: () => document.body,
      }}
      presetColors={presetColors}
    />
  )
}
