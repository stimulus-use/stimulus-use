import { composeEventName } from '../support/index'
import { Controller } from 'stimulus'
import { StimulusUse, StimulusUseOptions } from '../stimulus_use'

export interface DispatchOptions extends StimulusUseOptions {
  element?: Element
  eventPrefix?: boolean | string
  bubbles?: boolean
  cancelable?: boolean
}

const defaultOptions = {
  eventPrefix: true,
  bubbles: true,
  cancelable: true,
}

export class UseDispatch extends StimulusUse {
  targetElement: Element
  eventPrefix: boolean | string
  bubbles: boolean
  cancelable: boolean

  constructor(controller: Controller, options: DispatchOptions) {
    super(controller, options)

    this.targetElement = options?.element || controller.element
    this.eventPrefix = options?.eventPrefix || defaultOptions.eventPrefix
    this.bubbles = options?.bubbles || defaultOptions.bubbles
    this.cancelable = options?.cancelable || defaultOptions.cancelable

    this.enhanceController()
  }

  private enhanceController() {
    const { controller, targetElement, eventPrefix, bubbles, cancelable, log } = this
    const dispatch = (eventName: string, detail = {}): CustomEvent => {

      // includes the emitting controller in the event detail
      Object.assign(detail, { controller })

      const eventNameWithPrefix = composeEventName(eventName, controller, eventPrefix)

      // creates the custom event
      const event = new CustomEvent(eventNameWithPrefix, {
        detail,
        bubbles,
        cancelable,
      })

      // dispatch the event from the given element or by default from the root element of the controller
      targetElement.dispatchEvent(event)

      log("useDispatch", { eventName: eventNameWithPrefix, detail, bubbles, cancelable })

      return event
    }

    Object.assign(this.controller, { dispatch })
  }
}

export const useDispatch = (controller: Controller, options: DispatchOptions) => {
  return new UseDispatch(controller, options)
}
