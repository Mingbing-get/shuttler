import { LanguageCode, Multilingual, languages } from './consts'

type LanguageChangeListener = (langCode: LanguageCode, oldLangCode: LanguageCode) => void
type CodeOrderChangeListener = (codeOrder: LanguageCode[], oldCodeOrder: LanguageCode[]) => void

interface ConcatOption {
  before?: string
  middle?: string
  after?: string
}

export class I18n {
  private langCode: LanguageCode
  private codeOrder: LanguageCode[]

  private listeners: LanguageChangeListener[] = []
  private codeOrderListeners: CodeOrderChangeListener[] = []

  constructor() {
    this.langCode = this.getBrowserLangCode()
    this.codeOrder = this.getBrowserCodeOrder()
  }

  getLangCode() {
    return this.langCode
  }

  getCodeOrder() {
    return this.codeOrder
  }

  changeLanguage(langCode: LanguageCode) {
    if (this.langCode === langCode) return

    const oldLangCode = this.langCode
    this.langCode = langCode

    this.triggerListener('language', langCode, oldLangCode)
  }

  changeCodeOrder(codeOrder: LanguageCode[]) {
    if (this.isSameCodeList(this.codeOrder, codeOrder)) return

    const oldCodeOrder = this.codeOrder
    this.codeOrder = codeOrder

    this.triggerListener('codeOrder', codeOrder, oldCodeOrder)
  }

  on(type: 'language', listener: LanguageChangeListener): () => void
  on(type: 'codeOrder', listener: CodeOrderChangeListener): () => void
  on(type: 'language' | 'codeOrder', listener: LanguageChangeListener | CodeOrderChangeListener) {
    if (type === 'language') {
      this.listeners.push(listener as LanguageChangeListener)

      return () => {
        this.listeners = this.listeners.filter((fn) => fn !== listener)
      }
    } else if (type === 'codeOrder') {
      this.codeOrderListeners.push(listener as CodeOrderChangeListener)

      return () => {
        this.codeOrderListeners = this.codeOrderListeners.filter((fn) => fn !== listener)
      }
    }
  }

  translate(lang: Multilingual | string, autoMoveDown: boolean = true) {
    if (typeof lang !== 'object' || lang === null) return lang

    if (lang[this.langCode] !== undefined) return lang[this.langCode]

    if (!autoMoveDown || this.codeOrder.length === 0) return

    for (const code of this.codeOrder) {
      if (lang[code] !== undefined) return lang[code]
    }
  }

  translateBy(lang: Multilingual | string, langCode: LanguageCode) {
    if (typeof lang !== 'object') return lang

    return lang[langCode]
  }

  translateFillEmpty(lang: Multilingual | string, autoMoveDown: boolean = true) {
    return this.translate(lang, autoMoveDown) || ''
  }

  private triggerListener(type: 'language', newValue: LanguageCode, oldValue: LanguageCode): void
  private triggerListener(type: 'codeOrder', newValue: LanguageCode[], oldValue: LanguageCode[]): void
  private triggerListener(type: 'language' | 'codeOrder', newValue: LanguageCode | LanguageCode[], oldValue: LanguageCode | LanguageCode[]) {
    if (type === 'language') {
      this.listeners.forEach((listener) => listener(newValue as LanguageCode, oldValue as LanguageCode))
    } else if (type === 'codeOrder') {
      this.codeOrderListeners.forEach((listener) => listener(newValue as LanguageCode[], oldValue as LanguageCode[]))
    }
  }

  getBrowserLangCode(): LanguageCode {
    const lang = navigator.language

    for (const key in languages) {
      if (lang.startsWith(key)) return key as LanguageCode
    }

    return 'zh'
  }

  getBrowserCodeOrder() {
    const codeOrder: LanguageCode[] = []

    const langs = navigator.languages
    langs.forEach((lang) => {
      for (const key in languages) {
        if (!lang.startsWith(key)) continue

        const _key = key as LanguageCode
        if (!codeOrder.includes(_key)) {
          codeOrder.push(_key)
        }
        break
      }
    })

    return codeOrder
  }

  isSameCodeList(codeList: LanguageCode[], codeList1: LanguageCode[]) {
    if (codeList.length !== codeList1.length) return false

    for (let i = 0; i < codeList.length; i++) {
      if (codeList[i] !== codeList1[i]) return false
    }

    return true
  }

  concatMultilingual(lang1: Multilingual, lang2: Multilingual, options?: ConcatOption): Multilingual {
    const { before = '', middle = '', after = '' } = options || {}

    if (typeof lang1 === 'string' && typeof lang2 === 'string') {
      return {
        [this.langCode]: `${before}${lang1}${middle}${lang2}${after}`,
      }
    }

    if (!lang1) return lang2 || {}

    if (!lang2) return lang1 || {}

    if (typeof lang1 === 'string') {
      const lang: Multilingual = { ...lang2 }
      if (lang[this.langCode] !== undefined) {
        lang[this.langCode] = `${before}${lang1}${middle}${lang[this.langCode]}${after}`
      }
      return lang
    }

    if (typeof lang2 === 'string') {
      const lang: Multilingual = { ...lang1 }
      if (lang[this.langCode] !== undefined) {
        lang[this.langCode] = `${before}${lang[this.langCode]}${middle}${lang2}${after}`
      }
      return lang
    }

    const lang: Multilingual = {}
    for (const key in lang1) {
      const _key = key as LanguageCode
      if (lang2[_key] !== undefined) {
        lang[_key] = `${before}${lang1[_key] || ''}${middle}${lang2[_key]}${after}`
      } else {
        lang[_key] = lang1[_key]
      }
    }

    for (const key in lang2) {
      const _key = key as LanguageCode
      if (lang[_key] !== undefined) continue
      lang[_key] = lang2[_key]
    }

    return lang
  }
}

export default new I18n()
