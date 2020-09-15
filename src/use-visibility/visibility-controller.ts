import { Controller, Context } from 'stimulus'
import { useVisibility, VisibilityOptions } from './use-visibility'

export class VisibilityController extends Controller {
  isVisible!: boolean
  options!: VisibilityOptions
  observe!: () => void
  unobserve!: () => void
  visible!: () => void
  invisible!: () => void

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useVisibility(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }
}
