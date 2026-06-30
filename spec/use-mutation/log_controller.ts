import { MutationController } from '../../src'

export default class LogController extends MutationController {
  initialize() {
    this.application.testLogger.log({ id: this.id, event: 'initialize', type: 'lifecycle' })
  }

  connect() {
    this.application.testLogger.log({ id: this.id, event: 'connect', type: 'lifecycle' })
  }

  disconnect() {
    this.application.testLogger.log({ id: this.id, event: 'disconnect', type: 'lifecycle' })
  }

  mutate(entries) {
    entries.forEach(entry => {
      this.application.testLogger.log({ id: this.id, event: 'entry', type: 'callback' })
    })
  }

  get id() {
    return this.element.dataset.id || this.element.id
  }

  get options() {
    return this.application.options
  }
}
