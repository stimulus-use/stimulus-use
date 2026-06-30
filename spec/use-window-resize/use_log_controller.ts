import { Controller } from '@hotwired/stimulus'
import { useWindowResize } from '../../src'

export class UseLogController extends Controller {
  connect() {
    useWindowResize(this)
  }

  windowResize({ width, height }) {
    this.log({ type: 'resize', width, height })
  }

  log(details) {
    this.application.testLogger.log({ id: this.id, ...details })
  }

  get id() {
    return this.element.dataset.id
  }
}
