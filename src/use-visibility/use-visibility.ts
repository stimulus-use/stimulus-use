import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import { composeEventName, extendedEvent, method } from '../support/index'
import { VisibilityComposableController } from './visibility-controller'

export interface VisibilityOptions extends StimulusUseOptions {
  dispatchEvent?: boolean
  eventPrefix?: boolean | string
}

const defaultOptions = {
  dispatchEvent: true,
  eventPrefix: true,
}

export class UseVisibility extends StimulusUse {
  controller: VisibilityComposableController
  eventPrefix!: boolean | string
  dispatchEvent!: boolean

  constructor(controller: VisibilityComposableController, options: VisibilityOptions = {}) {
    super(controller, options)
    const { dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options)
    Object.assign(this, { dispatchEvent, eventPrefix })

    this.controller = controller

    const disconnect = () => {
      this.unobserve()
      this.controllerDisconnect()
    }

    Object.assign(controller, { disconnect })

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
  private becomesInvisible = (event?: Event) => {
    const eventName = composeEventName('invisible', this.controller, this.eventPrefix)

    this.controller.isVisible = false
    method(this.controller, 'invisible').call(this.controller)
    this.log('invisible', { isVisible: false })

    this.dispatch(eventName, event)
  }

  private becomesVisible = (event?: Event) => {
    const eventName = composeEventName('visible', this.controller, this.eventPrefix)

    this.controller.isVisible = true
    method(this.controller, 'visible').call(this.controller)
    this.log('visible', { isVisible: true })

    this.dispatch(eventName, event)
  }

  private dispatch = (eventName: string, event?: Event) => {
    if (this.dispatchEvent) {
      const detail = { controller: this.controller, isVisible: this.controller.isVisible }
      const visibilityEvent = extendedEvent(eventName, event || null, detail)
      this.controller.element.dispatchEvent(visibilityEvent)
      this.log('dispatchEvent', { eventName, ...detail })
    }
  }

  private handleVisibilityChange = (event?: Event) => {
    if (document.hidden) {
      this.becomesInvisible(event)
    } else {
      this.becomesVisible(event)
    }
  }
}

export const useVisibility = (controller: VisibilityComposableController, options: VisibilityOptions = {}) => {
  const observer = new UseVisibility(controller, options)
  return [observer.observe, observer.unobserve] as const
}
