import { Context, Controller } from 'stimulus'
import { TargetChangesOptions, useTargetChanges } from './use-target-changes'

export class TargetChangesController extends Controller {
  options!: TargetChangesOptions

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      const [observe, unobserve] = useTargetChanges(this, [], this.options)
      Object.assign(this, { observe, unobserve })
    })
  }

  observe!: () => {}
  unobserve!: () => {}

  mutate!: (entries: MutationRecord[]) => {}

  [index: string]: any;
}
