import { Controller } from 'stimulus'
import { bindHotkeys, unbindHotkeys } from 'stimulus-use'

export default class extends Controller {
  static hotkeys = { '/': 'showOverlay' }
  static targets = ['overlay']

  connect() {
    bindHotkeys(this)
  }

  disconnect() {
    unbindHotkeys(this)
  }

  showOverlay(event) {
    this.overlayTarget.classList.remove('hidden')
  }
}
