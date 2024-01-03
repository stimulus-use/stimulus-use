import { Controller } from '@hotwired/stimulus'
import { useCookie } from 'stimulus-use'

export default class extends Controller {
  static targets =  ['sample']

  connect() {
    useCookie(this)
  }

  read(){
    alert(`${new Date().toUTCString()} Cookie name: 'sample' - Cookie value: ${this.sampleCookie}`)
  }

  set() {
    this.setCookie("sample", this.sampleTarget.value)
    this.read()
  }

  clear() {
    this.clearCookie("sample")
    alert(`Cookie cleared. Cookie name: 'sample' - Cookie value: ${this.sampleCookie}`)
  }
}
