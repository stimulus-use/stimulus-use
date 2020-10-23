import { Controller } from 'stimulus'

export interface DebounceOptions {
  delay?: number
}

const defaultDelay = 200

const debounce = (fn: Function, delay: number = defaultDelay, context: any) => {
  let timeoutId: any = null
  return (...args: any[]) => {
    const callback = () => fn.apply(context, args)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(callback, delay)
  }
}

export const useDebounce = (controller: Controller, options: DebounceOptions) => {
  (controller.constructor as any).debounces?.forEach((funcName: string) => {
    (controller as any)[funcName] = debounce((controller as any)[funcName] as Function, options?.delay, controller)
  })
}
