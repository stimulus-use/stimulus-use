import { IntersectionController } from '../../src'

export class LogController extends IntersectionController {
  initialize() {
    this.log({ type: 'initialize' })
  }

  connect() {
    this.log({ type: 'connect' })
  }

  disconnect() {
    this.log({ type: 'disconnect' })
  }

  appear() {
    this.log({ type: 'appear' })
  }

  disappear() {
    this.log({ type: 'disappear' })
  }

  logAction(e) {
    this.log({ event: e.type })
  }

  log(details) {
    this.application.testLogger.log({ id: this.id, ...details })
  }

  get id() {
    return this.element.dataset.id
  }

  get options() {
    return this.application.options
  }
}
