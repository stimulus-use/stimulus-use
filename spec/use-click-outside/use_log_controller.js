import { Controller } from '@hotwired/stimulus'
import { useClickOutside } from '../../src'

export default class UseLogController extends Controller {
  initialize() {
    this.application.testLogger.log({ id: this.id, event: 'initialize', type: 'lifecycle' })
  }

  connect() {
    useClickOutside(this, this.application.options)
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
}
