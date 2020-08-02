import { Controller } from 'stimulus'
import { useResize } from 'stimulus-use'

export default class extends Controller {
  static targets = ['width', 'height']

  connect() {
    useResize(this)
  }

  resize({ width, height }) {
    this.widthTarget.textContent = width
    this.heightTarget.textContent = height
  }
}
