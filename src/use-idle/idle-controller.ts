import { Controller, Context } from 'stimulus'
import { useIdle, IdleOptions } from './use-idle'

export class IdleController extends Controller {
  isIdle: boolean = false
  options!: IdleOptions
  observe!: () => void
  unobserve!: () => void

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useIdle(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  away() {}

  back() {}
}
