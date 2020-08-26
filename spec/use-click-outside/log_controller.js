import { ClickOutsideController } from '../../src'

export default class LogController extends ClickOutsideController {
  initialize() {
    this.application.testLogger.log({ id: this.id, event: 'initialize', type: 'lifecycle' })
  }

  connect() {
    this.application.testLogger.log({ id: this.id, event: 'connect', type: 'lifecycle' })
  }

  disconnect() {
    this.application.testLogger.log({ id: this.id, event: 'disconnect', type: 'lifecycle' })
  }

  clickOutside() {
    this.application.testLogger.log({ id: this.id, event: 'clickOutside', type: 'callback' })
  }

  close(e) {
    this.application.testLogger.log({ id: this.id, event: 'click:outside', type: 'event', name: e.type })
  }

  get id() {
    return this.element.dataset.id
  }

  get options() {
    return this.application.options
  }
}
