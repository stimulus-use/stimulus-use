import { Controller, Context } from 'stimulus'
import { useApplication } from './use-application'
import { DispatchOptions } from "../use-dispatch"

export class ApplicationController extends Controller {
  options!: DispatchOptions
  dispatch!: (eventName: String, detail: any) => void
  metaValue!: (name: string) => string
  readonly isPreview: boolean = false
  readonly csrfToken: string = ''


  constructor(context: Context) {
    super(context)
    useApplication(this, this.options)
  }
}
