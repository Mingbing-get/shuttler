import { useEffect, useState } from 'react'

import LazyActive, { LazyActiveValue, PathItem } from '../lazyActive'
import { isTwoWayPrefix, isPrefixPath } from '../utils'

export default function useLazyActive<T extends LazyActiveValue>(lazyActive: LazyActive<T>, observePath: PathItem[], deep?: boolean) {
  const [value, setValue] = useState(lazyActive.getValue<any>(observePath))

  useEffect(() => {
    setValue(lazyActive.getValue(observePath))

    const remove = lazyActive.addChangeListener((paths) => {
      const needSetValue = paths.some((path) => {
        if (deep) {
          if (isTwoWayPrefix(path, observePath)) return true
        } else {
          if (isPrefixPath(path, observePath)) return true
        }
      })

      if (needSetValue) {
        setValue(shallowClone(lazyActive.getValue(observePath)))
      }
    })

    return remove
  }, [observePath, deep])

  return value
}

function shallowClone(v: any) {
  if (v instanceof Array) {
    return [...v]
  }

  if (typeof v === 'object') {
    return { ...v }
  }

  return v
}
