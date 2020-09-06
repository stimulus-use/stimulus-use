import { Controller, Context } from 'stimulus'
import { useLazyLoad } from './useLazyLoad'

export class LazyLoadController extends Controller {
  isLoading: boolean = false
  isLoaded: boolean = false
  options: IntersectionObserverInit = { rootMargin: '10%' }
  observe!: () => void
  unobserve!: () => void

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useLazyLoad(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  loading(src: string) {}

  loaded(src: string) {}
}
