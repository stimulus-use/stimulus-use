import { Controller, Context } from 'stimulus'
import { useClickOutside, ClickOutsideOptions } from './use-click-outside'

export class ClickOutsideController extends Controller {
  observer!: ResizeObserver
  options: ClickOutsideOptions = {}

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useClickOutside(this, this.options)
    })
  }

  clickOutside(event: Event) {}
}
