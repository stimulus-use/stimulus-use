import { Controller } from 'stimulus'
import { useTransition } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useTransition(this, {
      enter: 'transform opacity-0 scale-50',
      enterActive: 'transition ease-in duration-1000',
      enterTo: 'transform opacity-100 scale-100',
      leave: 'transform opacity-100 scale-100',
      leaveActive: 'transition ease-out duration-1000',
      leaveTo: 'transform opacity-0 scale-50',
      hiddenClass: true
    })
  }
}
