import { Controller, Context } from 'stimulus'
import { useResize } from './use-resize'

export class ResizeController extends Controller {
  observer: ResizeObserver

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useResize(this)
    })
  }

  observe() {}

  unObserve() {}

  resize(contentRect: DOMRectReadOnly) {}
}
