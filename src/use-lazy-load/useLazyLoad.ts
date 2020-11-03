import { LazyLoadController } from './lazy-load-controller'
import { method } from '../support/index'

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
  const controllerDisconnect = controller.disconnect.bind(controller)

  const observer = new IntersectionObserver(callback, options)

  const observe = () => {
    observer.observe(controller.element)
  }

  const unobserve = () => {
    observer.unobserve(controller.element)
  }

  Object.assign(controller, {
    isVisible: false,
    disconnect() {
      unobserve()
      controllerDisconnect()
    },
  })

  observe()

  return [observe, unobserve] as const
}
