import { Controller } from 'stimulus'
import { useVisibility } from 'stimulus-use'

export default class extends Controller {
  static targets = ['visibleCounter', 'standardCounter']
  standardCounter = 0
  visibleCounter = 0

  connect() {
    useVisibility(this)
    setInterval(() => {
      this.standardCounter++
      this.isVisible && this.visibleCounter++
      this.render()
    }, 1000)
  }

  render() {
    this.standardCounterTarget.textContent = this.standardCounter
    this.visibleCounterTarget.textContent = this.visibleCounter
  }

  get standardCounter() {
    return parseInt(this.data.get('standardCounter'))
  }

  get visibleCounter() {
    return parseInt(this.data.get('visibleCounter'))
  }

  set standardCounter(value) {
    this.data.set('standardCounter', value)
  }

  set visibleCounter(value) {
    this.data.set('visibleCounter', value)
  }
}
