import { Controller } from '@hotwired/stimulus'

export interface DebounceOptions {
  wait?: number
  name?: string
  leading?: boolean
  trailing?: boolean
}

class DebounceController extends Controller {
  static debounces: (string | DebounceOptions)[] = []
}

const defaultWait = 200

export const debounce = (
  fn: Function,
  wait: number = defaultWait,
  { leading = false, trailing = true }: Pick<DebounceOptions, 'leading' | 'trailing'> = {}
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let trailingPending = false

  return function (this: any): any {
    const args = Array.from(arguments)
    const context = this
    const params = args.map(arg => (arg instanceof Event ? (arg as any).params : undefined))
    const currentTargets = args.map(arg => (arg instanceof Event ? arg.currentTarget : undefined))

    const callback = () => {
      args.forEach((arg, index) => {
        if (arg instanceof Event) {
          ;(arg as any).params = params[index]
          Object.defineProperty(arg, 'currentTarget', { configurable: true, value: currentTargets[index] })
        }
      })
      return fn.apply(context, args)
    }

    const startOfBurst = timeoutId === null

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (leading && startOfBurst) {
      callback()

      trailingPending = false
    } else {
      trailingPending = true
    }

    timeoutId = setTimeout(() => {
      timeoutId = null

      if (trailing && trailingPending) {
        trailingPending = false

        callback()
      }
    }, wait)
  }
}

export const useDebounce = (composableController: Controller, options?: DebounceOptions) => {
  const controller = composableController as DebounceController
  const constructor = controller.constructor as typeof DebounceController

  constructor.debounces.forEach((func: string | DebounceOptions) => {
    if (typeof func === 'string') {
      ;(controller as any)[func] = debounce((controller as any)[func] as Function, options?.wait, {
        leading: options?.leading,
        trailing: options?.trailing
      })
    }

    if (typeof func === 'object') {
      const { name, wait, leading, trailing } = func as DebounceOptions
      if (!name) return
      ;(controller as any)[name] = debounce((controller as any)[name] as Function, wait ?? options?.wait, {
        leading: leading ?? options?.leading,
        trailing: trailing ?? options?.trailing
      })
    }
  })
}
