import { useCallback, useState } from 'react'
import { useHold, generateId, useEffectCallback, MultilingualInput } from '@shuttler/helper'
import { i18n, Multilingual } from '@shuttler/i18n'
import { Collapse, Popover, Button, Tag } from '@arco-design/web-react'
import { IconDelete, IconCopy } from '@arco-design/web-react/icon'

import { StyleVar, StyleVarGroup } from '../type'
import Group from './group'

import './index.scss'

interface Props {
  groups: StyleVarGroup[]
  disabled?: boolean
  canChangeActive?: boolean
  onBeforeDelete?: (styleVarId: string) => Promise<boolean>
  onChange?: (group: StyleVarGroup[]) => void
}

export default function StyleVarGroupSetter({
  groups,
  disabled,
  canChangeActive,
  onBeforeDelete,
  onChange,
}: Props) {
  const [_groups, setGroups] = useHold(groups, onChange)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const updateGroupAlias = useCallback((groupId: string, alias: Multilingual) => {
    setGroups((old) => {
      const groupIndex = old.findIndex((group) => group.id === groupId)
      if (groupIndex === -1) return old

      const group = { ...old[groupIndex], alias }
      if (group.disabled) return old

      const newGroups = [...old]
      newGroups.splice(groupIndex, 1, group)

      return newGroups
    })
  }, [])

  const changeActiveGroup = useCallback((groupId: string) => {
    setGroups((old) => {
      const groupIndex = old.findIndex((group) => group.id === groupId)
      if (groupIndex === -1) return old

      const group = { ...old[groupIndex], active: true }
      const newGroups = [...old]
      newGroups.splice(groupIndex, 1, group)

      return newGroups.map((group) => {
        if (group.id === groupId) return group

        return { ...group, active: false }
      })
    })
  }, [])

  const copyStyleVarGroup = useCallback((groupId: string) => {
    setGroups((old) => {
      const group = old.find((group) => group.id === groupId)
      if (!group) return old

      const copyGroup: StyleVarGroup = JSON.parse(JSON.stringify(group))
      copyGroup.active = false
      copyGroup.disabled = false
      copyGroup.id = generateId('style_var_group')
      copyGroup.alias = { [i18n.getLangCode()]: `${i18n.translateFillEmpty(copyGroup.alias)} 副本` }
      for (const key in copyGroup.vars) {
        copyGroup.vars[key].disabled = false
      }

      return [...old, copyGroup]
    })
  }, [])

  const deleteStyleVarGroup = useCallback((groupId: string) => {
    setGroups((old) => {
      const index = old.findIndex((group) => group.id === groupId)
      if (index === -1) return old

      const deleteGroup = old[index]
      if (deleteGroup.disabled) return old

      const newGroups = [...old]
      newGroups.splice(index, 1)

      if (deleteGroup.active) {
        newGroups[0].active = true
      }

      return newGroups
    })
  }, [])

  const addStyleVar = useCallback((v: StyleVar.Desc) => {
    const id = generateId('style_var')
    setGroups((old) => {
      return old.map((group) => {
        const vars = { ...group.vars, [id]: JSON.parse(JSON.stringify(v)) }

        return {
          ...group,
          vars,
        }
      })
    })
  }, [])

  const changeStyleVarAlias = useCallback((varId: string, alias: Multilingual) => {
    setGroups((old) => {
      const disabledUpdateAlias = old.some((group) => group.vars[varId].disabled)

      if (disabledUpdateAlias) return old

      return old.map((group) => {
        const vars = { ...group.vars }
        vars[varId].alias = alias

        return {
          ...group,
          vars,
        }
      })
    })
  }, [])

  const changeStyleVarValue = useCallback((groupId: string, varId: string, v: any) => {
    setGroups((old) => {
      return old.map((group) => {
        if (group.id !== groupId || group.disabled) return group

        const vars = { ...group.vars }
        vars[varId].value = v

        return {
          ...group,
          vars,
        }
      })
    })
  }, [])

  const deleteStyleVar = useCallback(
    async (varId: string) => {
      if (onBeforeDelete) {
        setDeleteLoading(true)
        const canDelete = await onBeforeDelete(varId)
        setDeleteLoading(false)
        if (!canDelete) return
      }

      setGroups((old) => {
        const disabledUpdateAlias = old.some((group) => group.vars[varId].disabled)

        if (disabledUpdateAlias) return old

        return old.map((group) => {
          const vars = { ...group.vars }
          delete vars[varId]

          return {
            ...group,
            vars,
          }
        })
      })
    },
    [onBeforeDelete],
  )

  const isDisabledMain = useEffectCallback(
    (varId: string) => {
      return _groups.some((group) => group.vars[varId].disabled)
    },
    [_groups],
  )

  return (
    <div className="style-var-group-list">
      <Collapse>
        {groups.map((group) => (
          <Collapse.Item
            key={group.id}
            name={group.id}
            header={
              <div className="style-var-group-header" onClick={(e) => e.stopPropagation()}>
                <MultilingualInput
                  disabled={group.disabled || disabled}
                  size="mini"
                  value={group.alias}
                  onInputComplete={(v) => updateGroupAlias(group.id, v)}
                />
                {group.active ? (
                  <Tag className="style-var-tag" color="var(--color-success-light-4)">
                    已启用
                  </Tag>
                ) : (
                  <Popover
                    position="bl"
                    trigger="click"
                    triggerProps={{
                      showArrow: false,
                    }}
                    content={
                      <div className="style-var-action-tip">
                        <p>
                          确认启用当前组样式变量？
                          <br />
                          启用后所有使用样式变量的地方将被替换。
                        </p>
                        <Button
                          type="primary"
                          size="mini"
                          disabled={!canChangeActive && disabled}
                          onClick={() => changeActiveGroup(group.id)}
                        >
                          确定
                        </Button>
                      </div>
                    }
                  >
                    <Tag className="style-var-tag" color="var(--color-warning-light-4)">
                      未启用
                    </Tag>
                  </Popover>
                )}
                {!disabled && (
                  <Popover position="top" trigger="hover" content="复制一组样式变量">
                    <IconCopy
                      className="action-icon icon-copy"
                      onClick={() => copyStyleVarGroup(group.id)}
                    />
                  </Popover>
                )}
                {groups.length > 1 && !group.disabled && !disabled && (
                  <Popover
                    triggerProps={{
                      showArrow: false,
                    }}
                    position="bl"
                    trigger="click"
                    content={
                      <div className="style-var-action-tip">
                        <p>确认删除当前组样式变量?</p>
                        <Button
                          type="primary"
                          size="mini"
                          onClick={() => deleteStyleVarGroup(group.id)}
                        >
                          确定
                        </Button>
                      </div>
                    }
                  >
                    <IconDelete className="action-icon icon-delete" />
                  </Popover>
                )}
              </div>
            }
          >
            <Group
              group={group}
              disabled={disabled}
              deleteLoading={deleteLoading}
              isDisabledMain={isDisabledMain}
              onAddVar={addStyleVar}
              onChangeAlias={changeStyleVarAlias}
              onChangeVarValue={(varId, v) => changeStyleVarValue(group.id, varId, v)}
              onDeleteVar={deleteStyleVar}
            />
          </Collapse.Item>
        ))}
      </Collapse>
    </div>
  )
}
