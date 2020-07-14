import { IntersectionController } from './intersection-controller'
import { method } from '../support'

export const useIntersection = (controller: IntersectionController, options?: IntersectionObserverInit) => {
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
  }

  const dispatchDisappear = (entry: IntersectionObserverEntry) => {
    controller.isVisible = false
    controller.disappear && method(controller, 'disappear').call(controller, entry)
  }

  // keep a copy of the current disconnect() function of the controller to not override it
  const controllerDisconnect = controller.disconnect

  Object.assign(controller, {
    isVisible: false,
    observer: new IntersectionObserver(callback, options),
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
