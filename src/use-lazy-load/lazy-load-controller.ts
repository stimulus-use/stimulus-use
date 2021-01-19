import { Controller, Context } from 'stimulus'
import { useLazyLoad } from './useLazyLoad'

export class LazyLoadComposableController extends Controller {
  isLoading: boolean = false
  isLoaded: boolean = false
  declare loading?: (src: string) => void
  declare loaded?: (src: string) => void
}

export class LazyLoadController extends LazyLoadComposableController {
  options: IntersectionObserverInit = { rootMargin: '10%' }

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useLazyLoad(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void

}
