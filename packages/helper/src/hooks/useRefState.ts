import { useState, useRef, useEffect } from 'react'

export default function useRefState<T>(
  defaultValue?: T
): [T | undefined, React.MutableRefObject<T | undefined>, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [v, setV] = useState(defaultValue)
  const vRef = useRef(defaultValue)

  useEffect(() => {
    vRef.current = v
  }, [v])

  return [v, vRef, setV]
}
