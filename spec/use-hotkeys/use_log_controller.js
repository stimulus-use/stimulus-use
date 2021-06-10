import { Controller } from 'stimulus'
import { useHotkeys } from '../../src'

export default class UseLogController extends Controller {
  static targets = ['input']
  static values = { filter: Boolean }

  connect() {
    useHotkeys(this, {
      hotkeys: {
        '/': {
          handler: this.singleKeyHandler.bind(this)
        },
        'cmd+a': {
          handler: this.metaKeyHandler.bind(this)
        },
        f: {
          handler: this.scopeHandler.bind(this),
          options: {
            scope: 'files'
          }
        },
        b: {
          handler: this.inputHandler.bind(this)
        },
        c: {
          handler: this.keyUpHandler.bind(this),
          options: {
            keydown: false,
            keyup: true
          }
        },
        'ctrl-d': {
          handler: this.splitKeyHandler.bind(this),
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
