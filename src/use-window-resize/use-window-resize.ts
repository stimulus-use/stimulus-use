import { WindowResizeController } from './window-resize-controller'
import { method } from '../support/index'

export interface WindowResizePayload {
  height: number,
  width: number,
  event?: Event
}

export const useWindowResize = (controller: Omit<WindowResizeController, "observe"|"unobserve">) => {

  const callback = (event?: Event) => {
    const { innerWidth, innerHeight } = window

    const payload: WindowResizePayload = {
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
