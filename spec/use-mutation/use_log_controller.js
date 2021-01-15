import { Controller } from 'stimulus'
import { useMutation } from '../../src'

export default class UseLogController extends Controller {
  initialize() {
    this.application.testLogger.log({ id: this.id, event: 'initialize', type: 'lifecycle' })
  }

  connect() {
    useMutation(this, this.application.options)
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
