import { Controller, Context } from 'stimulus'
import { useResize, ResizeOptions } from './use-resize'

export class ResizeController extends Controller {
  observer!: ResizeObserver
  options: ResizeOptions = {}

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useResize(this, this.options)
    })
  }

  observeResize() {}

  unObserveResize() {}

  resize(contentRect: DOMRectReadOnly) {}
}
