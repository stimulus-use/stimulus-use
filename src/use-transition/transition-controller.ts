import { Controller, Context } from 'stimulus'
import { useTransition, TransitionOptions } from './use-transition'

export class TransitionComposableController extends Controller {
  transitioned: boolean = false

  declare enter: (event: Event) => void
  declare leave: (event: Event) => void
  declare toggleTransition: (event: Event) => void
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
