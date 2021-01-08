import { Controller } from 'stimulus'
import { useTransition } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useTransition(this, {
      enter: 'transition ease-out duration-700',
      enterActive: 'transform opacity-0 scale-0',
      enterTo: 'transform opacity-1 scale-100',
      leave: 'transition ease-in duration-100',
      leaveActive: 'transform opacity-100 scale-100',
      leaveTo: 'transform opacity-0 scale-0',
      hiddenClass: false
    })
  }
}
