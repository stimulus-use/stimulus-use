import { Controller, Context } from 'stimulus'
import { useApplication } from './use-application'

interface EventArgs {
  target: any
  detail: any
  bubbles: boolean
}

export class ApplicationController extends Controller {
  readonly isPreview: boolean = false
  readonly csrfToken: string = ''

  constructor(context: Context) {
    super(context)
    requestAnimationFrame(() => {
      useApplication(this)
    })
  }

  dispatch(eventName: String, eventArgs: EventArgs) {}

  metaValue(name: string): string {
    return ''
  }
}
