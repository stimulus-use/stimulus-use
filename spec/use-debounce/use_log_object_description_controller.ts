import { Controller } from '@hotwired/stimulus'
import { useDebounce } from '../../src'

export default class UseLogObjectDescriptionController extends Controller {
  static debounces = [
    {
      name: 'a',
      wait: 300
    },
    'c'
  ]

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
