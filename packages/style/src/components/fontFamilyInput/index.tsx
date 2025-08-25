import { Select, SelectProps } from '@arco-design/web-react'
import { FontFamilyName } from '../../type'

interface Props {
  disabled?: boolean
  value?: FontFamilyName[]
  onChange?: (value?: FontFamilyName[]) => void
}

const fontFamilyNames: FontFamilyName[] = [
  'SimSun',
  'SimHei',
  'KaiTi',
  'FangSong',
  'YouYuan',
  'STSong',
  'STHeiti',
  'STKaiti',
  'STFangsong',
  'STXihei',
  'STXingkai',
  'STZhongsong',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'ui-monospace',
  'ui-rounded',
  'math',
  'fangsong',
  'Microsoft YaHei',
  'Arial',
  'Helvetica',
  'Tahoma',
  'Verdana',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Arial Black',
  'Impact',
  'Lucida Sans Unicode',
  'Lucida Grande',
  'Palatino Linotype',
  'Book Antiqua',
]

const options: { value: FontFamilyName; label?: string }[] = fontFamilyNames.map((item) => ({ value: item, label: item }))

export default function FontFamilyInput({ disabled, value, onChange }: Props) {
  return (
    <Select
      getPopupContainer={() => document.body}
      size="mini"
      mode="multiple"
      disabled={disabled}
      options={options as SelectProps['options']}
      value={value}
      onChange={onChange}
    />
  )
}
