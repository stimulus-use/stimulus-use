import { Controller } from '@hotwired/stimulus'

class BackgroundQueueController extends Controller {
  static queue: string[] | BackgroundQueueOptions[] = []
}

export interface BackgroundQueueOptions {
  maxWait?: number,
  name?: string
}

const defaultOptions = {}
const idleCallbackIds: number[] = []

const ric = (fn: Function, maxWait?: number) => {
  // https://developer.chrome.com/blog/using-requestidlecallback/
  if (!window.requestIdleCallback) {
    const start = Date.now()

    return function (this: any) {
      const args = arguments
      const context = this

      const timeoutId = window.setTimeout(() => {
        fn.call(context, ...args, { didTimeout: false, timeRemaining: () => Math.max(0, 50 - (Date.now() - start)) })
      }, 1)

      idleCallbackIds.push(timeoutId)
    }
  }

  return function (this: any) {
    const args = arguments
    const context = this

    const idleCallbackId = window.requestIdleCallback(deadline => fn.call(context, ...args, deadline), { timeout: maxWait })

    idleCallbackIds.push(idleCallbackId)
  }
}

const cancelRic = (id: number) =>
  (!window.cancelIdleCallback ? window.clearTimeout : window.cancelIdleCallback)(id)

export const useBackgroundQueue = (controller: BackgroundQueueController, options: BackgroundQueueOptions) => {
  const constructor = controller.constructor as any
  const { maxWait } = Object.assign({}, defaultOptions, options)

  const observe = () => {
    constructor.queue?.forEach((func: string | BackgroundQueueOptions) => {
      if (typeof func === 'string') {
        (controller as any)[func] = ric((controller as any)[func] as Function, maxWait)
      }

      if ('object' === typeof func) {
        const { name, maxWait } = { ...func, ...defaultOptions, ...options }
        if (!name) {
          return
        }

        (controller as any)[name] = ric((controller as any)[name] as Function, maxWait)
      }
    })
  }

  const unobserve = () =>
    idleCallbackIds.forEach(id => cancelRic(id))

  const controllerDisconnect = controller.disconnect.bind(controller)

  Object.assign(controller, {
    disconnect() {
      unobserve()
      controllerDisconnect()
    },
  })

  observe()

  return [observe, unobserve] as const
}
