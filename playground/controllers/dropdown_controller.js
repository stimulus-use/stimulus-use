import { Controller } from 'stimulus'
import { useClickOutside, useTransition } from 'stimulus-use'

export default class extends Controller {
  static targets = ['content', 'controlClose', 'controlOpen']

  connect() {
    useClickOutside(this)
    const transitionOptions = {
      enter: 'transition ease-out duration-300',
      enterActive: 'transform opacity-0 scale-95',
      enterTo: 'transform opacity-100 scale-100',
      leave: 'transition ease-in duration-300',
      leaveActive: 'transform opacity-100 scale-100',
      leaveTo: 'transform opacity-0 scale-95'
    }
    useTransition(this, transitionOptions)
  }

  toggle() {
    this.hasControlCloseTarget && this.controlCloseTarget.classList.toggle('hidden', this.transitioned)
    this.hasControlOpenTarget && this.controlOpenTarget.classList.toggle('hidden', !this.transitioned)

    if (this.transitioned) {
      this.leave()
    } else {
      this.enter()
    }
  }
}
