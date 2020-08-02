import { ClickOutsideController } from './click-outside-controller'
import { method, extendedEvent, isElementInViewport } from '../support'

interface ClickOutsideOptions {
  element?: HTMLElement
  events?: string[]
  onlyVisible?: boolean
  dispatchEvent?: boolean
}

const defaultEvents = ['click', 'touchend']

export const useClickOutside = (controller: ClickOutsideController, options: ClickOutsideOptions = {}) => {
  const { onlyVisible = true, dispatchEvent = true, events = defaultEvents } = options

  const onEvent = (event: Event) => {
    const targetElement: Element = options?.element || controller.element

    if (targetElement.contains(event.target as Node) || (!isElementInViewport(targetElement) && onlyVisible)) {
      return
    }

    // call the clickOutside method of the Stimulus controller
    controller.clickOutside && method(controller, 'clickOutside').call(controller, event)

    // emit a custom event
    if (dispatchEvent) {
      const clickOutsideEvent = extendedEvent('click:outside', event, controller)
      targetElement.dispatchEvent(clickOutsideEvent)
    }
  }

  events.forEach(event => {
    window.addEventListener(event, onEvent, false)
  })

  // keep a copy of the current disconnect() function of the controller
  // to support composing several behaviors
  const controllerDisconnect = controller.disconnect

  Object.assign(controller, {
    disconnect() {
      events.forEach(event => {
        window.removeEventListener(event, onEvent, false)
      })
      controllerDisconnect()
    },
  })
}
