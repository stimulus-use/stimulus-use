import { Controller } from 'stimulus'
import { useThrottle } from '../../src'

export default class UseLogController extends Controller {
  static throttles = ['a', { name: 'c', wait: 300 }]

  connect() {
    useThrottle(this, this.application.options)
  }

  a(event) {
    this.application.testLogger.log({ name: 'a', id: event.currentTarget.id })
  }

  b(event) {
    this.application.testLogger.log({ name: 'b', id: event.currentTarget.id })
  }

  c(event) {
    this.application.testLogger.log({ name: 'c', id: event.currentTarget.id })
  }
}
