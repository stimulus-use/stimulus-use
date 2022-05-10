import { Controller } from '@hotwired/stimulus'
import { useHover, useTransition } from 'stimulus-use'

export default class extends Controller {
  static targets = ['content']

  connect() {
    useTransition(this, {
      element: this.contentTarget,
      enterActive: 'transition ease-in duration-300',
      enterFrom: 'transform opacity-0 scale-50',
      enterTo: 'transform opacity-100 scale-100 visible',
      leaveActive: 'transition ease-out duration-300',
      leaveFrom: 'transform opacity-100 scale-100',
      leaveTo: 'transform opacity-0 scale-50'
    })
    useHover(this)
  }

  mouseEnter(e) {
    this.enter()
  }

  mouseLeave(e) {
    this.leave()
  }
}
