import { Controller } from '@hotwired/stimulus'
import { useDebounce } from '../../src'

export default class UseLogArgumentController extends Controller {
  static debounces = ['search']

  connect() {
    useDebounce(this, this.application.options)
  }

  search(query) {
    this.application.testLogger.log({ name: 'search', query, args: Array.from(arguments) })
  }
}
