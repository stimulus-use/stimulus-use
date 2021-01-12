import { Context, Controller } from 'stimulus'
import { HoverOptions, useHover } from './use-hover'

export class HoverController extends Controller {
  options!: HoverOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useHover(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  observe!: () => {}
  unobserve!: () => {}

  mouseEnter!: () => {}
  mouseLeave!: () => {}
}
