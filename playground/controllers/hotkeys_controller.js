import { Controller } from 'stimulus'
import { useHotkeys } from 'stimulus-use'

export default class extends Controller {
  static targets = ['overlay']

  connect() {
    useHotkeys(this, {
      hotkeys: {
        '/': {
          handler: 'showOverlay'
        }
      }
    })
  }

  showOverlay(event) {
    this.overlayTarget.classList.remove('hidden')
  }
}
