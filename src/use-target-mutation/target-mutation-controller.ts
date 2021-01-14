import { Context, Controller } from 'stimulus'
import { TargetMutationOptions, useTargetMutation } from './use-target-mutation'

export class TargetMutationController extends Controller {

  options!: TargetMutationOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useTargetMutation(this, this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  observe!: () => {}
  unobserve!: () => {}

  [index: string]: any;
}
