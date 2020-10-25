import { Controller } from 'stimulus'

export interface DebounceOptions {
  wait?: number
}

const defaultWait = 200

const debounce = (fn: Function, wait: number = defaultWait) => {
  let timeoutId: NodeJS.Timeout | number | null = null;

  return function (this: any): any {
    const args = arguments;
    const context = this;

    const callback = () => fn.apply(context, args)
    clearTimeout(<number>timeoutId)
    timeoutId = setTimeout(callback, wait)
  }
}

export const useDebounce = (controller: Controller, options: DebounceOptions) => {
  const constructor = controller.constructor as any
  constructor.debounces?.forEach((funcName: string) => {
    (controller as any)[funcName] = debounce((controller as any)[funcName] as Function, options?.wait)
  })
}
