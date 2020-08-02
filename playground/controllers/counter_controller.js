// intersection_controller.js
import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['visibleCounter']

  connect() {
    this.controllers = new Set()
    this.updateCounter()
  }

  disconnect() {
    this.controllers.clear()
  }

  decrease({ detail: { controller } }) {
    this.controllers.delete(controller)
    this.updateCounter()
  }

  increase({ detail: { controller } }) {
    this.controllers.add(controller)
    this.updateCounter()
  }

  updateCounter() {
    this.visibleCounterTarget.textContent = this.controllers.size
  }
}
