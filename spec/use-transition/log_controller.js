import { TransitionController } from '../../src'

export default class LogController extends TransitionController {
  initialize() {
    this.application.testLogger.log({ id: this.id, event: 'initialize', type: 'lifecycle' })
  }

  connect() {
    this.application.testLogger.log({ id: this.id, event: 'connect', type: 'lifecycle' })
  }

  disconnect() {
    this.application.testLogger.log({ id: this.id, event: 'disconnect', type: 'lifecycle' })
  }

  get id() {
    return this.element.dataset.id || this.element.id
  }
}
