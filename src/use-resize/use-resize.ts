import { ResizeController } from './resize-controller'
import { method } from '../support'

export const useResize = (controller: ResizeController) => {
  const callback = (entries: ResizeObserverEntry[]) => {
    const [entry] = entries
    controller.resize && method(controller, 'resize').call(controller, entry.contentRect)
  }

  const controllerDisconnect = controller.disconnect

  Object.assign(controller, {
    observer: new ResizeObserver(callback),
    observe() {
      this.observer.observe(controller.element)
    },
    unObserve() {
      this.observer.unobserve(controller.element)
    },
    disconnect() {
      controller.unObserve()
      controllerDisconnect()
    },
  })

  controller.observe()
}
