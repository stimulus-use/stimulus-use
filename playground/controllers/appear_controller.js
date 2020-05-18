// intersection_controller.js
import { Controller } from 'stimulus'
import { useIntersection } from 'stimulus-use'

export default class extends Controller {
  options = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
  }

  connect() {
    useIntersection(this, this.options)
  }

  appear({ intersectionRatio }) {
    // callback automatically triggered when the element
    // intersects with the viewport if several threshold
    if (intersectionRatio === 1) {
      this.element.textContent = 'Appeared'
    } else {
      this.element.textContent = 'Appearing'
    }
  }

  disappear() {
    this.element.textContent = 'Disapeared'
  }
}
