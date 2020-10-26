import { Controller } from 'stimulus'
import { useWindowResize } from 'stimulus-use'

export default class extends Controller {
  static targets = ['width', 'height']

  connect() {
    useWindowResize(this)
  }

  windowResize({ width, height }) {
    this.widthTarget.textContent = width
    this.heightTarget.textContent = height
  }
}
