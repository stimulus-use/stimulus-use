import { Controller } from 'stimulus'
import { composeEventName } from '../support/index'

export interface DispatchOptions {
  element?: Element
  eventPrefix?: boolean | string
  bubbles?: boolean
  cancelable?: boolean
}

const defaultOptions = {
  eventPrefix: true,
  bubbles: true,
  cancelable: true
}

export const useDispatch = (controller: Controller, options?: DispatchOptions) => {
  const targetElement: Element = options?.element || controller.element
  const { eventPrefix, bubbles, cancelable } = Object.assign(defaultOptions, options)

  Object.assign(controller, {
    dispatch(eventName: string, detail = {}): CustomEvent {

      // includes the emitting controller in the event detail
      Object.assign(detail, { controller })

      const eventNameWithPrefix = composeEventName(eventName, controller, eventPrefix)

      // creates the custom event
      const event = new CustomEvent(eventNameWithPrefix, {
        detail,
        bubbles,
        cancelable,
      })

      // dispatch it from the given element or by default from the root element of the controller
      targetElement.dispatchEvent(event)

      return event
    }
  })
}
