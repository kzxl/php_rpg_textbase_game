/**
 * Base Component for LiteUI Vanilla Component Model.
 * Provides reactive state management, lifecycle hooks, scoped event delegation,
 * and managed timers with automatic cleanup on unmount.
 */
export class Component {
  constructor(props = {}) {
    this.props = props
    this.state = this.initialState ? this.initialState() : {}
    this.el = null
    this._eventListeners = []
    this._activeIntervals = []
    this._activeTimeouts = []
    this._isMounted = false
  }

  /**
   * Override to declare initial component state.
   */
  initialState() {
    return {}
  }

  /**
   * Update component state and trigger an automatic re-render.
   * @param {Object|Function} updater
   */
  setState(updater) {
    const nextState = typeof updater === 'function' ? updater(this.state) : updater
    this.state = { ...this.state, ...nextState }
    if (this._isMounted) {
      this.update()
    }
  }

  /**
   * Return the HTML template string for this component.
   * @returns {string}
   */
  template() {
    return ''
  }

  /**
   * Mount component into a container DOM element.
   * @param {HTMLElement} container
   */
  mount(container) {
    if (!container) return
    this.container = container
    this.render()
    this._isMounted = true
    this.onMounted()
  }

  /**
   * Render or re-render component contents.
   */
  render() {
    this.cleanupListeners()
    const html = this.template()
    if (this.container) {
      this.container.innerHTML = html
      this.el = this.container
      this.bindEvents()
    }
  }

  /**
   * Update method called when state changes.
   */
  update() {
    this.render()
    this.onUpdated()
  }

  /**
   * Scoped event delegation: binds event listener on container matching selector.
   * @param {string} eventName - e.g. 'click', 'change'
   * @param {string} selector - CSS selector
   * @param {Function} handler - callback(event, targetElement)
   */
  on(eventName, selector, handler) {
    if (!this.container) return
    const listener = (e) => {
      const target = e.target.closest(selector)
      if (target && this.container.contains(target)) {
        handler.call(this, e, target)
      }
    }
    this.container.addEventListener(eventName, listener)
    this._eventListeners.push({ eventName, listener })
  }

  /**
   * Managed setInterval: automatically cleared when component unmounts.
   */
  setInterval(callback, intervalMs) {
    const id = window.setInterval(callback, intervalMs)
    this._activeIntervals.push(id)
    return id
  }

  /**
   * Managed setTimeout: automatically cleared when component unmounts.
   */
  setTimeout(callback, timeoutMs) {
    const id = window.setTimeout(callback, timeoutMs)
    this._activeTimeouts.push(id)
    return id
  }

  /**
   * Remove all bound scoped DOM event listeners.
   */
  cleanupListeners() {
    if (this.container) {
      this._eventListeners.forEach(({ eventName, listener }) => {
        this.container.removeEventListener(eventName, listener)
      })
    }
    this._eventListeners = []
  }

  /**
   * Unmount component and clean up all resources.
   */
  unmount() {
    this._isMounted = false
    this.cleanupListeners()
    this._activeIntervals.forEach(id => window.clearInterval(id))
    this._activeIntervals = []
    this._activeTimeouts.forEach(id => window.clearTimeout(id))
    this._activeTimeouts = []
    this.onUnmounted()
  }

  /**
   * Lifecycle Hook: Called after component is mounted to DOM.
   */
  onMounted() {}

  /**
   * Lifecycle Hook: Called after component updates due to state change.
   */
  onUpdated() {}

  /**
   * Lifecycle Hook: Called after component unmounts from DOM.
   */
  onUnmounted() {}

  /**
   * Declarative event bindings to be overridden by child components.
   */
  bindEvents() {}
}
