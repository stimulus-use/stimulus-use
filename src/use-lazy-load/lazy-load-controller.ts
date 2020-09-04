import { Controller, Context } from 'stimulus'
import { useLazyLoad } from './useLazyLoad'

export class LazyLoadController extends Controller {
  isLoading: boolean = false
  isLoaded: boolean = false
  options: IntersectionObserverInit = { rootMargin: '10%' }
  observer!: IntersectionObserver

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useLazyLoad(this, this.options)
    })
  }

  observeLazyLoad() {}

  unObserveLazyLoad() {}

  loading(src: string) {}

  loaded(src: string) {}
}
