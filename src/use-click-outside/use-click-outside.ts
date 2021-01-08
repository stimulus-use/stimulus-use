import { Controller } from 'stimulus'
import { method, extendedEvent, isElementInViewport, composeEventName } from '../support/index'

interface ClickOutsideController extends Controller {
  clickOutside?: (event: Event) => void
}

export interface ClickOutsideOptions {
  element?: Element
  events?: string[]
  onlyVisible?: boolean
  dispatchEvent?: boolean
  eventPrefix?: boolean | string
}

const defaultOptions = {
  events: ['click', 'touchend'],
  onlyVisible: true,
  dispatchEvent: true,
  eventPrefix: true,
}

export const useClickOutside = (controller: ClickOutsideController, options: ClickOutsideOptions = {}) => {
  const { onlyVisible, dispatchEvent, events, eventPrefix } = Object.assign({}, defaultOptions, options)

  const onEvent = (event: Event) => {
    const targetElement: Element = options?.element || controller.element

    if (targetElement.contains(event.target as Node) || (!isElementInViewport(targetElement) && onlyVisible)) {
      return
    }

    // call the clickOutside method of the Stimulus controller
    controller.clickOutside && method(controller, 'clickOutside').call(controller, event)

    // emit a custom event
    if (dispatchEvent) {
      const eventName = composeEventName('click:outside', controller, eventPrefix)

      const clickOutsideEvent = extendedEvent(eventName, event, { controller })
      targetElement.dispatchEvent(clickOutsideEvent)
    }
  }

  const observe = () => {
    events?.forEach(event => {
      window.addEventListener(event, onEvent, false)
    })
  }

  const unobserve = () => {
    events?.forEach(event => {
      window.removeEventListener(event, onEvent, false)
    })
  }

  // keep a copy of the current disconnect() function of the controller
  // to support composing several behaviors
  const controllerDisconnect = controller.disconnect.bind(controller)

  Object.assign(controller, {
    disconnect() {
      unobserve()
      controllerDisconnect()
    },
  })

  observe()

  return [observe, unobserve] as const
}
