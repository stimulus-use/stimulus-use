import { Controller } from 'stimulus'
import { useIdle } from 'stimulus-use'

export default class extends Controller {
  static targets = ['status', 'isIdle']

  connect() {
    useIdle(this, { ms: 2000 })
  }

  away() {
    this.statusTarget.textContent = 'away'
    this.isIdleTarget.textContent = this.isIdle
  }

  back() {
    this.statusTarget.textContent = 'active'
    this.isIdleTarget.textContent = this.isIdle
  }
}
