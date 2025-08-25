import { useRef, useState, useEffect, EffectCallback } from 'react'

export default function useChangeEffect(callback: EffectCallback, depValue: any) {
  const [isChange, setIsChange] = useState(false)
  const preValue = useRef(depValue)

  useEffect(() => {
    if (preValue.current === depValue) return

    preValue.current = depValue
    setIsChange(true)
  }, [depValue])

  useEffect(() => {
    if (!isChange) return

    callback()
    setIsChange(false)
  }, [isChange])
}
