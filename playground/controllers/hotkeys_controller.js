import { Controller } from '@hotwired/stimulus'
import { useHotkeys } from 'stimulus-use/hotkeys'

export default class extends Controller {
  static targets = ['overlay']

  connect() {
    useHotkeys(this, {
      hotkeys: {
        '/': {
          handler: this.showOverlay
        }
      }
    })
  }

  showOverlay(event) {
    this.overlayTarget.classList.remove('hidden')
  }
}
