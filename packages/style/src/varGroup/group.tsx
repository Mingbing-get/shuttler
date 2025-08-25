import { useCallback, useMemo } from 'react'
import { Popover, Button } from '@arco-design/web-react'
import { IconDelete, IconPlus } from '@arco-design/web-react/icon'
import { Multilingual } from '@shuttler/i18n'
import { MultilingualInput } from '@shuttler/helper'

import LengthInput from '../components/lengthInput'
import SpaceInput from '../components/spaceInput'
import ColorInput from '../components/colorInput'
import BoxShadowInput from '../components/boxShadowInput'
import BgLinearGradientInput from '../components/bgLinearGradientInput'
import BgRadialGradientInput from '../components/bgRadialGradientInput'
import TransformInput from '../components/transformInput'
import { StyleVar, StyleVarGroup } from '../type'

import './index.scss'

interface Props {
  group: StyleVarGroup
  disabled?: boolean
  deleteLoading?: boolean
  isDisabledMain?: (varId: string) => boolean
  onAddVar?: (v: StyleVar.Desc) => void
  onChangeAlias?: (varId: string, alias: Multilingual) => void
  onChangeVarValue?: (varId: string, v: any) => void
  onDeleteVar?: (varId: string) => void
}

function getDefaultGroupByType() {
  const data: Record<
    StyleVar.Type,
    { vars: { id: string; info: StyleVar.Desc }[]; title: string }
  > = {
    length: { vars: [], title: '长度' },
    space: { vars: [], title: '距离' },
    color: { vars: [], title: '颜色' },
    linearGradient: { vars: [], title: '线性渐变色' },
    radialGradient: { vars: [], title: '径向渐变色' },
    boxShadow: { vars: [], title: '阴影' },
    transform: { vars: [], title: '变换' },
  }

  return data
}

function renderByType(
  type: StyleVar.Type,
  value?: any,
  disabled?: boolean,
  onChange?: (value?: any) => void,
) {
  if (type === 'length')
    return <LengthInput disabled={disabled} value={value} onChange={onChange} />
  if (type === 'space') return <SpaceInput disabled={disabled} value={value} onChange={onChange} />
  if (type === 'color') return <ColorInput disabled={disabled} value={value} onChange={onChange} />
  if (type === 'boxShadow')
    return <BoxShadowInput disabled={disabled} value={value} onChange={onChange} />
  if (type === 'linearGradient')
    return <BgLinearGradientInput disabled={disabled} value={value} onChange={onChange} />
  if (type === 'radialGradient')
    return <BgRadialGradientInput disabled={disabled} value={value} onChange={onChange} />
  if (type === 'transform')
    return <TransformInput disabled={disabled} value={value} onChange={onChange} />
  return '未定义渲染器'
}

function getDefaultValue(type: StyleVar.Type) {
  if (type === 'linearGradient' || type === 'radialGradient') {
    return { colorList: [] }
  }
}

export default function Group({
  isDisabledMain,
  group,
  disabled,
  deleteLoading,
  onChangeVarValue,
  onAddVar,
  onChangeAlias,
  onDeleteVar,
}: Props) {
  const groupByType = useMemo(() => {
    const defaultGroupByType = getDefaultGroupByType()

    Object.entries(group.vars).forEach(([id, info]) => {
      defaultGroupByType[info.type].vars.push({ id, info })
    })

    return defaultGroupByType
  }, [group])

  const handleAddStyleVar = useCallback(
    (type: StyleVar.Type) => {
      const defaultGroupByType = getDefaultGroupByType()

      const defaultAlias = defaultGroupByType[type].title
      onAddVar?.({ type, alias: defaultAlias, value: getDefaultValue(type) } as StyleVar.Desc)
    },
    [onAddVar],
  )

  return (
    <div className="style-group">
      {Object.entries(groupByType).map(([type, typeGroup]) => (
        <div className="style-one-type" key={type}>
          <label>
            {typeGroup.title}
            {!disabled && (
              <Popover trigger="hover" position="top" content="添加变量">
                <IconPlus
                  onClick={() => handleAddStyleVar(type as StyleVar.Type)}
                  className="icon-add"
                />
              </Popover>
            )}
          </label>
          <div className="style-one-vars">
            {typeGroup.vars.map(({ id, info }) => (
              <div className="style-var-item" key={id}>
                <div className="style-var-action">
                  <MultilingualInput
                    disabled={disabled || isDisabledMain?.(id)}
                    value={info.alias}
                    size="mini"
                    onInputComplete={(v) => onChangeAlias?.(id, v)}
                  />
                  {!disabled && !isDisabledMain?.(id) && (
                    <Popover
                      triggerProps={{
                        showArrow: false,
                      }}
                      position="bl"
                      trigger="click"
                      content={
                        <div className="style-var-action-tip">
                          <p>
                            确认删除当前变量？
                            <br />
                            删除后其他组相同将变量同时被删除。
                          </p>
                          <Button
                            type="primary"
                            size="mini"
                            loading={deleteLoading}
                            onClick={() => !deleteLoading && onDeleteVar?.(id)}
                          >
                            确定
                          </Button>
                        </div>
                      }
                    >
                      <IconDelete className="icon-delete" />
                    </Popover>
                  )}
                </div>
                <div>
                  {renderByType(info.type, info.value, disabled || info.disabled, (value) =>
                    onChangeVarValue?.(id, value),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
