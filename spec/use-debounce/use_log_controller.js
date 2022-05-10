import { Controller } from '@hotwired/stimulus'
import { useDebounce } from '../../src'

export default class UseLogController extends Controller {
  static debounces = ['a']

  connect() {
    useDebounce(this, this.application.options)
  }

  a() {
    this.application.testLogger.log({ name: 'a' })
  }

  b() {
    this.application.testLogger.log({ name: 'b' })
  }

  c() {
    this.application.testLogger.log({ name: 'c' })
  }
}
