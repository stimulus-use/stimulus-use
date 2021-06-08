import { Controller } from 'stimulus'
import { bindHotkeys, unbindHotkeys } from '../../src'

export default class UseLogController extends Controller {
  static hotkeys = { '/': 'singleKeyHandler', 'cmd+a': 'metaKeyHandler' }

  connect() {
    bindHotkeys(this)
  }

  disconnect() {
    unbindHotkeys(this)
  }

  singleKeyHandler(event) {
    this.application.testLogger.log({ name: 'singleKeyHandler', type: event.type })
  }

  metaKeyHandler(event) {
    this.application.testLogger.log({ name: 'metaKeyHandler', type: event.type })
  }
}
