import { Controller } from '@hotwired/stimulus'
import { useHotkeys } from '../../src/hotkeys'

export class UseHotkeysMultiKeyController extends Controller {
  connect() {
    useHotkeys(this, {
      hotkeys: {
        b: { handler: this.handle, options: { element: this.element } },
        '/': { handler: this.handle, options: { element: this.element } }
      }
    })
  }

  handle(_event, hotkeysEvent) {
    this.application.testLogger.log({ name: 'multi', id: this.element.id, shortcut: hotkeysEvent.shortcut })
  }
}

export class UseHotkeysScopedController extends Controller {
  connect() {
    useHotkeys(this, {
      hotkeys: {
        m: { handler: this.handle, options: { scope: 'files' } }
      }
    })
  }

  handle() {
    this.application.testLogger.log({ name: 'scoped' })
  }
}

export class UseHotkeysReconnectController extends Controller {
  connect() {
    useHotkeys(this, {
      hotkeys: {
        y: { handler: this.handle, options: { element: this.element } }
      }
    })
  }

  handle() {
    this.application.testLogger.log({ name: 'reconnect', id: this.element.id })
  }
}
