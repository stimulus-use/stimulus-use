import { Controller } from 'stimulus'
import { useClickOutside, useTransition, useDebounce } from 'stimulus-use'

export default class extends Controller {
  static targets = ['content', 'controlClose', 'controlOpen']
  static debounces = ['show', 'hide']

  connect() {
    useClickOutside(this)
    useTransition(this, { element: this.contentTarget })
    useDebounce(this)
  }

  toggle() {
    this.hasControlCloseTarget && this.controlCloseTarget.classList.toggle('hidden', this.isOpen)
    this.hasControlOpenTarget && this.controlOpenTarget.classList.toggle('hidden', !this.isOpen)
  }

  clickOutside(e) {
    this.hide()
  }
}
