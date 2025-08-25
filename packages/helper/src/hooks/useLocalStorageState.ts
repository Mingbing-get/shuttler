import { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react'

type LocalStorageStateValueType = 'boolean' | 'number' | 'numberArray' | 'stringArray'

interface LocalStorageStateOptions<S> {
  saveKey: string
  parse?: ((v: string) => S) | LocalStorageStateValueType
  stringify?: ((v: S) => string) | LocalStorageStateValueType
  hiddenWhenFalse?: boolean
  removeFromStorageWhenUnMont?: boolean
}

export default function useLocalStorageState<S>(option: LocalStorageStateOptions<S>, initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
export default function useLocalStorageState<S = undefined>(
  option: LocalStorageStateOptions<undefined>
): [S | undefined, Dispatch<SetStateAction<S | undefined>>]
export default function useLocalStorageState<S>(
  option: LocalStorageStateOptions<S>,
  initialState?: S | (() => S)
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const timer = useRef<number | NodeJS.Timeout>()

  const [v, set] = useState<S | undefined>(() => {
    const urlValue = localStorageToState(option)

    if (urlValue !== undefined) {
      return urlValue as S
    }

    if (typeof initialState === 'function') {
      return (initialState as () => S)()
    }

    return initialState
  })

  useEffect(() => {
    stateToLocalStorage(option, v)
  }, [v])

  useEffect(() => {
    if (option?.removeFromStorageWhenUnMont === false) return

    if (timer.current) {
      clearTimeout(timer.current)
    }

    return () => {
      timer.current = setTimeout(() => {
        stateToLocalStorage(option, undefined)
      }, 10)
    }
  }, [option?.removeFromStorageWhenUnMont])

  return [v, set]
}

function localStorageToState<S = undefined>({ saveKey, parse }: LocalStorageStateOptions<S>) {
  const v = localStorage.getItem(saveKey)

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

function stateToLocalStorage<S = undefined>({ saveKey, stringify, hiddenWhenFalse }: LocalStorageStateOptions<S>, value: S | undefined) {
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
    localStorage.removeItem(saveKey)
  } else {
    localStorage.setItem(saveKey, v)
  }
}
