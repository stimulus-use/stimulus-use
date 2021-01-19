import { Controller, Context } from 'stimulus'
import { useWindowResize, WindowResizePayload } from './use-window-resize'

export class WindowResizeComposableController extends Controller {
  declare windowResize?: (payload: WindowResizePayload) => void
}

export class WindowResizeController extends WindowResizeComposableController {

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useWindowResize(this)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void

}
