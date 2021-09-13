// intersection_controller.js
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['visibleCounter', 'width']

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
    if (!this.hasVisibleCounterTarget) return
    this.visibleCounterTarget.textContent = this.controllers.size
  }

  updateSize(e) {
    this.widthTarget.textContent = e.detail.entry.contentRect.width
  }
}
