import { Controller } from '@hotwired/stimulus'
import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import { VisibilityComposableController } from './visibility-controller'

export interface VisibilityOptions extends StimulusUseOptions {}

export class UseVisibility extends StimulusUse {
  controller: VisibilityComposableController

  constructor(controller: VisibilityComposableController, options: VisibilityOptions = {}) {
    super(controller, options)
    this.controller = controller
    this.enhanceController()
    this.observe()
  }

  observe = () => {
    this.controller.isVisible = !document.hidden
    document.addEventListener('visibilitychange', this.handleVisibilityChange)

    // triggers initial callback on observe
    this.handleVisibilityChange()
  }

  unobserve = () => {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  }

  // private
  private becomesInvisible = (event?: Event) => {
    this.controller.isVisible = false

    this.call('invisible', event)
    this.log('invisible', { isVisible: false })

    this.dispatch('invisible', { event, isVisible: false })
  }

  private becomesVisible = (event?: Event) => {
    this.controller.isVisible = true

    this.call('visible', event)
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

  private enhanceController() {
    const controllerDisconnect = this.controllerDisconnect

    const disconnect = () => {
      this.unobserve()
      controllerDisconnect()
    }

    Object.assign(this.controller, { disconnect })
  }
}

export const useVisibility = (composableController: Controller, options: VisibilityOptions = {}) => {
  const controller = composableController as VisibilityComposableController
  const observer = new UseVisibility(controller, options)
  return [observer.observe, observer.unobserve] as const
}
