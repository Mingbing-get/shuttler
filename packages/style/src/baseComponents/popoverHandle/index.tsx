import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import classnames from 'classnames'
import { Popover, PopoverProps } from '@arco-design/web-react'

import './index.scss'

interface Props extends Omit<PopoverProps, 'popupVisible' | 'children'> {
  target?: HTMLElement
}

export default function PopoverHandle({ target, content, className, disabled, ...extra }: Props) {
  const visible = useMemo(() => {
    if (disabled) return false

    return !!target
  }, [target, disabled])

  const spanStyle = useMemo(() => {
    if (!target) return

    const rect = target.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    }
  }, [target])

  return createPortal(
    <Popover
      {...extra}
      className={classnames('popover-handle', className)}
      popupVisible={visible}
      getPopupContainer={() => document.body}
      content={
        <div
          className="popover-handle-content"
          onClick={(e) => e.stopPropagation()}>
          {content}
        </div>
      }>
      <span
        className="popover-target"
        style={spanStyle}
      />
    </Popover>,
    document.body
  )
}
