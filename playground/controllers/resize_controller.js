import { Controller } from 'stimulus'
import { useResize } from 'stimulus-use'

export default class extends Controller {
  static targets = ['width', 'height']

  options = {
    eventPrefix: 'card'
  }

  connect() {
    useResize(this, this.options)
  }

  resize({ width, height }) {
    this.widthTarget.textContent = Math.round(width)
    this.heightTarget.textContent = Math.round(height)
  }
}
