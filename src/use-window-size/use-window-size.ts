import { WindowSizeController } from './window-size-controller'
import { method } from '../support'

export interface WindowSizePayload {
  height: number,
  width: number,
  event?: Event
}

export const useWindowSize = (controller: WindowSizeController) => {

  const callback = (event?: Event) => {
    const { innerWidth, innerHeight } = window

    const payload:WindowSizePayload = {
      height: innerHeight || Infinity,
      width: innerWidth || Infinity,
      event
    }

    controller.windowResize && method(controller, 'windowResize').call(controller, payload)
  }

  const controllerDisconnect = controller.disconnect.bind(controller)

  const observe = () => {
    window.addEventListener('resize', callback)
    callback()
  }

  const unobserve = () => {
    window.removeEventListener('resize', callback)
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
