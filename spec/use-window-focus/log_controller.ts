import { WindowFocusController } from '../../src'

export class LogController extends WindowFocusController {
  focus() {
    this.log({ type: 'focus', hasFocus: this.hasFocus })
  }

  unfocus() {
    this.log({ type: 'unfocus', hasFocus: this.hasFocus })
  }

  log(details) {
    this.application.testLogger.log({ id: this.id, ...details })
  }

  get id() {
    return this.element.dataset.id
  }

  get options() {
    return this.application.options
  }
}
