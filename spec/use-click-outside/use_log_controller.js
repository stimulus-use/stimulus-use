import { Controller } from 'stimulus'
import { useClickOutside } from '../../src'

export default class UseLogController extends Controller {
  connect() {
    useClickOutside(this, this.application.options)
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
