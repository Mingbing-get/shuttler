import { useCallback, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { useDebounceAndThrottle, useHold } from '@shuttler/helper'

import PopoverHandle from '../popoverHandle'
import ColorPickerPanel from '../colorPickerPanel'

import './index.scss'

export type ColorPosition = {
  color: string
  position: number
}

interface Props {
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  value?: ColorPosition[]
  onChange?: (value: ColorPosition[]) => void
}

export default function ColorListPicker({ className, style, disabled, value, onChange }: Props) {
  const [colorList, setColorList] = useHold<ColorPosition[]>(value || [], onChange)
  const [showAddBar, setShowAddBar] = useState(false)
  const [showMask, setShowMask] = useState(false)
  const [addBarLocation, setAddBarLocation] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLDivElement>()
  const [currentColorPosition, setCurrentColorPosition] = useState<number>()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const currentMoveElement = useRef<HTMLDivElement>()
  const currentMoveColorPosition = useRef<ColorPosition>()
  const isMouseUp = useRef(false)

  const updateAddBar = useCallback(
    useDebounceAndThrottle((e: React.MouseEvent<HTMLDivElement>) => {
      if (!wrapperRef.current) return

      const { left, width } = wrapperRef.current.getBoundingClientRect()
      const mouseLeft = e.clientX
      setAddBarLocation(((mouseLeft - left) / width) * 100)
    }),
    [],
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (targetElement || currentMoveElement.current || disabled) return

      setShowAddBar(true)
      updateAddBar(e)
    },
    [targetElement, disabled],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return

      updateAddBar(e)
    },
    [disabled],
  )

  const handleMouseLeave = useCallback(() => {
    setShowAddBar(false)
  }, [])

  const handleAdd = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return

      setColorList((old) => {
        if (!wrapperRef.current) return old

        const { left, width } = wrapperRef.current.getBoundingClientRect()
        const mouseLeft = e.clientX
        const position = ((mouseLeft - left) / width) * 100
        const newValue = [...old, { color: '', position }]
        newValue.sort((pre, cur) => pre.position - cur.position)

        return newValue
      })
      setTargetElement(undefined)
    },
    [disabled],
  )

  const handleChangeColor = useCallback(
    (color: string) => {
      if (currentColorPosition === undefined || disabled) return

      setColorList((old) => {
        const newValue = [...old]
        newValue.splice(currentColorPosition, 1, { ...old[currentColorPosition], color })

        return newValue
      })
    },
    [currentColorPosition, disabled],
  )

  const handleClickControl = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      if (disabled) return

      setTargetElement((old) => {
        if (old === e.currentTarget) return undefined

        return e.currentTarget
      })
      setCurrentColorPosition(index)
      isMouseUp.current = true
      e.stopPropagation()
    },
    [disabled],
  )

  const handleMouseDownControl = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, colorPosition: ColorPosition) => {
      if (disabled) return

      isMouseUp.current = false
      const currentTarget = e.currentTarget
      setTimeout(() => {
        if (isMouseUp.current) return

        currentMoveElement.current = currentTarget
        currentMoveColorPosition.current = colorPosition
        setShowMask(true)
      }, 400)
      setShowAddBar(false)
      e.stopPropagation()
    },
    [disabled],
  )

  const handleMouseMoveMask = useCallback(
    useDebounceAndThrottle((e: React.MouseEvent<HTMLDivElement>) => {
      if (!currentMoveElement.current || !wrapperRef.current || disabled) return

      const { left, width } = wrapperRef.current.getBoundingClientRect()
      const mouseLeft = e.clientX
      const newPosition = Math.max(Math.min((mouseLeft - left) / width, 1), 0)
      currentMoveElement.current.style.left = `${newPosition * 100}%`

      e.stopPropagation()
    }),
    [disabled],
  )

  const handleMouseUpMask = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return

      setColorList((old) => {
        if (!wrapperRef.current || !currentMoveColorPosition.current) return old

        const { left, width } = wrapperRef.current.getBoundingClientRect()
        const mouseLeft = e.clientX
        const newPosition = Math.max(Math.min((mouseLeft - left) / width, 1), 0)

        const index = old.findIndex((item) => item === currentMoveColorPosition.current)
        const newValue = [...old]
        if (index !== -1) {
          newValue.splice(index, 1, {
            ...currentMoveColorPosition.current,
            position: newPosition * 100,
          })
        }
        newValue.sort((pre, cur) => pre.position - cur.position)

        return newValue
      })
      currentMoveElement.current = undefined
      currentMoveColorPosition.current = undefined
      setShowMask(false)
    },
    [disabled],
  )

  const gradientStr = useMemo(() => {
    let _colorList = colorList
    if (colorList.length === 0) {
      _colorList = [
        { color: '#fff', position: 0 },
        { color: '#fff', position: 100 },
      ]
    } else if (colorList.length === 1) {
      _colorList = [colorList[0], colorList[0]]
    }

    return _colorList.map((item) => `${item.color} ${item.position}%`).join(', ')
  }, [colorList])

  return (
    <div
      ref={wrapperRef}
      className={classNames('color-list-picker-wrapper', disabled && 'is-disabled', className)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleAdd}
    >
      <div
        className={classNames('add-tip', showAddBar && 'show')}
        style={{
          left: `${addBarLocation}%`,
        }}
      />

      {colorList.map((item, index) => (
        <div
          key={index}
          className="control-bar"
          style={{ left: `${item.position}%` }}
          onMouseDown={(e) => handleMouseDownControl(e, item)}
          onClick={(e) => handleClickControl(e, index)}
        >
          <span />
        </div>
      ))}

      <div className="track" style={{ background: `linear-gradient(to right, ${gradientStr})` }} />

      <PopoverHandle
        className="color-list-picker-popover-wrapper"
        position="top"
        target={targetElement}
        disabled={disabled}
        content={
          <ColorPickerPanel
            value={value?.[currentColorPosition || 0]?.color}
            onChange={(newColor) => handleChangeColor(newColor as string)}
          />
        }
      />

      {showMask &&
        createPortal(
          <div
            className="color-list-picker-mask"
            onMouseMove={handleMouseMoveMask}
            onMouseUp={handleMouseUpMask}
          />,
          document.body,
        )}
    </div>
  )
}
