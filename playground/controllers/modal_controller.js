// modal_controller.js
import { Controller } from 'stimulus'
import { useClickOutside } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useClickOutside(this)
  }

  clickOutside(e) {
    console.log(e)
  }
}
