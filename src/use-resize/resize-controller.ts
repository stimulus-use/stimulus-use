import { Controller, Context } from 'stimulus'
import { useResize, ResizeOptions } from './use-resize'

export class ResizeController extends Controller {
  options?: ResizeOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useResize(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare resize: (contentRect: DOMRectReadOnly) => void
  declare observe?: () => void
  declare unobserve?: () => void

}
