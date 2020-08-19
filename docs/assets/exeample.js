import { Controller } from 'stimulus'
import { useIntersection, useResize } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIntersection(this)
    useResize(this)
  }

  appear(entry) {
    // new callback whenever the element appears.
    // entry is an IntersectionObserverEntry
  }

  disappear(entry) {
    // new callback whenever the element disappears.
  }

  resize({ width, height }) {
    // callback whenever the element gets resized
  }
}
