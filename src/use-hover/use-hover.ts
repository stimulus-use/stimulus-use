import { method } from '../support/index'
import { HoverController } from './hover-controller'

export interface HoverOptions {
  element?: Element
}

export const useHover = (controller: HoverController, options: HoverOptions = {}) => {
  const targetElement: Element = options?.element || controller.element

  const onEnter = () => {
    controller.mouseEnter && method(controller, 'mouseEnter').call(controller)
  }
  const onLeave = () => {
    controller.mouseLeave && method(controller, 'mouseLeave').call(controller)
  }

  const controllerDisconnect = controller.disconnect.bind(controller)

  const observe = () => {
    targetElement.addEventListener('mouseenter', onEnter)
    targetElement.addEventListener('mouseleave', onLeave)
  }

  const unobserve = () => {
    targetElement.removeEventListener('mouseenter', onEnter)
    targetElement.removeEventListener('mouseleave', onLeave)
  }

  Object.assign(controller, {
    disconnect() {
      unobserve()
      controllerDisconnect()
    }
  })

  observe()

  return [observe, unobserve] as const
}
