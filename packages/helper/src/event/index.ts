type EventListener<T> = (data: T) => void

export default class EventManager<T extends Record<string, any>> {
  private listenerMap: Record<string, EventListener<any>[]> = {}

  on<K extends keyof T>(_type: K, listener: EventListener<T[K]>) {
    const type = _type as string
    if (!this.listenerMap[type]) {
      this.listenerMap[type] = []
    }

    this.listenerMap[type].push(listener)

    return () => {
      this.listenerMap[type] = this.listenerMap[type].filter((fn) => fn !== listener)
    }
  }

  disconnect(type: keyof T) {
    delete this.listenerMap[type as string]
  }

  emit<K extends keyof T>(type: K, data: T[K]) {
    this.listenerMap[type as string]?.forEach((fn) => fn(data))
  }
}
