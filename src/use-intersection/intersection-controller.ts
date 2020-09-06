import { Controller, Context } from 'stimulus'
import { useIntersection, IntersectionOptions } from './use-intersection'

export class IntersectionController extends Controller {
  isVisible: boolean = false
  options!: IntersectionOptions
  observe!: () => void
  unobserve!: () => void

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useIntersection(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  appear(entry: IntersectionObserverEntry) {}

  disappear(entry: IntersectionObserverEntry) {}
}
