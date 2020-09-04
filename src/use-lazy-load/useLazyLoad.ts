import { LazyLoadController } from './lazy-load-controller'
import { method } from '../support'

export const useLazyLoad = (controller: LazyLoadController, options?: IntersectionObserverInit) => {
  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting && !controller.isLoaded) {
      handleAppear(entry)
    }
  }

  const handleAppear = (entry: IntersectionObserverEntry) => {
    const src = controller.data.get('src')
    if (!src) return

    const imageElement = <HTMLImageElement>controller.element
    controller.isLoading = true
    controller.loading && method(controller, 'loading').call(controller, src)
    imageElement.onload = () => {
      handleLoaded(src)
    }

    imageElement.src = src
  }

  const handleLoaded = (src: string) => {
    controller.isLoading = false
    controller.isLoaded = true
    controller.loading && method(controller, 'loaded').call(controller, src)
  }

  // keep a copy of the current disconnect() function of the controller to not override it
  const controllerDisconnect = controller.disconnect

  Object.assign(controller, {
    isVisible: false,
    observer: new IntersectionObserver(callback, options),
    observeLazyLoad() {
      this.observer.observe(controller.element)
    },
    unObserveLazyLoad() {
      this.observer.unobserve(controller.element)
    },
    disconnect() {
      controller.unObserveLazyLoad()
      controllerDisconnect()
    },
  })

  controller.observeLazyLoad()
}
