import { Controller } from '@hotwired/stimulus'
import { useMemo } from '../../src'

export default class UseMemoLazyController extends Controller {
  static memos = ['memoized']

  evaluations = 0

  connect() {
    useMemo(this)

    this.application.testLogger.log({ name: 'afterUseMemo', evaluations: this.evaluations })
  }

  get memoized() {
    this.evaluations++
    return `value-${this.evaluations}`
  }
}
