import { Controller, Context } from 'stimulus'
import { useTransition, TransitionOptions } from './use-transition'

export class TransitionController extends Controller {
  isOpen: boolean = false
  options!: TransitionOptions
  enter!: (event: Event) => void
  leave!: (event: Event) => void
  toggleTransition!: (event: Event) => void

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useTransition(this, this.options)
    })
  }
}
