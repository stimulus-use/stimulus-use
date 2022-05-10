import { Controller } from '@hotwired/stimulus'
import { useTransition } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useTransition(this, {
      enterActive: 'transition ease-in duration-300',
      enterFrom: 'transform opacity-0 scale-50',
      enterTo: 'transform opacity-100 scale-100 visible',
      leaveActive: 'transition ease-out duration-300',
      leaveFrom: 'transform opacity-100 scale-100',
      leaveTo: 'transform opacity-0 scale-50',
      removeToClasses: false,
      hiddenClass: 'opacity-0'
    })
  }
}
