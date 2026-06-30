import { Controller } from '@hotwired/stimulus'
import { useHotkeys } from '../../src/hotkeys'

export default class UseHotkeysSharedKeyController extends Controller {
  connect() {
    useHotkeys(this, {
      hotkeys: {
        b: {
          handler: this.handle,
          options: { element: this.element }
        }
      }
    })
  }

  handle() {
    this.application.testLogger.log({ name: 'handle', id: this.element.id })
  }
}
