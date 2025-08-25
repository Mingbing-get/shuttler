import { useLayoutEffect, useRef, useState } from 'react'
import { Popover } from '@arco-design/web-react'
import classNames from 'classnames'

import './index.scss'

interface Props {
  className?: string
  style?: React.CSSProperties
  text?: string
}

export default function LongText({ style, text, className }: Props) {
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const [textOverFlow, setTextOverFlow] = useState(false)

  useLayoutEffect(() => {
    if (!wrapperRef.current) return

    setTextOverFlow(wrapperRef.current.clientWidth < wrapperRef.current.scrollWidth)
  }, [text])

  return (
    <Popover
      disabled={!textOverFlow}
      position="top"
      trigger="hover"
      content={text}>
      <span
        ref={wrapperRef}
        style={style}
        className={classNames(className, 'easy-coder-long-text')}>
        {text}
      </span>
    </Popover>
  )
}
