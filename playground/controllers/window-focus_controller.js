import { Controller } from 'stimulus'
import { useWindowFocus } from 'stimulus-use'

export default class extends Controller {
  static targets = ['visibility']

  connect() {
    useWindowFocus(this)
  }

  focus() {
    this.visibilityTarget.textContent = "focused"
  }

  unfocus() {
    this.visibilityTarget.textContent = "not focused"
  }
}
