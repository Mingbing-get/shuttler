export interface CacheMatchFn<T> {
  (cacheMark: T, mark: T): boolean
}

export interface CacheItem<T> {
  mark: T
  id: symbol
  result: Promise<any>
}

export interface CacheOptions {
  expireTime?: number
  uniqueCb?: (unique: symbol) => void
}
