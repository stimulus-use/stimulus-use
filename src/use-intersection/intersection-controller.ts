import { Controller, Context } from 'stimulus'
import { useIntersection, IntersectionOptions } from './use-intersection'

export class IntersectionComposableController extends Controller {
  isVisible: boolean = false
  declare appear?: (entry: IntersectionObserverEntry) => void
  declare disappear?: (entry: IntersectionObserverEntry) => void
}

export class IntersectionController extends IntersectionComposableController {
  options?: IntersectionOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useIntersection(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void
}
