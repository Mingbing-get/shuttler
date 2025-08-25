import { useCallback, useMemo, useState } from 'react'
import { List, Input, Button, Popover, Modal, Spin } from '@arco-design/web-react'
import { IconPlus, IconSearch, IconDelete, IconEdit } from '@arco-design/web-react/icon'
import { generateId, useHold, useUrlState, MultilingualInput } from '@shuttler/helper'
import { Multilingual, i18n } from '@shuttler/i18n'

import SingleClassName from './single'
import { ClassName, StyleVar } from '../type'
import './index.scss'

interface Props {
  styleVarMap?: Record<string, StyleVar.Desc>
  classNames?: Record<string, ClassName>
  disabled?: boolean
  onBeforeDelete?: (classNameId: string) => Promise<boolean>
  onChange?: (classNames?: Record<string, ClassName>) => void
}

interface ClassNameWithId {
  id: string
  className: ClassName
}

export default function ClassNameSetter({
  classNames,
  styleVarMap,
  disabled,
  onBeforeDelete,
  onChange,
}: Props) {
  const [_classNames, setClassNames] = useHold(classNames, onChange)
  const [searchText, setSearchText] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [currEditId, setCurrEditId] = useUrlState<string>({
    searchKey: 'classNameId',
  })

  const classNameWithId = useMemo(() => {
    const classNameWithId: ClassNameWithId[] = []

    for (const id in _classNames) {
      if (!i18n.translate(_classNames[id].alias || '')?.includes(searchText)) continue

      classNameWithId.push({
        id,
        className: _classNames[id],
      })
    }

    return classNameWithId
  }, [_classNames, searchText])

  const handleAdd = useCallback(() => {
    const id = generateId('class_name')

    setClassNames((old) => {
      return {
        ...old,
        [id]: {
          alias: {},
        },
      }
    })
    setCurrEditId(id)
  }, [])

  const handleUpdateAlias = useCallback((id: string, alias: Multilingual) => {
    setClassNames((old) => {
      if (!old?.[id]) return

      const item = { ...old[id], alias }

      return {
        ...old,
        [id]: item,
      }
    })
  }, [])

  const handleUpdate = useCallback((id: string, v: ClassName) => {
    setClassNames((old) => {
      if (!old?.[id]) return

      return {
        ...old,
        [id]: v,
      }
    })
  }, [])

  const handleDelete = useCallback(
    async (id: string) => {
      if (onBeforeDelete) {
        setDeleteLoading(true)
        const canDelete = await onBeforeDelete(id)
        setDeleteLoading(false)
        if (!canDelete) return
      }

      setClassNames((old) => {
        const newValue = { ...old }
        delete newValue[id]

        return newValue
      })
    },
    [onBeforeDelete],
  )

  return (
    <div className="class-name-setter-wrapper">
      <div className="class-name-setter-top">
        <Input
          prefix={<IconSearch />}
          size="mini"
          placeholder="请输入关键词"
          value={searchText}
          onChange={setSearchText}
        />
        {!disabled && (
          <Button type="primary" size="mini" icon={<IconPlus />} onClick={handleAdd}>
            添加
          </Button>
        )}
      </div>
      <List
        size="small"
        dataSource={classNameWithId}
        pagination={{ pageSize: 6, hideOnSinglePage: true }}
        render={(item) => (
          <List.Item
            key={item.id}
            className="class-name-setter-item"
            actions={[
              <Popover trigger="hover" position="top" content="编辑样式">
                <IconEdit
                  className="class-name-setter-edit-icon"
                  onClick={() => setCurrEditId(item.id)}
                />
              </Popover>,
              !item.className.disabled && !disabled ? (
                <Popover trigger="hover" position="top" content="删除样式名">
                  <Spin loading={deleteLoading}>
                    <IconDelete
                      className="class-name-setter-delete-icon"
                      onClick={() => !deleteLoading && handleDelete(item.id)}
                    />
                  </Spin>
                </Popover>
              ) : null,
            ]}
          >
            <MultilingualInput
              size="mini"
              disabled={item.className.disabled || disabled}
              value={item.className.alias}
              onInputComplete={(v) => handleUpdateAlias(item.id, v)}
            />
          </List.Item>
        )}
      />
      <Modal
        visible={!!_classNames?.[currEditId || '']}
        footer={null}
        title={
          currEditId &&
          _classNames && (
            <div style={{ paddingRight: '1.5rem' }}>
              <MultilingualInput
                size="small"
                disabled={_classNames[currEditId]?.disabled || disabled}
                value={_classNames[currEditId]?.alias}
                onInputComplete={(v) => handleUpdateAlias(currEditId, v)}
              />
            </div>
          )
        }
        onCancel={() => setCurrEditId(undefined)}
      >
        {currEditId && _classNames && _classNames[currEditId] && (
          <SingleClassName
            disabled={disabled}
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
            value={_classNames[currEditId]}
            styleVarMap={styleVarMap}
            onChange={(v) => handleUpdate(currEditId, v)}
          />
        )}
      </Modal>
    </div>
  )
}
