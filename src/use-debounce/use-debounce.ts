import { Controller } from '@hotwired/stimulus'

export interface DebounceOptions {
  wait?: number
  name?: string
  leading?: boolean
}

class DebounceController extends Controller {
  static debounces: (string | DebounceOptions)[] = []
}

const defaultWait = 200

export const debounce = (fn: Function, wait: number = defaultWait, leading: boolean = false) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let leadingCalled: boolean = false

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
    if (leading && !timeoutId && !leadingCalled) {
      callback()
      leadingCalled = true
    } else {
      timeoutId = setTimeout(() => {
        leadingCalled = false
        timeoutId = null
        callback()
      }, wait)
    }
  }
}

export const useDebounce = (composableController: Controller, options?: DebounceOptions) => {
  const controller = composableController as DebounceController
  const constructor = controller.constructor as typeof DebounceController

  constructor.debounces.forEach((func: string | DebounceOptions) => {
    if (typeof func === 'string') {
      ;(controller as any)[func] = debounce((controller as any)[func] as Function, options?.wait, options?.leading)
    }

    if (typeof func === 'object') {
      const { name, wait, leading } = func as DebounceOptions
      if (!name) return
      ;(controller as any)[name] = debounce(
        (controller as any)[name] as Function,
        wait || options?.wait,
        leading || options?.leading
      )
    }
  })
}
