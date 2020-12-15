import { VisibilityController } from './visibility-controller'
import { extendedEvent, method, composeEventName } from '../support/index'

export interface VisibilityOptions {
  dispatchEvent?: boolean
  eventPrefix?: boolean | string
}

const defaultOptions = {
  dispatchEvent: true,
  eventPrefix: true
}

export class UseVisibility {
  controller: VisibilityController
  eventPrefix!: boolean | string
  dispatchEvent!: boolean

  constructor(controller: VisibilityController, options: VisibilityOptions = {}) {
    const { dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options)
    Object.assign(this, { dispatchEvent, eventPrefix })

    this.controller = controller

    // make a copy as this.unobserve is not available within Object.assign ??
    const unobserve = this.unobserve
    const controllerDisconnect = controller.disconnect.bind(controller)

    Object.assign(controller, {
      disconnect() {
        unobserve()
        controllerDisconnect()
      }
    })

    // triggers initial callback on connect
    this.handleVisibilityChange()

    this.observe()
  }

  observe = () => {
    this.controller.isVisible = !document.hidden
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  unobserve = () => {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  }

  // private
  private dispatchInvisible = (event?: Event) => {
    const eventName = composeEventName('invisible', this.controller, this.eventPrefix)

    this.controller.isVisible = false
    this.controller.invisible && method(this.controller, 'invisible').call(this.controller, event)

    this.dispatch(eventName, event)
  }

  private dispatchVisible = (event?: Event) => {
    const eventName = composeEventName('visible', this.controller, this.eventPrefix)

    this.controller.isVisible = true
    this.controller.visible && method(this.controller, 'visible').call(this.controller, event)

    this.dispatch(eventName, event)
  }

  private dispatch = (eventName: string, event?: Event) => {
    if (this.dispatchEvent) {
      const visibilityEvent = extendedEvent(eventName, event || null, { controller: this.controller })
      this.controller.element.dispatchEvent(visibilityEvent)
    }
  }

  private handleVisibilityChange = (event?: Event) => {
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
