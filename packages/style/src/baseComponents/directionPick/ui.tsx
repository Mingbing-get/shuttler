import { useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'

export type BlockName = 'wrapper' | 'row' | 'col' | 'top' | 'left' | 'bottom' | 'right'

interface Props {
  disabled?: boolean
  mode?: 'all' | 'single' | 'axios'
  error?: boolean
  onShow?: (blockName?: BlockName) => void
}

export default function DirectionPickUi({ disabled, mode, error, onShow }: Props) {
  const [_hoverBlock, setHoverBlock] = useState<BlockName>()
  const [showBlock, setShowBlock] = useState<BlockName>()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, blockName: BlockName) => {
      if (disabled) return

      if (mode === 'single' && (blockName === 'wrapper' || blockName === 'col' || blockName === 'row')) return

      if (mode === 'axios' && (blockName === 'left' || blockName === 'right' || blockName === 'bottom' || blockName === 'top')) return

      setHoverBlock(blockName)
      e.stopPropagation()
    },
    [disabled, mode]
  )

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    setHoverBlock(undefined)
    e.stopPropagation()
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent, blockName: BlockName) => {
      if (disabled) return

      if (mode === 'single' && (blockName === 'wrapper' || blockName === 'col' || blockName === 'row')) return

      if (mode === 'axios' && (blockName === 'left' || blockName === 'right' || blockName === 'bottom' || blockName === 'top')) return

      setShowBlock((old) => {
        if (old === blockName) {
          onShow?.(undefined)
          return undefined
        }

        onShow?.(blockName)
        return blockName
      })
      e.stopPropagation()
    },
    [onShow, disabled, mode]
  )

  const hoverBlock = useMemo(() => {
    if (showBlock) return showBlock

    return _hoverBlock
  }, [showBlock, _hoverBlock])

  return (
    <div
      className={classNames('direction-pick-wrapper', disabled && 'is-disabled', error && 'is-error', `mode-${mode}`, hoverBlock === 'wrapper' && 'is-hover')}
      onMouseMove={(e) => handleMouseMove(e, 'wrapper')}
      onMouseLeave={(e) => handleMouseLeave(e)}
      onClick={(e) => handleClick(e, 'wrapper')}>
      <div
        className={classNames('direction-pick-row', hoverBlock === 'row' && 'is-hover')}
        onMouseMove={(e) => handleMouseMove(e, 'row')}
        onClick={(e) => handleClick(e, 'row')}>
        <span
          className={classNames('field', hoverBlock === 'left' && 'is-hover')}
          onMouseMove={(e) => handleMouseMove(e, 'left')}
          onClick={(e) => handleClick(e, 'left')}></span>
        <span className="place-ele"></span>
        <span
          className={classNames('field', hoverBlock === 'right' && 'is-hover')}
          onMouseMove={(e) => handleMouseMove(e, 'right')}
          onClick={(e) => handleClick(e, 'right')}></span>
      </div>
      <div
        className={classNames('direction-pick-col', hoverBlock === 'col' && 'is-hover')}
        onMouseMove={(e) => handleMouseMove(e, 'col')}
        onClick={(e) => handleClick(e, 'col')}>
        <span
          className={classNames('field', hoverBlock === 'top' && 'is-hover')}
          onMouseMove={(e) => handleMouseMove(e, 'top')}
          onClick={(e) => handleClick(e, 'top')}></span>
        <span
          className={classNames('field', hoverBlock === 'bottom' && 'is-hover')}
          onMouseMove={(e) => handleMouseMove(e, 'bottom')}
          onClick={(e) => handleClick(e, 'bottom')}></span>
      </div>
    </div>
  )
}
