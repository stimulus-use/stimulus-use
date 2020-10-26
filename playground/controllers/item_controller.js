import { ApplicationController, useDebounce } from 'stimulus-use'

export default class extends ApplicationController {
  static debounces = ['add']

  connect() {
    useDebounce(this)
  }

  add() {
    this.dispatch('add', { detail: { quantity: 1 } })
  }
}
