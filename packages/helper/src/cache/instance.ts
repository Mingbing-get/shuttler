import { CacheMatchFn, CacheItem, CacheOptions } from './type'

export default class Cache<T> {
  private matchList: CacheMatchFn<T>[] = []
  private data: Map<symbol, CacheItem<T>> = new Map()

  async getWithCache<R>(mark: T, execute: () => Promise<R>, options?: CacheOptions): Promise<R> {
    const cacheItem = this.findCacheItem(mark)

    if (cacheItem) {
      return cacheItem.result
    }

    const result = execute()
    const unique = Symbol('cache-symbol')

    this.data.set(unique, { mark, id: unique, result })

    const data = await result
    this.cacheExpire(unique, options?.expireTime)
    options?.uniqueCb?.(unique)

    return data
  }

  useMatch(fn: CacheMatchFn<T>) {
    this.matchList.push(fn)
  }

  removeCacheByMark(mark: T) {
    const cacheItem = this.findCacheItem(mark)

    if (cacheItem) {
      this.data.delete(cacheItem.id)
    }
  }

  removeCacheById(unique: symbol) {
    this.data.delete(unique)
  }

  private cacheExpire(unique: symbol, expireTime?: number) {
    if (expireTime === undefined) return

    setTimeout(() => {
      this.removeCacheById(unique)
    }, expireTime)
  }

  private findCacheItem(mark: T): CacheItem<T> | undefined {
    for (const item of this.data.values()) {
      if (this.matchList.some((fn) => fn(item.mark, mark))) {
        return item
      }
    }
  }
}
