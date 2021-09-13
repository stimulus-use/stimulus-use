import { Controller, Context } from '@hotwired/stimulus'
import { useWindowFocus, WindowFocusOptions } from './use-window-focus'

export class WindowFocusComposableController extends Controller {
  hasFocus: boolean = false
  declare focus?: () => void
  declare unfocus?: () => void
}

export class WindowFocusController extends WindowFocusComposableController {
  options?: WindowFocusOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useWindowFocus(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void
}
