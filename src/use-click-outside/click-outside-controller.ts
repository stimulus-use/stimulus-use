import { Context, Controller } from 'stimulus'
import { ClickOutsideOptions, useClickOutside } from './use-click-outside'

export class ClickOutsideComposableController extends Controller {
  declare clickOutside: (event: Event) => void
}

export class ClickOutsideController extends ClickOutsideComposableController {
  options?: ClickOutsideOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useClickOutside(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void
}
