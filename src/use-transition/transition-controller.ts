import { Controller, Context } from 'stimulus'
import { useTransition, TransitionOptions } from './use-transition'

export class TransitionController extends Controller {
  transitioned: boolean = false
  options?: TransitionOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useTransition(this, this.options)
    })
  }

  declare enter: (event: Event) => void
  declare leave: (event: Event) => void
  declare toggleTransition: (event: Event) => void

}
