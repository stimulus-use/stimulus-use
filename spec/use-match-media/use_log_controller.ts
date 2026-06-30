import { Controller } from '@hotwired/stimulus'
import { useMatchMedia } from '../../src'

export class UseLogController extends Controller {
  connect() {
    useMatchMedia(this, this.application.options)
  }

  isSmall() {
    this.log({ type: 'isSmall' })
  }

  notSmall() {
    this.log({ type: 'notSmall' })
  }

  smallChanged(payload) {
    this.log({ type: 'smallChanged', matches: payload.matches })
  }

  log(details) {
    this.application.testLogger.log({ id: this.id, ...details })
  }

  get id() {
    return this.element.dataset.id
  }
}
