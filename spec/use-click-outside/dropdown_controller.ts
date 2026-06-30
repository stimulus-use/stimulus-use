import { Controller } from '@hotwired/stimulus'
import { useClickOutside } from '../../src'

export default class DropdownController extends Controller {
  static targets = ['menu']

  declare readonly menuTarget: HTMLElement

  connect() {
    useClickOutside(this)
  }

  toggle() {
    this.menuTarget.classList.toggle('hidden')
  }

  clickOutside() {
    this.menuTarget.classList.add('hidden')
  }
}
