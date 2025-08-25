import { useMemo } from 'react'

import { useEffectCallback } from '@shuttler/helper'

import { PositionDefine, StyleDefine, DirectionSelect, LengthDefine } from '../../type'
import DirectionLengthInput from '../directionLengthInput'
import { BlockName } from '../../baseComponents/directionPick/ui'
import ConstInput, { ConstInputOption } from '../constInput'

import './index.scss'

export interface Props {
  disabled?: boolean
  value?: PositionDefine
  onChange?: (value: PositionDefine) => void

  styleDefine?: StyleDefine
  onChangeStyle?: (style: StyleDefine) => void
}

const options: ConstInputOption<PositionDefine>[] = [
  { value: 'relative', label: '相对' },
  { value: 'absolute', label: '绝对' },
  { value: 'fixed', label: '固定' },
  { value: 'sticky', label: '粘黏' },
]

export default function PositionInput({
  disabled,
  value,
  onChange,
  styleDefine,
  onChangeStyle,
}: Props) {
  const directionValue: DirectionSelect<LengthDefine> = useMemo(() => {
    return [styleDefine?.top, styleDefine?.right, styleDefine?.bottom, styleDefine?.left]
  }, [styleDefine?.top, styleDefine?.right, styleDefine?.bottom, styleDefine?.left])

  const handleChangePosition = useEffectCallback(
    (p?: PositionDefine) => {
      if (!p) return

      const newStyle = { ...styleDefine, position: p }

      if (p !== 'absolute' && p !== 'fixed') {
        delete newStyle.top
        delete newStyle.right
        delete newStyle.bottom
        delete newStyle.left
      }

      onChangeStyle?.(newStyle)
      onChange?.(p)
    },
    [styleDefine, onChangeStyle],
  )

  const handleChangeDir = useEffectCallback(
    (dir: DirectionSelect<LengthDefine>, blockName?: BlockName) => {
      if (styleDefine?.position === 'absolute' || styleDefine?.position === 'fixed') {
        const newStyle = {
          ...styleDefine,
          top: dir[0],
          right: dir[1],
          bottom: dir[2],
          left: dir[3],
        }
        onChangeStyle?.(newStyle)
      }

      if (styleDefine?.position === 'sticky') {
        const newStyle = { ...styleDefine }

        delete newStyle.top
        delete newStyle.right
        delete newStyle.bottom
        delete newStyle.left

        if (blockName === 'top') newStyle.top = dir[0]
        if (blockName === 'right') newStyle.right = dir[1]
        if (blockName === 'bottom') newStyle.bottom = dir[2]
        if (blockName === 'left') newStyle.left = dir[3]

        onChangeStyle?.(newStyle)
      }
    },
    [styleDefine, onChangeStyle],
  )

  const needShowDir = useMemo(() => {
    return (
      styleDefine?.position === 'absolute' ||
      styleDefine?.position === 'fixed' ||
      styleDefine?.position === 'sticky'
    )
  }, [styleDefine?.position])

  return (
    <div className="position-input-wrapper">
      <ConstInput
        displayAs="radio"
        disabled={disabled}
        options={options}
        value={styleDefine?.position}
        onChange={handleChangePosition}
      />
      {needShowDir && (
        <DirectionLengthInput
          value={directionValue}
          onlySingle={styleDefine?.position === 'sticky'}
          disabled={disabled}
          onChange={handleChangeDir}
        />
      )}
    </div>
  )
}
