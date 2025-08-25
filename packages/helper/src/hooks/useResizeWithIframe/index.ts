import { useState, useRef, useEffect, useCallback } from 'react'
import useDebounceAndThrottle from '../useDebounceAndThrottle'

import './index.scss'

export default function useResize() {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const changeSize = useCallback(
    useDebounceAndThrottle(() => {
      setSize((oldSize) => {
        if (!iframeRef.current) return oldSize

        const newValue = {
          width: iframeRef.current.offsetWidth,
          height: iframeRef.current.offsetHeight,
        }

        if (oldSize.width === newValue.width && oldSize.height === newValue.height) return oldSize

        return newValue
      })
    }, 200),
    []
  )

  useEffect(() => {
    if (!iframeRef.current) return
    iframeRef.current.setAttribute('class', 'resize-iframe')
    iframeRef.current.contentWindow?.addEventListener('resize', changeSize)

    setSize({
      width: iframeRef.current.offsetWidth,
      height: iframeRef.current.offsetHeight,
    })
  }, [iframeRef.current])

  return {
    size,
    iframeRef,
  }
}
