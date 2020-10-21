import { Controller } from 'stimulus'

const memoize = (controller: Controller, name: string, value: any) => {
  Object.defineProperty(controller, name, { value })
  return value
}

export const useMemo = (controller: Controller) => {
  ;(controller.constructor as any).memoizedGetters?.forEach((getter: string) => {
    memoize(controller, getter, Reflect.get(controller, getter))
  })
}
