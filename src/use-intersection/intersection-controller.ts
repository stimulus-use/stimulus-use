import { Controller, Context } from 'stimulus'
import { useIntersection, IntersectionOptions } from './use-intersection'

export class IntersectionController extends Controller {
  isVisible: boolean = false
  options!: IntersectionOptions
  observer!: IntersectionObserver

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useIntersection(this, this.options)
    })
  }

  observeIntersection() {}

  unObserveIntersection() {}

  appear(entry: IntersectionObserverEntry) {}

  disappear(entry: IntersectionObserverEntry) {}
}
