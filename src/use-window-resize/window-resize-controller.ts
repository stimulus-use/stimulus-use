import { Controller, Context } from 'stimulus'
import { useWindowResize, WindowResizePayload } from './use-window-resize'

export class WindowResizeController extends Controller {
  observe!: () => void
  unobserve!: () => void

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useWindowResize(this)
      Object.assign(this, { observe, unobserve })
    })
  }

  windowResize(payload: WindowResizePayload) { }
}
