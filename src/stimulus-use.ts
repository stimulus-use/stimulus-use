import { Controller } from '@hotwired/stimulus'
import { Logger } from './logger'

export interface StimulusUseOptions {
  debug?: boolean
  logger?: Logger
  dispatchEvent?: Boolean
  eventPrefix?: boolean | string
  element?: Element
}

const defaultOptions = {
  debug: false,
  logger: console,
  dispatchEvent: true,
  eventPrefix: true
}

export class StimulusUse {
  controller: Controller
  controllerInitialize: Function
  controllerConnect: Function
  controllerDisconnect: Function
  debug: boolean
  logger: Logger
  controllerId: string | undefined
  dispatchEvent?: Boolean
  eventPrefix?: boolean | string
  targetElement: Element

  constructor(controller: Controller, options: StimulusUseOptions = {}) {
    this.debug = options?.debug ?? (controller.application as any).stimulusUseDebug ?? defaultOptions.debug
    this.logger = options?.logger ?? defaultOptions.logger
    this.controller = controller
    this.controllerId = controller.element.id || (controller.element as HTMLElement).dataset.id
    this.targetElement = options?.element || controller.element

    const { dispatchEvent, eventPrefix } = Object.assign({}, defaultOptions, options)
    Object.assign(this, { dispatchEvent, eventPrefix })

    // make copies of lifecycle functions
    this.controllerInitialize = controller.initialize.bind(controller)
    this.controllerConnect = controller.connect.bind(controller)
    this.controllerDisconnect = controller.disconnect.bind(controller)
  }

  log = (functionName: string, args: any): void => {
    if (!this.debug) return

    this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${functionName}`, 'color: #3B82F6', 'color: unset')
    this.logger.log({
      controllerId: this.controllerId,
      ...args
    })
    this.logger.groupEnd()
  }

  dispatch = (eventName: string, details: any = {}) => {
    if (this.dispatchEvent) {
      const { event, ...eventDetails } = details
      const customEvent = this.extendedEvent(eventName, event || null, eventDetails)
      this.targetElement.dispatchEvent(customEvent)
      this.log('dispatchEvent', { eventName: customEvent.type, ...eventDetails })
    }
  }

  call = (methodName: string, args: any = {}) => {
    const method = (this.controller as any)[methodName]
    if (typeof method == 'function') {
      return method.call(this.controller, args)
    }
  }

  private extendedEvent = (name: string, event: Event | null, detail: object): CustomEvent => {
    const { bubbles, cancelable, composed } = event || { bubbles: true, cancelable: true, composed: true }

    if (event) {
      Object.assign(detail, { originalEvent: event })
    }

    const customEvent = new CustomEvent(this.composeEventName(name), {
      bubbles,
      cancelable,
      composed,
      detail
    })
    return customEvent
  }

  private composeEventName = (name: string) => {
    let composedName = name
    if (this.eventPrefix === true) {
      composedName = `${this.controller.identifier}:${name}`
    } else if (typeof this.eventPrefix === 'string') {
      composedName = `${this.eventPrefix}:${name}`
    }
    return composedName
  }
}
