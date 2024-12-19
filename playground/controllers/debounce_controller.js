import { ApplicationController, useDebounce } from 'stimulus-use'

export default class extends ApplicationController {
  static targets = ['yellow', 'purple']
  static debounces = [
    { name: 'yellow', leading: true },
    { name: 'purple', leading: false }
  ]

  #counts = {}

  initialize() {
    this.constructor.targets.forEach(target => (this.#counts[target] = 0))
  }

  connect() {
    useDebounce(this)
  }

  yellow() {
    this.#increment('yellow')
  }

  purple() {
    this.#increment('purple')
  }

  #increment(color) {
    this.#counts[color] += 1
    this.targets.find(color).innerText = this.#counts[color].toString().padStart(2, '0')
  }
}
