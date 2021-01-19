import { Controller } from 'stimulus'

export interface DebounceOptions {
  wait?: number
  name?: string
}

class DebounceController extends Controller {
  static debounces: string[] | DebounceOptions[] = []
}

const defaultWait = 200

const debounce = (fn: Function, wait: number = defaultWait) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any): any {
    const args = arguments;
    const context = this;

    const callback = () => fn.apply(context, args)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(callback, wait)
  }
}

export const useDebounce = (controller: DebounceController, options: DebounceOptions) => {
  const constructor = controller.constructor as any

  constructor.debounces?.forEach((func: string | DebounceOptions) => {
    if (typeof func === "string") {
      (controller as any)[func] = debounce((controller as any)[func] as Function, options?.wait)
    }

    if (typeof func === "object") {
      const { name, wait } = func as DebounceOptions
      if (!name) return
      (controller as any)[name] = debounce((controller as any)[name] as Function, wait || options?.wait)
    }
  })
}
