import { useMemo } from 'react'
import { useEffectCallback, useUrlState } from '@shuttler/helper'
import classNames from 'classnames'
import { Input } from '@arco-design/web-react'
import { IconSearch } from '@arco-design/web-react/icon'
import EasyCoderStyleProvider, { EasyCoderStyleProviderProps } from '../context/provider'

import defaultConfig from '../defaultConfig'
import { StyleDefine, StyleRenderConfig } from '../type'

import './index.scss'

interface Props extends Omit<EasyCoderStyleProviderProps, 'children'> {
  style?: React.CSSProperties
  className?: string
  value?: StyleDefine
  disabled?: boolean
  supportModels?: (keyof StyleDefine)[]
  onChange?: (value?: StyleDefine) => void
}

type RenderWithProName<T extends keyof StyleDefine> = {
  proName: T
} & StyleRenderConfig['fieldRender'][T]

interface RenderWithGroup {
  key: string
  label: string
  renderList: RenderWithProName<keyof StyleDefine>[]
}

export default function StyleSetter({
  style,
  className,
  value,
  supportModels,
  disabled,
  onChange,
  ...extra
}: Props) {
  const [searchText, setSearchText] = useUrlState<string>(
    {
      searchKey: 'styleSearchText',
      removeFromUrlWhenUnMont: false,
    },
    '',
  )

  const renderWithGroups = useMemo(() => {
    const groups: Record<string, RenderWithGroup> = {}

    for (const groupKey in defaultConfig.groupLabelMap) {
      groups[groupKey] = {
        key: groupKey,
        label: defaultConfig.groupLabelMap[groupKey],
        renderList: [],
      }
    }

    const currentModels = Object.keys(defaultConfig.fieldRender) as (keyof StyleDefine)[]
    const proList = supportModels || currentModels
    currentModels.forEach((proName) => {
      if (!proList.includes(proName)) return

      const renderConfig = defaultConfig.fieldRender[proName]
      if (!renderConfig) return

      if (!renderConfig.label.includes(searchText)) return

      const group = groups[renderConfig.groupKey]
      if (!group) return

      group.renderList.push({
        proName,
        ...renderConfig,
      })
    })

    return Object.values(groups).filter((group) => group.renderList.length > 0)
  }, [supportModels, searchText])

  const handleChangeStyleByPro = useEffectCallback(
    (proName: keyof StyleDefine, v: any) => {
      const newValue = { ...value }
      if (v === undefined) {
        delete newValue[proName]
      } else {
        newValue[proName] = v
      }

      onChange?.(newValue)
    },
    [onChange, value],
  )

  const handleMergeStyle = useEffectCallback(
    (v?: StyleDefine) => {
      if (!v) return

      onChange?.({ ...value, ...v })
    },
    [onChange, value],
  )

  return (
    <EasyCoderStyleProvider {...extra}>
      <div style={style} className={classNames('style-setter-wrapper', className)}>
        <div className="style-setter-search">
          <Input
            prefix={<IconSearch />}
            type="search"
            size="mini"
            placeholder="请输入关键词"
            value={searchText}
            onChange={setSearchText}
          />
        </div>
        <div className="style-setter-group-list">
          {renderWithGroups.map((group) => (
            <div className="style-setter-group" key={group.key}>
              <label className="style-setter-group-label">{group.label}</label>
              {group.renderList.map((render) => (
                <div key={render.proName} className="style-setter-field">
                  <render.Render
                    disabled={disabled}
                    label={render.label}
                    value={value?.[render.proName] as any}
                    style={value}
                    onChange={(v) => handleChangeStyleByPro(render.proName, v)}
                    onChangeStyle={onChange}
                    onMergeStyle={handleMergeStyle}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </EasyCoderStyleProvider>
  )
}
