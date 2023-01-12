import { Controller, Context } from '@hotwired/stimulus'
import { useTransition, TransitionOptions } from './use-transition'

export interface ITransitionController {
  transitioned: boolean
  enter?(event: Event | undefined): void
  leave?(event: Event | undefined): void
  toggleTransition?(event: Event | undefined): void
}

export class TransitionComposableController extends Controller implements ITransitionController {
  transitioned: boolean = false
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
