import { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react'

type UrlStateValueType = 'boolean' | 'number' | 'numberArray' | 'stringArray'

interface UrlStateOptions<S> {
  searchKey: string
  parse?: ((v: string) => S) | UrlStateValueType
  stringify?: ((v: S) => string) | UrlStateValueType
  hiddenWhenFalse?: boolean
  removeFromUrlWhenUnMont?: boolean
}

export default function useUrlState<S>(option: UrlStateOptions<S>, initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
export default function useUrlState<S = undefined>(option: UrlStateOptions<undefined>): [S | undefined, Dispatch<SetStateAction<S | undefined>>]
export default function useUrlState<S>(option: UrlStateOptions<S>, initialState?: S | (() => S)): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const timer = useRef<number | NodeJS.Timeout>()

  const [v, set] = useState<S | undefined>(() => {
    const urlValue = urlToState(option)

    if (urlValue !== undefined) {
      return urlValue as S
    }

    if (typeof initialState === 'function') {
      return (initialState as () => S)()
    }

    return initialState
  })

  useEffect(() => {
    stateToUrl(option, v)
  }, [v])

  useEffect(() => {
    if (option?.removeFromUrlWhenUnMont === false) return

    if (timer.current) {
      clearTimeout(timer.current)
    }

    return () => {
      timer.current = setTimeout(() => {
        stateToUrl(option, undefined)
      }, 10)
    }
  }, [option?.removeFromUrlWhenUnMont])

  return [v, set]
}

function urlToState<S = undefined>({ searchKey, parse }: UrlStateOptions<S>) {
  const searchParams = new URLSearchParams(window.location.search)
  const v = searchParams.get(searchKey)

  if (v === undefined || v === null) return

  if (parse) {
    if (typeof parse === 'function') {
      return parse(v)
    }

    if (parse === 'boolean') {
      if (v === 'true') return true

      return false
    }

    if (parse === 'number') {
      return Number(v)
    }

    if (parse === 'numberArray') {
      return v.split(',').map(Number)
    }

    if (parse === 'stringArray') {
      return v.split(',')
    }
  }

  return v
}

function stateToUrl<S = undefined>({ searchKey, stringify, hiddenWhenFalse }: UrlStateOptions<S>, value: S | undefined) {
  const url = new URL(window.location.href)
  const searchParams = url.searchParams

  let v: any
  if (stringify && value !== undefined) {
    if (typeof stringify === 'function') {
      v = stringify(value)
    } else if (stringify === 'boolean') {
      if (value === true) {
        v = 'true'
      } else if (value === false && !hiddenWhenFalse) {
        v = 'false'
      }
    } else if (stringify === 'number') {
      v = `${value}`
    } else if (stringify === 'numberArray') {
      v = (value as number[]).join(',')
    } else if (stringify === 'stringArray') {
      v = (value as string[]).join(',')
    }
  }

  if (!stringify && value !== undefined) {
    v = value
  }

  if (v === undefined) {
    searchParams.delete(searchKey)
  } else {
    searchParams.set(searchKey, v)
  }

  history.replaceState('', '', url.href)
}
