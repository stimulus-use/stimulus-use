import { Controller } from 'stimulus'
import { Logger } from "./logger"

export interface StimulusUseOptions {
  debug?: boolean
  logger?: Logger
}

const defaultOptions = {
  debug: false,
  logger: console
}

export class StimulusUse {
  controller: Controller
  controllerInitialize: Function
  controllerConnect: Function
  controllerDisconnect: Function
  debug: boolean
  logger: Logger
  controllerId: string | undefined

  constructor(controller: Controller, options: StimulusUseOptions = {}) {
    this.debug = options?.debug ?? (controller.application as any).stimulusUseDebug ?? defaultOptions.debug
    this.logger = options?.logger ?? defaultOptions.logger
    this.controller = controller
    this.controllerId = controller.element.id || (controller.element as HTMLElement).dataset.id

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
}
