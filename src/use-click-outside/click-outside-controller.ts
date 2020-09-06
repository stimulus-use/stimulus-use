import { Controller, Context } from 'stimulus'
import { useClickOutside, ClickOutsideOptions } from './use-click-outside'

export class ClickOutsideController extends Controller {
  options!: ClickOutsideOptions
  observe!: () => void
  unobserve!: () => void

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useClickOutside(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  clickOutside(event: Event) {}
}
