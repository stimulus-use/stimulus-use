import { WindowResizeController } from '../../src'

export class LogController extends WindowResizeController {
  windowResize({ width, height }) {
    this.log({ type: 'resize', width, height })
  }

  log(details) {
    this.application.testLogger.log({ id: this.id, ...details })
  }

  get id() {
    return this.element.dataset.id
  }
}
