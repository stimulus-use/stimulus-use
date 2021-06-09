import { Controller } from 'stimulus'
import { useHotkeys } from '../../src'

export default class UseLogController extends Controller {
  connect() {
    useHotkeys(this, {
      hotkeys: {
        '/': {
          handler: 'singleKeyHandler'
        },
        'cmd+a': {
          handler: 'metaKeyHandler'
        }
      }
    })
  }

  singleKeyHandler(event) {
    this.application.testLogger.log({ name: 'singleKeyHandler', type: event.type })
  }

  metaKeyHandler(event) {
    this.application.testLogger.log({ name: 'metaKeyHandler', type: event.type })
  }
}
