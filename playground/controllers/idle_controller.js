import { Controller } from 'stimulus'
import { useIdle } from 'stimulus-use'

export default class extends Controller {
  static targets = ['status', 'isIdle']

  connect() {
    useIdle(this, 2000)
  }

  idle() {
    this.statusTarget.textContent = 'idle'
    this.isIdleTarget.textContent = this.isIdle
  }

  returned() {
    this.statusTarget.textContent = 'active'
    this.isIdleTarget.textContent = this.isIdle
  }
}
