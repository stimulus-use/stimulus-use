import { Controller } from 'stimulus'
import { useDispatch, useDebounce } from 'stimulus-use'

export default class extends Controller {
  static debounces = ['add']

  connect() {
    useDebounce(this, { wait: 100 })
    useDispatch(this)
  }

  add() {
    const { id } = this
    this.dispatch('add', { quantity: 1, id })
  }

  get id() {
    return this.data.has('id') ? this.data.get('id') : ''
  }
}
