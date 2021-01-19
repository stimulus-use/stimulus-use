import { Context, Controller } from 'stimulus'
import { MutationOptions, useMutation } from './use-mutation'

export class MutationComposableController extends Controller {
  declare mutate?: (entries: MutationRecord[]) => void
}

export class MutationController extends MutationComposableController {
  options?: MutationOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useMutation(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  declare observe: () => void
  declare unobserve: () => void

}
