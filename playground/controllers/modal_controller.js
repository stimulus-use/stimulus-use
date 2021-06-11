// modal_controller.js
import { ClickOutsideController } from 'stimulus-use'

export default class extends ClickOutsideController {
  static targets = ['content']
  options = {
    dispatchEvent: false
  }

  clickOutside(e) {
    console.log(e)
  }

  close(e) {
    console.log(e, 'close')
  }
}
