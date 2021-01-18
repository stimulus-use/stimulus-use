import { StimulusUse, StimulusUseOptions } from '../stimulus_use'
import { method } from '../support/index'
import { HoverController } from './hover-controller'

export interface HoverOptions extends StimulusUseOptions {
  element?: Element
}

export class UseHover extends StimulusUse {
  controller: HoverController
  targetElement: Element

  constructor(controller: HoverController, options: HoverOptions = {}) {
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
    this.controller.mouseEnter && method(this.controller, 'mouseEnter').call(this.controller)
    this.log('mouseEnter', { hover: true })
  }

  private onLeave = () => {
    this.controller.mouseLeave && method(this.controller, 'mouseLeave').call(this.controller)
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

export const useHover = (controller: Omit<HoverController, 'options' | 'observe' | 'unobserve'>, options: HoverOptions = {}) => {
  const observer = new UseHover(controller, options)
  return [observer.observe, observer.unobserve] as const
}
