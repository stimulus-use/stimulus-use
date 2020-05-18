import { Controller } from 'stimulus'
import { useResize } from 'stimulus-use'

export default class extends Controller {
  static targets = ['width']

  connect() {
    useResize(this)
  }

  resize({ width }) {
    this.widthTarget.textContent = width
  }
}
