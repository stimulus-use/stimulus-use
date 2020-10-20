import { Controller, Context } from 'stimulus'
import { useMemo } from './use-memo'

export class MemoController extends Controller {
  constructor(context: Context) {
    super(context)
    useMemo(this)
  }
}
