import { ApplicationController } from 'stimulus-use'

export default class extends ApplicationController {
  static targets = ['counterView']

  refreshTotal(e) {
    this.counter++
  }

  renderCounter() {
    this.counterViewTarget.textContent = this.counter
  }

  set counter(value) {
    this.data.set('counter', value)
    this.renderCounter()
  }

  get counter() {
    return this.data.get('counter')
  }
}
