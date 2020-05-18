import { LazyLoadController } from './lazy-load-controller'
// import { useIntersection, IntersectionController } from '../'

export const useLazyLoad = (controller: LazyLoadController, options?: IntersectionObserverInit) => {
  const method = (methodName: string): Function => {
    const method = (controller as any)[methodName]
    if (typeof method == 'function') {
      return method
    }
    throw new Error(`undefined method "${methodName}"`)
  }

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting && !controller.isLoaded) {
      handleAppear(entry)
    }
  }

  const handleAppear = (entry: IntersectionObserverEntry) => {
    const src = controller.data.get('src')
    const imageElement = <HTMLImageElement>controller.element
    controller.isLoading = true
    controller.loading && method('loading').call(controller, src)
    imageElement.onload = () => {
      handleLoaded(src)
    }

    imageElement.src = src
  }

  const handleLoaded = src => {
    controller.isLoading = false
    controller.isLoaded = true
    controller.loading && method('loaded').call(controller, src)
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
