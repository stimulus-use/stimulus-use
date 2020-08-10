import { ClickOutsideController } from '../../src'

export default class LogController extends ClickOutsideController {
  initialize() {
    this.options = this.application.options
    super.initialize()
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
