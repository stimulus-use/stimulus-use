import { ResizeController } from './resize-controller'
import { method, extendedEvent, composeEventName } from '../support'

export interface ResizeOptions {
  element?: Element
  dispatchEvent?: boolean
  eventPrefix?: boolean | string
}

const defaultOptions = {
  dispatchEvent: true,
  eventPrefix: true,
}

export const useResize = (controller: ResizeController, options: ResizeOptions = {}) => {
  const { dispatchEvent, eventPrefix } = Object.assign(defaultOptions, options)
  const targetElement: Element = options?.element || controller.element

  const callback = (entries: ResizeObserverEntry[]) => {
    const [entry] = entries
    controller.resize && method(controller, 'resize').call(controller, entry.contentRect)

    // emit a custom "controllerIdentifier:resize" event
    if (dispatchEvent) {
      const eventName = composeEventName('resize', controller, eventPrefix)
      const appearEvent = extendedEvent(eventName, null, {
        controller,
        entry,
      })
      targetElement.dispatchEvent(appearEvent)
    }
  }

  const controllerDisconnect = controller.disconnect.bind(controller)

  Object.assign(controller, {
    observer: new ResizeObserver(callback),
    observe() {
      this.observer.observe(targetElement)
    },
    unObserve() {
      this.observer.unobserve(targetElement)
    },
    disconnect() {
      controller.unObserve()
      controllerDisconnect()
    },
  })

  controller.observe()
}
