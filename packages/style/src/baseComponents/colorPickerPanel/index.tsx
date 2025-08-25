import { useContext } from 'react'
import { ColorPickerProps } from '@arco-design/web-react'
import { Panel as ColorSelectPanel } from '@arco-design/web-react/es/ColorPicker/panel'
import { useColorPicker } from '@arco-design/web-react/es/ColorPicker/hooks/useColorPicker'
import { ConfigContext } from '@arco-design/web-react/es/ConfigProvider'
import useMergeProps from '@arco-design/web-react/es/_util/hooks/useMergeProps'

import presetColors from './presetColors'

const defaultProps: Pick<ColorPickerProps, 'size' | 'presetColors' | 'showPreset'> = {
  size: 'default',
  presetColors: presetColors,
  showPreset: true,
}

export default function ColorPickerPanel(baseProps: ColorPickerProps) {
  const { componentConfig } = useContext(ConfigContext)
  const props = useMergeProps(baseProps, defaultProps, componentConfig?.ColorPicker || {})
  const { color, colorString, alpha, onHsvChange, onAlphaChange } = useColorPicker(props)

  return (
    <ColorSelectPanel
      color={color}
      colorString={colorString}
      alpha={alpha}
      historyColors={props.historyColors}
      presetColors={props.presetColors}
      showHistory={props.showHistory}
      showPreset={props.showPreset}
      disabledAlpha={!!props.disabledAlpha}
      renderFooter={props.renderFooter}
      onHsvChange={onHsvChange}
      onAlphaChange={onAlphaChange}
    />
  )
}
