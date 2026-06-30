import { Controller } from '@hotwired/stimulus'
import { useResize } from '../../src'

export default class UseResizeController extends Controller {
  connect() {
    useResize(this)
  }

  resize({ width }) {
    ;(this.element as HTMLElement).style.height = `${Math.round(width)}px`
    this.application.testLogger.log({ name: 'resize', width: Math.round(width) })
  }
}
