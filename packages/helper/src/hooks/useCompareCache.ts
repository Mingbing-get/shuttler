import { useEffect, useRef, useState } from 'react'

type CompareFn<T> = (v1: T, v2: T) => boolean

export default function useCompareCache<T>(v: T, fn: CompareFn<T>): T {
  const [cacheV, setCacheV] = useState(v)
  const refV = useRef(v)

  useEffect(() => {
    if (fn(refV.current, v)) return

    refV.current = v
    setCacheV(v)
  }, [v])

  return cacheV
}
