// import { MemoController } from './memo-controller'
// import { method } from '../support'

const memoize = (object: object, name: string, value: any) => {
  console.log(`memoizing ${name} with ${value}`)
  Object.defineProperty(object, name, { value })
  return value
}

export const useMemo = (controller: any) => {
  controller.constructor.memoizedGetters.forEach((getter: string) => {
    memoize(controller, getter, controller[getter])
  })
}
