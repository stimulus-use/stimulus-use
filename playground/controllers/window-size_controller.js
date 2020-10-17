import { Controller } from 'stimulus'
import { useWindowSize } from 'stimulus-use'

export default class extends Controller {
  static targets = ['width', 'height']

  connect() {
    useWindowSize(this)
  }

  windowResize({ width, height }) {
    this.widthTarget.textContent = width
    this.heightTarget.textContent = height
  }
}
