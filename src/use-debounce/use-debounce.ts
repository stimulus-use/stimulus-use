import { Controller } from '@hotwired/stimulus'

export interface DebounceOptions {
  wait?: number
  name?: string
}

class DebounceController extends Controller {
  static debounces: (string | DebounceOptions)[] = []
}

const defaultWait = 200

export const debounce = (fn: Function, wait: number = defaultWait) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any): any {
    const args = Array.from(arguments)
    const context = this
    const params = args.map(arg => arg.params)

    const callback = () => {
      args.forEach((arg, index) => (arg.params = params[index]))
      return fn.apply(context, args)
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(callback, wait)
  }
}

export const useDebounce = (composableController: Controller, options?: DebounceOptions) => {
  const controller = composableController as DebounceController
  const constructor = controller.constructor as typeof DebounceController

  constructor.debounces.forEach((func: string | DebounceOptions) => {
    if (typeof func === 'string') {
      ;(controller as any)[func] = debounce((controller as any)[func] as Function, options?.wait)
    }

    if (typeof func === 'object') {
      const { name, wait } = func as DebounceOptions
      if (!name) return
      ;(controller as any)[name] = debounce((controller as any)[name] as Function, wait || options?.wait)
    }
  })
}
