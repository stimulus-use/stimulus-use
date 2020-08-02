// intersection_controller.js
import { Controller } from 'stimulus'

const controllers = new Set()

export default class extends Controller {
  static targets = ['visibleCounter']

  connect() {
    this.updateCounter()
  }

  decrease({ detail: { controller } }) {
    controllers.delete(controller)
    this.updateCounter()
  }

  increase({ detail: { controller } }) {
    controllers.add(controller)
    this.updateCounter()
  }

  updateCounter() {
    this.visibleCounterTarget.textContent = controllers.size
  }
}
