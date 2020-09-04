import { IntersectionController } from './intersection-controller'
import { method, extendedEvent, composeEventName } from '../support'

export interface IntersectionOptions extends IntersectionObserverInit {
  element?: Element
  dispatchEvent?: boolean
  eventPrefix?: boolean | string
}

const defaultOptions = {
  dispatchEvent: true,
  eventPrefix: true,
}

export const useIntersection = (controller: IntersectionController, options: IntersectionOptions = {}) => {
  const { dispatchEvent, eventPrefix } = Object.assign(defaultOptions, options)
  const targetElement: Element = options?.element || controller.element

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      dispatchAppear(entry)
    } else if (controller.isVisible) {
      dispatchDisappear(entry)
    }
  }

  const dispatchAppear = (entry: IntersectionObserverEntry) => {
    controller.isVisible = true
    controller.appear && method(controller, 'appear').call(controller, entry)

    // emit a custom "appear" event
    if (dispatchEvent) {
      const eventName = composeEventName('appear', controller, eventPrefix)

      const appearEvent = extendedEvent(eventName, null, { controller, entry })
      targetElement.dispatchEvent(appearEvent)
    }
  }

  const dispatchDisappear = (entry: IntersectionObserverEntry) => {
    controller.isVisible = false
    controller.disappear && method(controller, 'disappear').call(controller, entry)

    // emit a custom "disappear" event
    if (dispatchEvent) {
      const eventName = composeEventName('disappear', controller, eventPrefix)

      const disappearEvent = extendedEvent(eventName, null, { controller, entry })
      targetElement.dispatchEvent(disappearEvent)
    }
  }

  // keep a copy of the current disconnect() function of the controller
  // to support composing several behaviors
  const controllerDisconnect = controller.disconnect.bind(controller)

  Object.assign(controller, {
    isVisible: false,
    observer: new IntersectionObserver(callback, options),
    observeIntersection() {
      this.observer.observe(targetElement)
    },
    unObserveIntersection() {
      this.observer.unobserve(targetElement)
    },
    disconnect() {
      controller.unObserveIntersection()
      controllerDisconnect()
    },
  })

  controller.observeIntersection()
}
