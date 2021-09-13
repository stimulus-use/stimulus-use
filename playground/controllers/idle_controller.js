import { Controller } from '@hotwired/stimulus'
import { useIdle } from 'stimulus-use'

export default class extends Controller {
  static targets = ['status', 'isIdle']

  connect() {
    useIdle(this, { ms: 2000 })
  }

  away(event) {
    this.statusTarget.textContent = 'away'
    if (this.hasIsIdleTarget) {
      this.isIdleTarget.textContent = this.isIdle
    }
  }

  back(event) {
    this.statusTarget.textContent = 'active'
    if (this.hasIsIdleTarget) {
      this.isIdleTarget.textContent = this.isIdle
    }
  }

  log(event) {
    console.log('state changed', event)
  }
}
