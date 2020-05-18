import { Controller, Context } from 'stimulus'
import { useLazyLoad } from './useLazyLoad'

export class LazyLoadController extends Controller {
  isLoading: boolean = false
  isLoaded: boolean = false
  options: IntersectionObserverInit = { rootMargin: '10%' }
  observer: IntersectionObserver

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useLazyLoad(this, this.options)
    })
  }

  observe() {}

  unObserve() {}

  loading(src: string) {
    console.log('loading', src)
  }

  loaded(src: string) {
    console.log('loaded', src)
  }
}
