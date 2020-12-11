import { Controller } from 'stimulus'
import { Logger } from "./logger"

export interface StimulusUseOptions {
  debug: boolean
  logger: Logger
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
  id: string | undefined

  constructor(controller: Controller, options?: StimulusUseOptions) {
    this.debug = options?.debug || (controller.application as any).stimulusUseDebug || defaultOptions.debug
    this.logger = options?.logger || defaultOptions.logger
    this.controller = controller
    this.id = controller.element.id

    // make copies of lifecycle functions
    this.controllerInitialize = controller.initialize.bind(controller)
    this.controllerConnect = controller.connect.bind(controller)
    this.controllerDisconnect = controller.disconnect.bind(controller)
  }

  // private
  log = (functionName: string, args: any): void => {
    if (!this.debug) return

    const idString = this.id ? `id: ${this.id}` : ""
    this.logger.group(`${functionName}`)
    this.logger.log(`called from controller: ${this.controller.identifier} ${idString}`, {
      ...args
    })
    this.logger.groupEnd()
  }
}

