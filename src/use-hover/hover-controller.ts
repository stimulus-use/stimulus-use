import { Context, Controller } from 'stimulus'
import { HoverOptions, useHover } from './use-hover'

export class HoverComposableController extends Controller {
  declare mouseEnter?: () => void
  declare mouseLeave?: () => void
}

export class HoverController extends HoverComposableController {
  options?: HoverOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useHover(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void
}
