import { StimulusUse, StimulusUseOptions } from '../stimulus_use'
import { method } from '../support/index'
import { MutationController } from './mutation-controller'

export interface MutationControllerOptions {
  element?: Element
}

export interface MutationOptions extends MutationObserverInit, MutationControllerOptions, StimulusUseOptions {
}

export class UseMutation extends StimulusUse {
  controller: MutationController
  observer: MutationObserver
  targetElement: Element
  options: MutationOptions

  constructor(controller: Omit<MutationController, "options"|"observe"|"unobserve">, options: MutationOptions = {}) {
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
      this.controller.application.handleError(error,"At a minimum, one of childList, attributes, and/or characterData must be true",{})
    }
  }

  unobserve = () => {
    this.observer.disconnect()
  }

  private mutation = (entries: MutationRecord[]) => {
    this.controller.mutate && method(this.controller, 'mutate').call(this.controller, entries)
    this.log('mutate', { entries })
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

export const useMutation = (controller: MutationController, options: MutationOptions = {}) => {
  const observer = new UseMutation(controller, options)
  return [observer.observe, observer.unobserve] as const
}
