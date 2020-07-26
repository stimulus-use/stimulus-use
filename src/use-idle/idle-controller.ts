import { Controller, Context } from 'stimulus'
import { useIdle } from './use-idle'

export class IdleController extends Controller {
  isIdle: boolean = false

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useIdle(this)
    })
  }

  observe() {}

  unObserve() {}

  away() {}

  back() {}
}
