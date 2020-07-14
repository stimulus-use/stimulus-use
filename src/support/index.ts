import { Controller } from 'stimulus'

export const method = (controller: Controller, methodName: string): Function => {
  const method = (controller as any)[methodName]
  if (typeof method == 'function') {
    return method
  }
  throw new Error(`undefined method "${methodName}"`)
}
