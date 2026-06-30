import { Controller } from '@hotwired/stimulus'
import { useWindowFocus } from '../../src'

export class UseLogController extends Controller {
  connect() {
    useWindowFocus(this, this.application.options)
  }

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
}
