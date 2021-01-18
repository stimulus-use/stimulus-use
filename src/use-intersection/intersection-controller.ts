import { Controller, Context } from 'stimulus'
import { useIntersection, IntersectionOptions } from './use-intersection'

export class IntersectionController extends Controller {
  isVisible: boolean = false
  options?: IntersectionOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useIntersection(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe?: () => void
  declare unobserve?: () => void
  declare appear: (entry: IntersectionObserverEntry) => void
  declare disappear: (entry: IntersectionObserverEntry) => void

}
