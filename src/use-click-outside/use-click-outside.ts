import { ClickOutsideController } from './click-outside-controller'
import { method, extendedEvent, isElementInViewport } from '../support'

interface ClickOutsideOptions {
  element?: HTMLElement
  onlyVisible?: boolean
  withEvent?: boolean
}

export const useClickOutside = (controller: ClickOutsideController, options: ClickOutsideOptions = {}) => {
  const { onlyVisible = true, withEvent = true } = options

  const handleClick = (event: Event) => {
    const targetElement: Element = options?.element || controller.element

    if (targetElement.contains(event.target as Node) || (!isElementInViewport(targetElement) && onlyVisible)) {
      return
    }

    // call the clickOutside method of the Stimulus controller
    controller.clickOutside && method(controller, 'clickOutside').call(controller, event)

    // emit a custom event
    if (withEvent) {
      const clickOutsideEvent = extendedEvent('click:outside', event, controller)
      targetElement.dispatchEvent(clickOutsideEvent)
    }
  }

  window.addEventListener('click', handleClick, false)

  // keep a copy of the current disconnect() function of the controller
  // to support composing several behaviors
  const controllerDisconnect = controller.disconnect

  Object.assign(controller, {
    disconnect() {
      window.removeEventListener('click', handleClick, false)
      controllerDisconnect()
    },
  })
}
