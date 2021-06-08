import { Controller } from 'stimulus'
import { useHotkeys, unuseHotkeys } from '../../src'

export default class UseLogController extends Controller {
  static hotkeys = { '/': 'singleKeyHandler', 'cmd+a': 'metaKeyHandler' }

  connect() {
    useHotkeys(this)
  }

  disconnect() {
    unuseHotkeys(this)
  }

  singleKeyHandler(event) {
    this.application.testLogger.log({ name: 'singleKeyHandler', type: event.type })
  }

  metaKeyHandler(event) {
    this.application.testLogger.log({ name: 'metaKeyHandler', type: event.type })
  }
}
