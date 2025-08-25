type EventListener<T> = (data: T) => void

export default class EventManager {
  private listenerMap: Record<string, EventListener<any>[]> = {}

  addEventListener<T>(type: string, listener: EventListener<T>) {
    if (!this.listenerMap[type]) {
      this.listenerMap[type] = []
    }

    this.listenerMap[type].push(listener)

    return () => {
      this.listenerMap[type] = this.listenerMap[type].filter((fn) => fn !== listener)
    }
  }

  clearListener(type: string) {
    delete this.listenerMap[type]
  }

  triggerListener<T>(type: string, data: T) {
    this.listenerMap[type]?.forEach((fn) => fn(data))
  }
}
