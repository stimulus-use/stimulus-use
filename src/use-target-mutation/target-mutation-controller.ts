import { Context, Controller } from '@hotwired/stimulus'
import { TargetMutationOptions, useTargetMutation } from './use-target-mutation'

export class TargetMutationComposableController extends Controller {
  [index: string]: any
}

export class TargetMutationController extends TargetMutationComposableController {
  options!: TargetMutationOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useTargetMutation(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void
}
