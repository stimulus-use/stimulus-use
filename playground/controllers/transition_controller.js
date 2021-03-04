import { Controller } from 'stimulus'
import { useTransition } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useTransition(this, {
      enter: 'transform opacity-0 scale-50',
      enterActive: 'transition ease-in duration-300',
      enterTo: 'transform opacity-100 scale-100 visible',
      leave: 'transform opacity-100 scale-100',
      leaveActive: 'transition ease-out duration-300',
      leaveTo: 'transform opacity-0 scale-50',
      removeToClasses: false,
      hiddenClass: 'opacity-0'
    })
  }
}
