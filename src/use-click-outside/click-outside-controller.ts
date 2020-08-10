import { Controller } from 'stimulus'
import { useClickOutside, ClickOutsideOptions } from './use-click-outside'

export class ClickOutsideController extends Controller {
  observer!: ResizeObserver
  options: ClickOutsideOptions = {}

  initialize() {
    useClickOutside(this, this.options)
  }

  clickOutside(event: Event) {}
}
