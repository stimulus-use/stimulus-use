import { Controller } from '@hotwired/stimulus'
import { useHotkeys } from '../../src/hotkeys'

export default class UseHotkeysEventController extends Controller {
  connect() {
    useHotkeys(this, {
      x: [this.recordHandler]
    })
  }

  recordHandler(event, hotkeysEvent) {
    this.application.testLogger.log({
      name: 'recordHandler',
      firstIsKeyboardEvent: event instanceof KeyboardEvent,
      secondIsKeyboardEvent: hotkeysEvent instanceof KeyboardEvent,
      shortcut: hotkeysEvent && hotkeysEvent.shortcut,
      scope: hotkeysEvent && hotkeysEvent.scope
    })
  }
}
