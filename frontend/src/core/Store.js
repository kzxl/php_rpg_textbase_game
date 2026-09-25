/**
 * Lightweight Reactive Store & Event Bus for LiteUI Mini Framework.
 * Enables decoupled component communication without prop drilling.
 */
export class Store {
  constructor(initialState = {}) {
    this.state = initialState
    this.subscribers = new Map()
    this.events = new Map()
  }

  /**
   * Get current snapshot of a state slice or entire state.
   */
  getState(key) {
    return key ? this.state[key] : this.state
  }

  /**
   * Set state slice and notify subscribers.
   */
  setState(key, value) {
    const oldValue = this.state[key]
    this.state[key] = value
    const keySubscribers = this.subscribers.get(key) || []
    keySubscribers.forEach(callback => callback(value, oldValue))
  }

  /**
   * Subscribe to changes on a specific state key.
   * Returns an unsubscribe function.
   */
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, [])
    }
    this.subscribers.get(key).push(callback)
    return () => {
      const subs = this.subscribers.get(key) || []
      this.subscribers.set(key, subs.filter(cb => cb !== callback))
    }
  }

  /**
   * Emit an event to registered event listeners.
   */
  emit(eventName, data) {
    const handlers = this.events.get(eventName) || []
    handlers.forEach(handler => handler(data))
  }

  /**
   * Listen for an emitted event.
   * Returns an unsubscribe function.
   */
  on(eventName, handler) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }
    this.events.get(eventName).push(handler)
    return () => {
      const handlers = this.events.get(eventName) || []
      this.events.set(eventName, handlers.filter(h => h !== handler))
    }
  }
}

export const globalStore = new Store()
