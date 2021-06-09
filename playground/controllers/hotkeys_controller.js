import { Controller } from 'stimulus'
import { useHotkeys } from 'stimulus-use'

export default class extends Controller {
  static hotkeys = { '/': 'showOverlay' }
  static targets = ['overlay']

  connect() {
    useHotkeys(this)
  }

  showOverlay(event) {
    this.overlayTarget.classList.remove('hidden')
  }
}
