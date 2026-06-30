import { Controller } from '@hotwired/stimulus'
import { useHotkeys } from '../../src/hotkeys'

export const simpleFormFilter = () => true

export default class UseHotkeysSimpleFilterController extends Controller {
  connect() {
    useHotkeys(this, {
      b: [this.bHandler],
      '/': [this.slashHandler],
      filter: simpleFormFilter
    })
  }

  bHandler(event) {
    this.application.testLogger.log({ name: 'bHandler', type: event.type })
  }

  slashHandler(event) {
    this.application.testLogger.log({ name: 'slashHandler', type: event.type })
  }
}

export const blockingFilter = () => false

export class UseHotkeysBlockingFilterController extends Controller {
  connect() {
    useHotkeys(this, {
      b: [this.bHandler],
      filter: blockingFilter
    })
  }

  bHandler(event) {
    this.application.testLogger.log({ name: 'blockedHandler', type: event.type })
  }
}
