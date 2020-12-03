import { ApplicationController } from 'stimulus-use'

export default class extends ApplicationController {
  static targets = ['counterView']

  initialize() {
    this.counter = this.data.has('counter') ? parseInt(this.data.get('counter')) : 0
  }

  refreshTotal(e) {
    this.counter += e.detail.quantity
    this.renderCounter()
  }

  renderCounter() {
    this.counterViewTarget.classList.toggle('hidden', this.counter <= 0)
    this.counterViewTarget.textContent = this.counter
  }
}
