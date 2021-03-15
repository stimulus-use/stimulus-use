import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import { IntersectionComposableController } from './intersection-controller'

export interface IntersectionOptions extends IntersectionObserverInit, StimulusUseOptions { }

export class UseIntersection extends StimulusUse {
  controller: IntersectionComposableController
  observer: IntersectionObserver

  constructor(controller: IntersectionComposableController, options: IntersectionOptions = {}) {
    super(controller, options)
    this.controller = controller
    this.enhanceController()
    this.observer = new IntersectionObserver(this.callback, options)
    this.observe()
  }

  observe = () => {
    this.observer.observe(this.targetElement)
  }

  unobserve = () => {
    this.observer.unobserve(this.targetElement)
  }

  private callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      this.dispatchAppear(entry)
    } else if (this.controller.isVisible) {
      this.dispatchDisappear(entry)
    }
  }

  private dispatchAppear = (entry: IntersectionObserverEntry) => {
    this.controller.isVisible = true
    this.call('appear', entry)
    this.log('appear', { isVisible: true })

    this.dispatch("appear", { isVisible: true })
  }

  private dispatchDisappear = (entry: IntersectionObserverEntry) => {
    this.controller.isVisible = false
    this.call('disappear', entry)
    this.log('disappear', { isVisible: false })

    this.dispatch("disappear", { isVisible: false })
  }

  private enhanceController() {
    const controllerDisconnect = this.controllerDisconnect

    const disconnect = () => {
      this.unobserve()
      controllerDisconnect()
    }

    Object.assign(this.controller, { isVisible: false, disconnect })
  }
}

export const useIntersection = (controller: IntersectionComposableController, options: IntersectionOptions = {}) => {
  const observer = new UseIntersection(controller, options)
  return [observer.observe, observer.unobserve] as const
}
