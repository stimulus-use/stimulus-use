import { Controller, Context } from 'stimulus'
import { useWindowSize, WindowSizePayload } from './use-window-size'

export class WindowSizeController extends Controller {
  observe!: () => void
  unobserve!: () => void

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useWindowSize(this)
      Object.assign(this, { observe, unobserve })
    })
  }

  resize(payload: WindowSizePayload) {}
}
