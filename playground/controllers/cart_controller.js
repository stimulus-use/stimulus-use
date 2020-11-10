import { ApplicationController } from 'stimulus-use'

export default class extends ApplicationController {
  static targets = ['counterView']
  counter = 0

  refreshTotal(e) {
    this.counter += e.detail.quantity
    console.log(e.detail)
  }

  renderCounter() {
    this.counterViewTarget.textContent = this.counter
  }

  set counter(value) {
    this.data.set('counter', value)
    this.renderCounter()
  }

  get counter() {
    return parseInt(this.data.get('counter'))
  }
}
