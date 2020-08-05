import { Controller } from 'stimulus'

export const method = (controller: Controller, methodName: string): Function => {
  const method = (controller as any)[methodName]
  if (typeof method == 'function') {
    return method
  }
  throw new Error(`undefined method "${methodName}"`)
}

export const composeEventName = (name: string, controller: Controller, eventPrefix: boolean | string) => {
  let composedName = name
  if (eventPrefix === true) {
    composedName = `${controller.identifier}:${name}`
  } else if (typeof eventPrefix === 'string') {
    composedName = `${eventPrefix}:${name}`
  }
  return composedName
}

export const extendedEvent = (type: string, event: Event | null, detail: object): CustomEvent => {
  const { bubbles, cancelable, composed } = event || { bubbles: true, cancelable: true, composed: true }

  if (event) {
    Object.assign(detail, { originalEvent: event })
  }

  const customEvent = new CustomEvent(type, {
    bubbles,
    cancelable,
    composed,
    detail,
  })
  return customEvent
}

export const isElementInViewport = (el: Element): boolean => {
  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
