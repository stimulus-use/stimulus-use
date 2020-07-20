// modal_controller.js
import { Controller } from 'stimulus'
import { useClickOutside } from 'stimulus-use'

export default class extends Controller {
  static targets = ['content']

  connect() {
    useClickOutside(this, { element: this.contentTarget })
  }

  clickOutside(e) {
    console.log(e)
  }

  close(e) {
    console.log(e, 'close')
  }
}
