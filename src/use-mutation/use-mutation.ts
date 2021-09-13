import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import { MutationComposableController } from './mutation-controller'

export interface MutationControllerOptions {
  element?: Element
}

export interface MutationOptions extends MutationObserverInit, MutationControllerOptions, StimulusUseOptions {}

export class UseMutation extends StimulusUse {
  controller: MutationComposableController
  observer: MutationObserver
  options: MutationOptions

  constructor(controller: MutationComposableController, options: MutationOptions = {}) {
    super(controller, options)

    this.targetElement = options?.element || controller.element
    this.controller = controller
    this.options = options
    this.observer = new MutationObserver(this.mutation)

    this.enhanceController()
    this.observe()
  }

  observe = () => {
    try {
      this.observer.observe(this.targetElement, this.options)
    } catch (error) {
      this.controller.application.handleError(
        error,
        'At a minimum, one of childList, attributes, and/or characterData must be true',
        {}
      )
    }
  }

  unobserve = () => {
    this.observer.disconnect()
  }

  private mutation = (entries: MutationRecord[]) => {
    this.call('mutate', entries)
    this.log('mutate', { entries })

    this.dispatch('mutate', { entries })
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

export const useMutation = (controller: MutationComposableController, options: MutationOptions = {}) => {
  const observer = new UseMutation(controller, options)
  return [observer.observe, observer.unobserve] as const
}
