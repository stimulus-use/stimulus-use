import { Controller, Context } from 'stimulus'
import { useResize, ResizeOptions } from './use-resize'

export class ResizeController extends Controller {
  options: ResizeOptions = {}
  observe!: () => void
  unobserve!: () => void

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useResize(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  resize(contentRect: DOMRectReadOnly) {}
}
