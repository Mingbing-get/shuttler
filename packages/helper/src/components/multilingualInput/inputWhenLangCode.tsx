import { Input, Tag, InputProps } from '@arco-design/web-react'
import { Multilingual, LanguageCode, languages, i18n } from '@shuttler/i18n'

interface Props extends Omit<InputProps, 'suffix' | 'value' | 'onChange'> {
  value?: Multilingual
  langCode: LanguageCode
  onChange?: (langCode: LanguageCode, v?: string) => void
}

export default function InputWhenLangCode({ value, langCode, onChange, ...extra }: Props) {
  return (
    <Input
      {...extra}
      value={value?.[langCode]}
      onChange={(v) => onChange?.(langCode, v)}
      suffix={
        <Tag size="small" color="arcoblue">
          {i18n.translateBy(languages[langCode], langCode)}
        </Tag>
      }
    />
  )
}
