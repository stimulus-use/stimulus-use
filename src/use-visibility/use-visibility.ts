import { VisibilityController } from './visibility-controller'
import { extendedEvent, method, composeEventName } from '../support'

export interface VisibilityOptions {
  dispatchEvent?: boolean
  eventPrefix?: boolean | string
}

const defaultOptions = {
  dispatchEvent: true,
  eventPrefix: true
}

export class UseVisibility {
  delegate: VisibilityController
  eventPrefix!: boolean | string
  dispatchEvent!: boolean

  constructor(controller: VisibilityController, options: VisibilityOptions = {}) {
    const { dispatchEvent, eventPrefix } = Object.assign(defaultOptions, options)
    Object.assign(this, { dispatchEvent, eventPrefix })
    this.delegate = controller
    const controllerDisconnect = controller.disconnect.bind(controller)

    const unobserve = this.unobserve
    Object.assign(controller, {
      disconnect() {
        unobserve()
        controllerDisconnect()
      }
    })

    this.observe()
  }

  observe = () => {
    this.delegate.isVisible = !document.hidden
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  unobserve = () => {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  }

  private dispatchInvisible = (event?: Event) => {
    const eventName = composeEventName('invisible', this.delegate, this.eventPrefix)

    this.delegate.isVisible = false
    this.delegate.invisible && method(this.delegate, 'invisible').call(this.delegate, event)

    if (this.dispatchEvent) {
      const invisibleEvent = extendedEvent(eventName, event || null, { controller: this.delegate })
      this.delegate.element.dispatchEvent(invisibleEvent)
    }
  }

  private dispatchVisible = (event?: Event) => {
    const eventName = composeEventName('Visible', this.delegate, this.eventPrefix)

    this.delegate.isVisible = true
    this.delegate.visible && method(this.delegate, 'visible').call(this.delegate, event)

    if (this.dispatchEvent) {
      const visibleEvent = extendedEvent(eventName, event || null, { controller: this.delegate })
      this.delegate.element.dispatchEvent(visibleEvent)
    }
  }

  private handleVisibilityChange = (event: Event) => {
    if (document.hidden) {
      this.dispatchInvisible(event)
    } else {
      this.dispatchVisible(event)
    }
  }
}

export const useVisibility = (controller: VisibilityController, options: VisibilityOptions = {}) => {
  const observer = new UseVisibility(controller, options)
  return [observer.observe, observer.unobserve] as const
}
