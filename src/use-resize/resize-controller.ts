import { Controller, Context } from 'stimulus'
import { useResize, ResizeOptions } from './use-resize'

export class ResizeComposableController extends Controller {
  declare resize: (contentRect: DOMRectReadOnly) => void
}

export class ResizeController extends ResizeComposableController {
  options?: ResizeOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useResize(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void
}
