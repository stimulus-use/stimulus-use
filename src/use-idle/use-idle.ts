import { IdleComposableController, IdleController } from './idle-controller'
import { extendedEvent, method, composeEventName } from '../support/index'

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
const oneMinute = 60e3

export interface IdleOptions {
  ms?: number
  initialState?: boolean
  events?: string[]
  dispatchEvent?: boolean
  eventPrefix?: boolean | string
}

const defaultOptions = {
  ms: oneMinute,
  initialState: false,
  events: defaultEvents,
  dispatchEvent: true,
  eventPrefix: true,
}

export const useIdle = (controller: IdleComposableController, options: IdleOptions = {}) => {
  const { ms, initialState, events, dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options)

  let isIdle = initialState
  let timeout = setTimeout(() => {
    isIdle = true
    dispatchAway()
  }, ms)

  const dispatchAway = (event?: Event) => {
    const eventName = composeEventName('away', controller, eventPrefix)

    controller.isIdle = true
    method(controller, 'away').call(controller, event)

    if (dispatchEvent) {
      const clickOutsideEvent = extendedEvent(eventName, event || null, { controller })
      controller.element.dispatchEvent(clickOutsideEvent)
    }
  }

  const dispatchBack = (event?: Event) => {
    const eventName = composeEventName('back', controller, eventPrefix)

    controller.isIdle = false
    method(controller, 'back').call(controller, event)

    if (dispatchEvent) {
      const clickOutsideEvent = extendedEvent(eventName, event || null, { controller })
      controller.element.dispatchEvent(clickOutsideEvent)
    }
  }

  const onEvent = (event: Event) => {
    if (isIdle) dispatchBack(event)

    isIdle = false
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      isIdle = true
      dispatchAway(event)
    }, ms)
  }

  const onVisibility = (event: Event) => {
    if (!document.hidden) onEvent(event)
  }

  if (isIdle) {
    dispatchAway()
  } else {
    dispatchBack()
  }

  const controllerDisconnect = controller.disconnect.bind(controller)
  const observe = () => {
    events.forEach(event => {
      window.addEventListener(event, onEvent)
    })
    document.addEventListener('visibilitychange', onVisibility)
  }

  const unobserve = () => {
    events.forEach(event => {
      window.removeEventListener(event, onEvent)
    })
    document.removeEventListener('visibilitychange', onVisibility)
  }

  Object.assign(controller, {
    disconnect() {
      unobserve()
      controllerDisconnect()
    },
  })

  observe()

  return [observe, unobserve] as const
}
