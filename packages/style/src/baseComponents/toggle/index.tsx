import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { IconSwap } from '@arco-design/web-react/icon'

import './index.scss'

type Props = {
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  showMain?: boolean
  mainChild: React.ReactNode
  secondChild: React.ReactNode
  onToggle?: (showMain: boolean) => void
}

export default function Toggle({ disabled, style, className, showMain, mainChild, secondChild, onToggle }: Props) {
  const [_showMain, setShowMain] = useState(showMain)

  useEffect(() => {
    setShowMain(showMain)
  }, [showMain])

  const handleToggle = useCallback(() => {
    if (disabled) return

    const showMain = !_showMain
    setShowMain(showMain)
    onToggle?.(showMain)
  }, [onToggle, _showMain, disabled])

  return (
    <div
      style={style}
      className={classNames('toggle-wrapper', className)}>
      {!disabled && (
        <span
          className={classNames('toggle-bar', !_showMain && 'is-show-second')}
          onClick={handleToggle}>
          <IconSwap />
        </span>
      )}
      {_showMain ? mainChild : secondChild}
    </div>
  )
}
