import { Controller } from 'stimulus'
import { useTransition } from '../../src'

export default class UseLogController extends Controller {
  initialize() {
    this.application.testLogger.log({ id: this.id, event: 'initialize', type: 'lifecycle' })
  }

  connect() {
    useTransition(this)
    this.application.testLogger.log({ id: this.id, event: 'connect', type: 'lifecycle' })
  }

  disconnect() {
    this.application.testLogger.log({ id: this.id, event: 'disconnect', type: 'lifecycle' })
  }

  get id() {
    return this.element.dataset.id || this.element.id
  }
}
