import { Controller, Context } from '@hotwired/stimulus'
import { IdleOptions, useIdle } from './use-idle'

export class IdleComposableController extends Controller {
  isIdle: boolean = false
  declare away?: () => void
  declare back?: () => void
}

export class IdleController extends IdleComposableController {
  options?: IdleOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useIdle(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void
}
