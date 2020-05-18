import { ApplicationController } from 'stimulus-use'

export default class extends ApplicationController {
  add() {
    this.dispatch('add', { detail: { quantity: 1 } })
  }
}
