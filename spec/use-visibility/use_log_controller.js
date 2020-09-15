import { Controller } from 'stimulus'
import { useVisibility } from '../../src'

export class UseLogController extends Controller {
  initialize() {
    useVisibility(this, this.application.options)
    this.log({ type: 'initialize', visibility: this.isVisible })
  }

  connect() {
    this.log({ type: 'connect', visibility: this.isVisible })
  }

  disconnect() {
    this.log({ type: 'disconnect' })
  }

  invisible() {
    console.log('invisible')
    this.log({ type: 'invisible', visibility: this.isVisible })
  }

  visible() {
    console.log('invisible')
    this.log({ type: 'visible', visibility: this.isVisible })
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
}
