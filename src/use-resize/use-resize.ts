import { ResizeController } from './resize-controller'

export const useResize = (controller: ResizeController) => {
  const method = (methodName: string): Function => {
    const method = (controller as any)[methodName]
    if (typeof method == 'function') {
      return method
    }
    throw new Error(`undefined method "${methodName}"`)
  }

  const callback = (entries: ResizeObserverEntry[]) => {
    const [entry] = entries
    controller.resize && method('resize').call(controller, entry.contentRect)
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
