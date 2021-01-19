import { StimulusUse, StimulusUseOptions } from '../stimulus_use'
import { method } from '../support/index'
import { HoverComposableController, HoverController } from './hover-controller'

export interface HoverOptions extends StimulusUseOptions {
  element?: Element
}

export class UseHover extends StimulusUse {
  controller: HoverComposableController
  targetElement: Element

  constructor(controller: HoverComposableController, options: HoverOptions = {}) {
    super(controller, options)
    this.targetElement = options?.element || controller.element
    this.controller = controller
    this.enhanceController()
    this.observe()
  }

  observe = () => {
    this.targetElement.addEventListener('mouseenter', this.onEnter)
    this.targetElement.addEventListener('mouseleave', this.onLeave)
  }

  unobserve = () => {
    this.targetElement.removeEventListener('mouseenter', this.onEnter)
    this.targetElement.removeEventListener('mouseleave', this.onLeave)
  }

  private onEnter = () => {
    method(this.controller, 'mouseEnter').call(this.controller)
    this.log('mouseEnter', { hover: true })
  }

  private onLeave = () => {
    method(this.controller, 'mouseLeave').call(this.controller)
    this.log('mouseLeave', { hover: false })
  }

  private enhanceController() {
    const controllerDisconnect = this.controller.disconnect.bind(this.controller)

    const disconnect = () => {
      this.unobserve()
      controllerDisconnect()
    }

    Object.assign(this.controller, { disconnect })
  }
}

export const useHover = (controller: HoverComposableController, options: HoverOptions = {}) => {
  const observer = new UseHover(controller, options)
  return [observer.observe, observer.unobserve] as const
}
