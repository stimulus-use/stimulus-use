import { Controller } from '@hotwired/stimulus'
import { useDebounce } from '../../src'

export default class UseLogController extends Controller {
  static debounces = ['a']

  connect() {
    useDebounce(this, this.application.options)
  }

  a(event) {
    this.recordAction('a', event)
  }

  b(event) {
    this.recordAction('b', event)
  }

  c(event) {
    this.recordAction('c', event)
  }

  recordAction(name, event, passive = null) {
    this.application.testLogger.log({
      name,
      controller: this,
      identifier: this.identifier,
      eventType: event.type,
      currentTarget: event.currentTarget,
      params: event.params,
      defaultPrevented: event.defaultPrevented,
      passive: passive || false
    })
  }
}
