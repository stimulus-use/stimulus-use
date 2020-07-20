import { ClickOutsideController } from './click-outside-controller'
import { method, extendedEvent } from '../support'

interface ClickOutsideOptions {
  element: HTMLElement
}

export const useClickOutside = (controller: ClickOutsideController, options?: ClickOutsideOptions) => {
  const handleClick = (event: Event) => {
    const targetElement: Element = options?.element || controller.element

    if (targetElement.contains(event.target as Node)) return

    controller.clickOutside && method(controller, 'clickOutside').call(controller, event)

    const clickOutsideEvent = extendedEvent('click:outside', event, controller)
    targetElement.dispatchEvent(clickOutsideEvent)
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
