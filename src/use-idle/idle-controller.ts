import { Controller, Context } from 'stimulus'
import { useIdle, IdleOptions } from './use-idle'

export class IdleController extends Controller {
  isIdle: boolean = false
  options?: IdleOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useIdle(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe?: () => void
  declare unobserve?: () => void
  declare away: () => void
  declare back: () => void

}
