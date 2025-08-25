import { useRef, useCallback } from 'react'

export default function useDebounce<T extends any[]>(cb: (...augment: T) => any, delay: number = 60) {
  const timerRef = useRef<number | NodeJS.Timeout>()

  const fn = useCallback(
    (...augment: T) => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(cb, delay, ...augment)
    },
    [cb]
  )

  return fn
}
