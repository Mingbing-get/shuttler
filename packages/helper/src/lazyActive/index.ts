import lazyProxy from './lazyProxy'

export type PathItem = string | number

export type LazyActiveValue = Array<any> | Record<string, any>

export interface ChangeListener {
  (triggerPath: PathItem[][]): void
}

export interface UpdateFn<T extends LazyActiveValue> {
  (oldValue: T): void
}

export type UnpackLazyActiveObject<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends LazyActive<infer R> ? R : T[K]
}

export default class LazyActive<T extends LazyActiveValue> {
  private value: T
  private changeListeners: ChangeListener[] = []

  constructor(defaultValue: T) {
    this.value = defaultValue
  }

  private triggerListener(path: PathItem[][]) {
    this.changeListeners.forEach((fn) => fn(path))
  }

  async updateValue(fn: UpdateFn<T> | T) {
    if (typeof fn === 'function') {
      const updatePath: PathItem[][] = []
      const withProxyValue = lazyProxy(this.value, [], (path) => {
        updatePath.push(path)
      })

      await fn(withProxyValue)
      this.triggerListener(updatePath)
    } else {
      this.value = fn
      this.triggerListener([[]])
    }
  }

  updateValueByPath(path: PathItem[], value: any) {
    if (!path.length) return

    let v: any = this.value
    for (let i = 0; i < path.length - 1; i++) {
      if (!v[path[i]]) {
        v[path[i]] = {}
      }
      v = v[path[i]]
    }

    if (v[path[path.length - 1]] === value) return

    v[path[path.length - 1]] = value
    this.triggerListener([path])
  }

  getValue<R>(path?: PathItem[]): R {
    if (!path) {
      return this.value as any as R
    }

    let v = this.value as any
    for (let i = 0; i < path.length; i++) {
      v = v?.[path[i]]
    }
    return v
  }

  addChangeListener(fn: ChangeListener) {
    this.changeListeners.push(fn)

    return () => {
      this.changeListeners = this.changeListeners.filter((item) => item !== fn)
    }
  }
}
