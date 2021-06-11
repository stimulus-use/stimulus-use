import { Controller } from 'stimulus'
import { useDispatch, DispatchOptions } from '../use-dispatch/index'

export const useApplication = (controller: Controller, options: DispatchOptions= {}) => {
  // getter to detect Turbolinks preview
  Object.defineProperty(controller, 'isPreview', {
    get(): boolean {
      return document.documentElement.hasAttribute('data-turbolinks-preview') || document.documentElement.hasAttribute('data-turbo-preview')
    },
  })

  // getter to detect if a Stimulus controller is connected
  Object.defineProperty(controller, 'isConnected', {
    get(): boolean {
      return !!Array.from(this.context.module.connectedContexts).find(c => c === this.context)
    },
  })

  // getter to get the csrf token
  Object.defineProperty(controller, 'csrfToken', {
    get(): boolean {
      return this.metaValue('csrf-token')
    },
  })

  useDispatch(controller, options)

  Object.assign(controller, {
    metaValue(name: string) {
      const element = document.head.querySelector(`meta[name="${name}"]`)
      return element && element.getAttribute('content')
    },
  })
}
