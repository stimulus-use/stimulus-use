import { Controller } from '@hotwired/stimulus'
import { composeEventName, extendedEvent, method } from '../support/index'
import { ResizeComposableController } from './resize-controller'

export interface ResizeOptions {
  element?: Element
  box?: ResizeObserverBoxOptions
  dispatchEvent?: boolean
  eventPrefix?: boolean | string
}

const defaultOptions = {
  dispatchEvent: true,
  eventPrefix: true
}

export const useResize = (composableController: Controller, options: ResizeOptions = {}) => {
  const controller = composableController as ResizeComposableController
  const { dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options)
  const targetElement: Element = options?.element || controller.element
  const box = options?.box

  let frame: number | null = null

  const callback = (entries: ResizeObserverEntry[]) => {
    if (frame !== null) cancelAnimationFrame(frame)

    frame = requestAnimationFrame(() => {
      frame = null

      const [entry] = entries
      method(controller, 'resize').call(controller, entry.contentRect)

      // emit a custom "controllerIdentifier:resize" event
      if (dispatchEvent) {
        const eventName = composeEventName('resize', controller, eventPrefix)

        const appearEvent = extendedEvent(eventName, null, {
          controller,
          entry
        })

        targetElement.dispatchEvent(appearEvent)
      }
    })
  }

  const controllerDisconnect = controller.disconnect.bind(controller)
  const observer = new ResizeObserver(callback)

  const observe = () => {
    observer.observe(targetElement, box ? { box } : undefined)
  }

  const unobserve = () => {
    if (frame !== null) {
      cancelAnimationFrame(frame)
      frame = null
    }

    observer.unobserve(targetElement)
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
