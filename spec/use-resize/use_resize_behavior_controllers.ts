import { Controller } from '@hotwired/stimulus'
import { useResize } from '../../src'

export class UseResizeLogController extends Controller {
  connect() {
    const [observe, unobserve] = useResize(this)
    ;(this as any).observe = observe
    ;(this as any).unobserve = unobserve
  }

  resize(rect: DOMRectReadOnly) {
    this.application.testLogger.log({ name: 'resize', id: this.element.id, width: Math.round(rect.width) })
  }
}

export class UseResizeBorderBoxController extends Controller {
  connect() {
    useResize(this, { box: 'border-box' })
  }

  resize(rect: DOMRectReadOnly) {
    this.application.testLogger.log({ name: 'resize-border', width: Math.round(rect.width) })
  }
}

export class UseResizeElementController extends Controller {
  static targets = ['observed']

  declare readonly observedTarget: HTMLElement

  connect() {
    useResize(this, { element: this.observedTarget })
  }

  resize(rect: DOMRectReadOnly) {
    this.application.testLogger.log({ name: 'resize-element', width: Math.round(rect.width) })
  }
}
