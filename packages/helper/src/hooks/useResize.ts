import { useState, useRef, useEffect } from 'react'

function createResizeObserver(setWidth: (v: number) => void, setHeight: (v: number) => void, getTarget: () => HTMLElement | null) {
  if (typeof ResizeObserver !== 'function') return

  return new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target !== getTarget()) {
        continue
      }

      const { width, height } = entry.target.getBoundingClientRect()

      setWidth(width)
      setHeight(height)
    }
  })
}

export default function useResize<T extends HTMLElement>() {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const domRef = useRef<T>(null)
  const resizeObserverRef = useRef<ResizeObserver | undefined>(createResizeObserver(setWidth, setHeight, () => domRef.current))

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!domRef.current) return

    resizeObserverRef.current?.observe(domRef.current)
    const domRect = domRef.current.getBoundingClientRect()
    setWidth(domRect.width)
    setHeight(domRect.height)

    return () => {
      if (!domRef.current) return

      resizeObserverRef.current?.unobserve(domRef.current)
    }
  }, [domRef.current])

  return {
    height,
    width,
    domRef,
  }
}
