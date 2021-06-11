// lazy-load_controller.js
import { LazyLoadController } from 'stimulus-use'

export default class extends LazyLoadController {
  options = {
    rootMargin: '150px'
  }

  loading(src) {
    // this.isLoading => true
    // this.loaded = false
  }

  loaded(src) {
    // this.isLoading => false
    // this.loaded => true
  }
}
