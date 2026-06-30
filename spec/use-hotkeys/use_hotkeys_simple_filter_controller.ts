import { Controller } from '@hotwired/stimulus'
import { useHotkeys } from '../../src/hotkeys'

export const simpleFormFilter = () => true

export default class UseHotkeysSimpleFilterController extends Controller {
  connect() {
    useHotkeys(this, {
      b: [this.bHandler],
      filter: simpleFormFilter
    })
  }

  bHandler(event) {
    this.application.testLogger.log({ name: 'bHandler', type: event.type })
  }
}
