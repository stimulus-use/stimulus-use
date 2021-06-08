import { Controller } from 'stimulus'
import { useHotkeys, unuseHotkeys } from 'stimulus-use'

export default class extends Controller {
  static hotkeys = { '/': 'showOverlay' }
  static targets = ['overlay']

  connect() {
    useHotkeys(this)
  }

  disconnect() {
    unuseHotkeys(this)
  }

  showOverlay(event) {
    this.overlayTarget.classList.remove('hidden')
  }
}
