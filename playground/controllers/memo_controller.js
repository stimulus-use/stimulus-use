import { Controller } from '@hotwired/stimulus'
import { useMemo } from 'stimulus-use'

export default class extends Controller {
  static memos = ['normalizedText']
  static targets = ['longText']

  connect() {
    useMemo(this)

    console.time('first call')
    this.normalizedText // process the text and cache the result
    console.timeEnd('first call')

    console.time('memoized call')
    this.normalizedText // gets the results from the cache
    console.timeEnd('memoized call')
  }

  get normalizedText() {
    return this.longTextTarget.textContent.normalize('NFD')
  }
}
