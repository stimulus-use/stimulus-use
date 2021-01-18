import { Controller, Context } from 'stimulus'
import { useWindowResize, WindowResizePayload } from './use-window-resize'

export class WindowResizeController extends Controller {

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useWindowResize(this)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe?: () => void
  declare unobserve?: () => void
  declare windowResize: (payload: WindowResizePayload) => void

}
