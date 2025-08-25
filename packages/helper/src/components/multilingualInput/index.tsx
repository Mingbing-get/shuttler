import { useEffect, useMemo, useState } from 'react'
import { Modal, Popover, SelectProps } from '@arco-design/web-react'
import { IconLanguage } from '@arco-design/web-react/icon'
import { Multilingual, LanguageCode, languages, i18n } from '@shuttler/i18n'

import { useEffectCallback } from '../../hooks'
import { getElementToBodyZIndex } from '../../utils'

import InputWhenLangCode from './inputWhenLangCode'
import LangList from './langList'

import './index.scss'

export interface LangCodeOption {
  value: LanguageCode
  label: string
}

interface Props {
  size?: SelectProps['size']
  disabled?: boolean
  readonly?: boolean
  value?: Multilingual
  onChange?: (v: Multilingual) => void
  onInputComplete?: (v: Multilingual) => void
}

export default function MultilingualInput({
  size,
  readonly,
  disabled,
  value,
  onChange,
  onInputComplete,
}: Props) {
  const [visible, setVisible] = useState(false)
  const [triggerZIndex, setTriggerZIndex] = useState<number>()
  const [codeOrder, setCodeOrder] = useState<LanguageCode[]>(i18n.getCodeOrder())
  const [langCode, setLangCode] = useState(i18n.getLangCode())
  const [filterStrValue, setFilterStrValue] = useState<Multilingual | undefined>(
    typeof value === 'string' ? { [langCode]: value } : value,
  )

  useEffect(() => {
    setCodeOrder(i18n.getCodeOrder())
    setLangCode(i18n.getLangCode())

    const removeCodeOrderListener = i18n.on('codeOrder', (codeOrder) => {
      setCodeOrder(codeOrder)
    })
    const removeLangCodeListener = i18n.on('language', (langCode) => {
      setLangCode(langCode)
    })

    return () => {
      removeCodeOrderListener()
      removeLangCodeListener()
    }
  }, [])

  useEffect(() => {
    if (typeof value === 'string') {
      setFilterStrValue({ [langCode]: value })
      return
    }

    setFilterStrValue(value)
  }, [langCode, value])

  const mainLangCode = useMemo(() => {
    if (!filterStrValue) return langCode

    if (filterStrValue[langCode] !== undefined && filterStrValue[langCode] !== null) return langCode

    for (const code of codeOrder) {
      if (filterStrValue[code] !== undefined && filterStrValue[code] !== null) return code
    }

    return langCode
  }, [langCode, codeOrder, filterStrValue])

  const inValueCodes = useMemo(() => {
    const keys = Object.keys(filterStrValue || {})

    const effectCodes = codeOrder.filter((item) => keys.includes(item))
    if (effectCodes.length == 0) {
      effectCodes.push(mainLangCode)
    }

    return effectCodes
  }, [mainLangCode, filterStrValue, codeOrder])

  const missLangCodeOptions = useMemo(() => {
    return codeOrder.reduce((total: LangCodeOption[], code) => {
      if (!inValueCodes.includes(code)) {
        total.push({
          value: code,
          label: i18n.translate(languages[code]) || '',
        })
      }

      return total
    }, [])
  }, [codeOrder, inValueCodes])

  const handleChangeByCode = useEffectCallback(
    (langCode: LanguageCode, v?: string, triggerComplete?: boolean) => {
      const newValue = { ...filterStrValue }

      if (v === undefined || v === null) {
        delete newValue[langCode]
      } else {
        newValue[langCode] = v
      }

      setFilterStrValue(newValue)
      onChange?.(newValue)
      if (triggerComplete) {
        onInputComplete?.(newValue)
      }
    },
    [filterStrValue, onChange, onInputComplete],
  )

  const handleTriggerComplete = useEffectCallback(() => {
    onInputComplete?.(filterStrValue || {})
  }, [filterStrValue, onInputComplete])

  const wrapperStyle = useMemo(() => {
    const style: React.CSSProperties = {}

    if (triggerZIndex && triggerZIndex > 1000) {
      style.zIndex = triggerZIndex + 1
    }

    return style
  }, [triggerZIndex])

  return (
    <div className="easy-coder-sdk-multilingual-input">
      <InputWhenLangCode
        addBefore={
          codeOrder.length > 1 && (
            <Popover
              getPopupContainer={() => document.body}
              trigger="hover"
              position="top"
              content="设置更多语言"
            >
              <IconLanguage
                className="easy-coder-sdk-multilingual-add-icon"
                onClick={(e) => {
                  setVisible(true)
                  setTriggerZIndex(getElementToBodyZIndex(e.target as HTMLElement))
                  e.stopPropagation()
                }}
              />
            </Popover>
          )
        }
        langCode={mainLangCode}
        size={size}
        disabled={disabled}
        readOnly={readonly}
        value={filterStrValue}
        onChange={handleChangeByCode}
        onBlur={handleTriggerComplete}
      />
      <Modal
        visible={visible}
        getPopupContainer={() => document.body}
        title="编辑多语言"
        footer={null}
        onCancel={() => setVisible(false)}
        wrapStyle={wrapperStyle}
        maskStyle={wrapperStyle}
      >
        <LangList
          inValueCodes={inValueCodes}
          missLangCodeOptions={missLangCodeOptions}
          size={size}
          disabled={disabled}
          readonly={readonly}
          value={filterStrValue}
          onChangeByCode={handleChangeByCode}
          onTriggerComplete={handleTriggerComplete}
          onChange={(v) => {
            setFilterStrValue(v)
            onChange?.(v)
            onInputComplete?.(v)
          }}
        />
      </Modal>
    </div>
  )
}
