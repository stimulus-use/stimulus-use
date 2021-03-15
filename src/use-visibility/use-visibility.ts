import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import { VisibilityComposableController } from './visibility-controller'

export interface VisibilityOptions extends StimulusUseOptions { }

export class UseVisibility extends StimulusUse {
  controller: VisibilityComposableController

  constructor(controller: VisibilityComposableController, options: VisibilityOptions = {}) {
    super(controller, options)

    this.controller = controller

    const disconnect = () => {
      this.unobserve()
      this.controllerDisconnect()
    }

    Object.assign(controller, { disconnect })

    // triggers initial callback on connect
    this.handleVisibilityChange()

    this.observe()
  }

  observe = () => {
    this.controller.isVisible = !document.hidden
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  unobserve = () => {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  }

  // private
  private becomesInvisible = (event?: Event) => {
    this.controller.isVisible = false

    this.call('invisible')
    this.log('invisible', { isVisible: false })
    this.dispatch('invisible', { event, isVisible: false })
  }

  private becomesVisible = (event?: Event) => {
    this.controller.isVisible = true

    this.call('visible')
    this.log('visible', { isVisible: true })
    this.dispatch('visible', { event, isVisible: true })
  }

  private handleVisibilityChange = (event?: Event) => {
    if (document.hidden) {
      this.becomesInvisible(event)
    } else {
      this.becomesVisible(event)
    }
  }
}

export const useVisibility = (controller: VisibilityComposableController, options: VisibilityOptions = {}) => {
  const observer = new UseVisibility(controller, options)
  return [observer.observe, observer.unobserve] as const
}
