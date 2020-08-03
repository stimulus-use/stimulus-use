import { Controller } from 'stimulus'

export const method = (controller: Controller, methodName: string): Function => {
  const method = (controller as any)[methodName]
  if (typeof method == 'function') {
    return method
  }
  throw new Error(`undefined method "${methodName}"`)
}

export const extendedEvent = (type: string, event: Event, controller: Controller): CustomEvent => {
  const { bubbles, cancelable, composed } = event
  const customEvent = new CustomEvent(type, {
    bubbles,
    cancelable,
    composed,
    detail: { originalEvent: event, controller },
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
