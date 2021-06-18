import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import { WindowFocusComposableController } from './window-focus-controller'

export interface WindowFocusOptions extends StimulusUseOptions {
  interval?: number
}

export class UseWindowFocus extends StimulusUse {
  controller: WindowFocusComposableController
  intervalDuration: number
  interval: any

  constructor(controller: WindowFocusComposableController, options: WindowFocusOptions = {}) {
    super(controller, options)
    this.controller = controller
    this.intervalDuration = options.interval || 200

    this.enhanceController()
    this.observe()
  }

  observe = () => {
    // triggers initial callback on observe
    if (document.hasFocus()) {
      this.becomesFocused()
    } else {
      console.log("i should be there")
      this.becomesUnfocused()
    }

    this.interval = setInterval(() => {
      this.handleWindowFocusChange()
    }, this.intervalDuration)
  }

  unobserve = () => {
    clearInterval(this.interval)
  }

  // private
  private becomesUnfocused = (event?: Event) => {
    this.controller.hasFocus = false

    this.call('unfocus', event)
    this.log('unfocus', { hasFocus: false })

    this.dispatch('unfocus', { event, hasFocus: false })
  }

  private becomesFocused = (event?: Event) => {
    this.controller.hasFocus = true

    this.call('focus', event)
    this.log('focus', { hasFocus: true })

    this.dispatch('focus', { event, hasFocus: true })
  }

  private handleWindowFocusChange = (event?: Event) => {
    if (document.hasFocus() && !this.controller.hasFocus) {
      this.becomesFocused(event)
    } else if (!document.hasFocus() && this.controller.hasFocus) {
      this.becomesUnfocused(event)
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

export const useWindowFocus = (controller: WindowFocusComposableController, options: WindowFocusOptions = {}) => {
  const observer = new UseWindowFocus(controller, options)
  return [observer.observe, observer.unobserve] as const
}
