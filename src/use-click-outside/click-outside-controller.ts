import { Controller, Context } from 'stimulus'
import { useClickOutside } from './use-click-outside'

export class ClickOutsideController extends Controller {
  observer!: ResizeObserver

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useClickOutside(this)
    })
  }

  clickOutside(event: Event) {}
}
