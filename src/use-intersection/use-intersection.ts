import { IntersectionComposableController } from './intersection-controller'
import { method, extendedEvent, composeEventName } from '../support/index'

export interface IntersectionOptions extends IntersectionObserverInit {
  element?: Element
  dispatchEvent?: boolean
  eventPrefix?: boolean | string
}

const defaultOptions = {
  dispatchEvent: true,
  eventPrefix: true
}

export const useIntersection = (controller: IntersectionComposableController, options: IntersectionOptions = {}) => {
  const { dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options)
  const targetElement: Element = options?.element || controller.element

  if (!controller.intersectionElements) controller.intersectionElements = []

  controller.intersectionElements.push(targetElement)

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      dispatchAppear(entry)
    } else if (targetElement.hasAttribute('isVisible')) {
      dispatchDisappear(entry)
    }
  }

  const dispatchAppear = (entry: IntersectionObserverEntry) => {
    targetElement.setAttribute('isVisible', 'true')
    method(controller, 'appear').call(controller, entry)

    // emit a custom "appear" event
    if (dispatchEvent) {
      const eventName = composeEventName('appear', controller, eventPrefix)

      const appearEvent = extendedEvent(eventName, null, { controller, entry })
      targetElement.dispatchEvent(appearEvent)
    }
  }

  const dispatchDisappear = (entry: IntersectionObserverEntry) => {
    targetElement.removeAttribute('isVisible')
    method(controller, 'disappear').call(controller, entry)

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

  const observer = new IntersectionObserver(callback, options)

  const observe = () => {
    observer.observe(targetElement)
  }

  const unobserve = () => {
    observer.unobserve(targetElement)
  }

  Object.assign(controller, {
    get isVisible() {
      if (controller.intersectionElements.length === 1) {
        return controller.intersectionElements[0].hasAttribute('isVisible')
      } else {
        return controller.intersectionElements.every(element => element.hasAttribute('isVisible'))
      }
    },
    get noneVisible() {
      return controller.intersectionElements.filter(element => element.hasAttribute('isVisible')).length === 0
    },
    get oneVisible() {
      return controller.intersectionElements.filter(element => element.hasAttribute('isVisible')).length === 1
    },
    get atLeastOneVisible() {
      return controller.intersectionElements.some(element => element.hasAttribute('isVisible'))
    },
    get allVisible() {
      return controller.intersectionElements.every(element => element.hasAttribute('isVisible'))
    },
    disconnect() {
      unobserve()
      controllerDisconnect()
    }
  })

  observe()

  return [observe, unobserve] as const
}
