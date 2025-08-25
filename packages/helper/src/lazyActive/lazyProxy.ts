import { PathItem, LazyActiveValue } from '.'

export default function lazyProxy<T extends LazyActiveValue>(v: T, parentPath: PathItem[], cb: (path: PathItem[]) => void): T {
  return new Proxy(v, {
    get(target, p, receiver) {
      const v = target[p as keyof T]

      if (v instanceof Object || v instanceof Array) {
        return lazyProxy(v, [...parentPath, p as string], cb)
      }

      return v
    },
    set(target, p, newValue, receiver) {
      if (target[p as keyof T] === newValue) return true

      target[p as keyof T] = newValue

      cb([...parentPath, p as string])

      return true
    },
    deleteProperty(target, p) {
      delete target[p as keyof T]

      cb([...parentPath, p as string])

      return true
    },
  })
}
