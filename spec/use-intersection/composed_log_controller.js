import { Controller } from 'stimulus'
import { useIntersection, useResize, useIdle } from '../../src'

export class ComposedLogController extends Controller {
  initialize() {
    useIdle(this)
    useIntersection(this, this.application.options)
    useResize(this)
    this.log({ type: 'initialize' })
  }

  connect() {
    this.log({ type: 'connect' })
  }

  disconnect() {
    this.log({ type: 'disconnect' })
  }

  appear() {
    this.log({ type: 'appear' })
  }

  disappear() {
    this.log({ type: 'disappear' })
  }

  logAction(e) {
    this.log({ event: e.type })
  }

  log(details) {
    this.application.testLogger.log({ id: this.id, ...details })
  }

  get id() {
    return this.element.dataset.id
  }
}
