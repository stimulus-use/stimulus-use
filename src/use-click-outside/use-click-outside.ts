import { ClickOutsideController } from './click-outside-controller'
import { method, extendedEvent } from '../support'

export const useClickOutside = (controller: ClickOutsideController) => {
  const handleClick = (event: Event) => {
    if (controller.element.contains(event.target as Node)) return

    controller.clickOutside && method(controller, 'clickOutside').call(controller, event)

    const clickOutsideEvent = extendedEvent('click:outside', event, controller)
    controller.element.dispatchEvent(clickOutsideEvent)
  }

  window.addEventListener('click', handleClick, false)

  const controllerDisconnect = controller.disconnect

  Object.assign(controller, {
    disconnect() {
      window.removeEventListener('click', handleClick, false)
      controllerDisconnect()
    },
  })
}
