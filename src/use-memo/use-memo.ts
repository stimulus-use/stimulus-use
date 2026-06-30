import { Controller } from '@hotwired/stimulus'

const findDescriptor = (controller: Controller, name: string): PropertyDescriptor | undefined => {
  let prototype = Object.getPrototypeOf(controller)

  while (prototype && prototype !== Object.prototype) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, name)
    if (descriptor) return descriptor

    prototype = Object.getPrototypeOf(prototype)
  }

  return undefined
}

export const useMemo = (controller: Controller) => {
  ;(controller.constructor as any).memos?.forEach((name: string) => {
    const descriptor = findDescriptor(controller, name)
    if (!descriptor || typeof descriptor.get !== 'function') return

    const getter = descriptor.get

    Object.defineProperty(controller, name, {
      configurable: true,
      get(this: Controller) {
        const value = getter.call(this)
        Object.defineProperty(this, name, { value, configurable: true })
        return value
      }
    })
  })
}
