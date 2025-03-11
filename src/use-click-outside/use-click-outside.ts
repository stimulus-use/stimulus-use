import { Controller } from '@hotwired/stimulus'
import { composeEventName, extendedEvent, isElementInViewport } from '../support/index'
import { ClickOutsideComposableController } from './click-outside-controller'

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
  eventPrefix: true
}

export const useClickOutside = (composableController: Controller, options: ClickOutsideOptions = {}) => {
  const controller = composableController as ClickOutsideComposableController
  const { onlyVisible, dispatchEvent, events, eventPrefix } = Object.assign({}, defaultOptions, options)

  const onEvent = (event: Event) => {
    const targetElement: Element = options?.element || controller.element

    if (event.target instanceof Node && targetElement.contains(event.target as Node) || (!isElementInViewport(targetElement) && onlyVisible)) {
      return
    }

    // call the clickOutside method of the Stimulus controller
    if (controller.clickOutside) {
      controller.clickOutside(event)
    }

    // emit a custom event
    if (dispatchEvent) {
      const eventName = composeEventName('click:outside', controller, eventPrefix)

      const clickOutsideEvent = extendedEvent(eventName, event, { controller })
      targetElement.dispatchEvent(clickOutsideEvent)
    }
  }

  const observe = () => {
    events?.forEach(event => {
      window.addEventListener(event, onEvent, true)
    })
  }

  const unobserve = () => {
    events?.forEach(event => {
      window.removeEventListener(event, onEvent, true)
    })
  }

  // keep a copy of the current disconnect() function of the controller
  // to support composing several behaviors
  const controllerDisconnect = controller.disconnect.bind(controller)

  Object.assign(controller, {
    disconnect() {
      unobserve()
      controllerDisconnect()
    }
  })

  observe()

  return [observe, unobserve] as const
}
