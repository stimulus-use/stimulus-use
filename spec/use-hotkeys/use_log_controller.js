import { Controller } from 'stimulus'
import { useHotkeys } from '../../src'

export default class UseLogController extends Controller {
  static targets = ['input']
  static values = { filter: Boolean }

  connect() {
    useHotkeys(this, {
      hotkeys: {
        '/': {
          handler: 'singleKeyHandler'
        },
        'cmd+a': {
          handler: 'metaKeyHandler'
        },
        f: {
          handler: 'scopeHandler',
          options: {
            scope: 'files'
          }
        },
        b: {
          handler: 'inputHandler'
        },
        c: {
          handler: 'keyUpHandler',
          options: {
            keydown: false,
            keyup: true
          }
        },
        'ctrl-d': {
          handler: 'splitKeyHandler',
          options: {
            splitKey: '-'
          }
        }
      },
      filter: this.filter
    })
  }

  get filter() {
    if (this.filterValue) {
      return e => true
    }
  }

  singleKeyHandler(event) {
    this.application.testLogger.log({ name: 'singleKeyHandler', type: event.type })
  }

  metaKeyHandler(event) {
    this.application.testLogger.log({ name: 'metaKeyHandler', type: event.type })
  }

  scopeHandler(event) {
    this.application.testLogger.log({ name: 'scopeHandler', type: event.type })
  }

  inputHandler(event) {
    this.application.testLogger.log({ name: 'inputHandler', type: event.type })
  }

  keyUpHandler(event) {
    this.application.testLogger.log({ name: 'keyUpHandler', type: event.type })
  }

  splitKeyHandler(event) {
    this.application.testLogger.log({ name: 'splitKeyHandler', type: event.type })
  }
}
