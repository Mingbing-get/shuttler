import { Button, Select, Popover, SelectProps } from '@arco-design/web-react'
import { IconPlus, IconDelete } from '@arco-design/web-react/icon'
import { LanguageCode, Multilingual } from '@shuttler/i18n'

import InputWhenLangCode from './inputWhenLangCode'
import { LangCodeOption } from '.'

interface Props {
  inValueCodes: LanguageCode[]
  missLangCodeOptions: LangCodeOption[]
  disabled?: boolean
  readonly?: boolean
  size?: SelectProps['size']
  value?: Multilingual
  onChangeByCode?: (langCode: LanguageCode, v?: string, triggerComplete?: boolean) => void
  onTriggerComplete?: () => void
  onChange?: (value: Multilingual) => void
}

export default function LangList({
  inValueCodes,
  missLangCodeOptions,
  disabled,
  readonly,
  size,
  value,
  onChangeByCode,
  onTriggerComplete,
  onChange,
}: Props) {
  return (
    <div className="easy-coder-sdk-multilingual-input-list">
      {inValueCodes.map((langCode) => (
        <div className="easy-coder-sdk-multilingual-input-row" key={langCode}>
          <InputWhenLangCode
            langCode={langCode}
            size={size}
            disabled={disabled}
            readOnly={readonly}
            value={value}
            onChange={onChangeByCode}
            onBlur={onTriggerComplete}
          />
          {!disabled && !readonly && inValueCodes.length > 1 && (
            <Popover
              getPopupContainer={() => document.body}
              trigger="hover"
              position="top"
              content="移除当前语言"
            >
              <IconDelete
                className="easy-coder-sdk-multilingual-del-icon"
                onClick={() => onChangeByCode?.(langCode, undefined, true)}
              />
            </Popover>
          )}
        </div>
      ))}
      {!disabled && !readonly && missLangCodeOptions.length > 0 && (
        <div>
          <Select
            value={''}
            getPopupContainer={() => document.body}
            options={missLangCodeOptions}
            onChange={(v) => onChangeByCode?.(v, '', true)}
            triggerElement={
              <Button type="text" size={size} icon={<IconPlus />}>
                添加语言
              </Button>
            }
          />
        </div>
      )}
    </div>
  )
}
