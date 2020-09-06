import { Controller, Context } from 'stimulus'
import { useLazyLoad } from './useLazyLoad'

export class LazyLoadController extends Controller {
  isLoading: boolean = false
  isLoaded: boolean = false
  options: IntersectionObserverInit = { rootMargin: '10%' }

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useLazyLoad(this, this.options)
    })
  }

  loading(src: string) {}

  loaded(src: string) {}
}
