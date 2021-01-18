import { Controller, Context } from 'stimulus'
import { useVisibility, VisibilityOptions } from './use-visibility'

export class VisibilityComposableController extends Controller {
  isVisible: boolean = false
  declare visible?: () => void
  declare invisible?: () => void
}

export class VisibilityController extends VisibilityComposableController {
  options?: VisibilityOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useVisibility(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void

}
