import { Controller } from 'stimulus'

export const method = (controller: Controller, methodName: string): Function => {
  const method = (controller as any)[methodName]
  if (typeof method == 'function') {
    return method
  } else {
    return (...args: any[]) => {}
  }
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

export function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect()

  const windowHeight = (window.innerHeight || document.documentElement.clientHeight)
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth)

  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0)
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0)

  return (vertInView && horInView)
}

export function camelize(value: string) {
  return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase())
}
