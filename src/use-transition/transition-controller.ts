import { Controller, Context } from 'stimulus'
import { useTransition, TransitionOptions } from './use-transition'

export class TransitionComposableController extends Controller {
  transitioned: boolean = false

  declare enter?: (event: Event | undefined) => void
  declare leave?: (event: Event | undefined) => void
  declare toggleTransition?: (event: Event | undefined) => void
}

export class TransitionController extends TransitionComposableController {
  options?: TransitionOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useTransition(this, this.options)
    })
  }
}
