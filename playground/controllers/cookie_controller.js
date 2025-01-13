import { Controller } from '@hotwired/stimulus'
import { useCookie } from 'stimulus-use'

export default class extends Controller {
  static targets = ['input']
  static cookieNames = ['sample']

  connect() {
    useCookie(this)
    this.inputTarget.value = this.sampleCookie ? this.sampleCookie : ''
  }

  read() {
    alert(`${new Date().toUTCString()} Cookie name: 'sample' - Cookie value: ${this.sampleCookie}`)
  }

  set() {
    this.sampleCookie = this.inputTarget.value
    this.read()
  }

  clear() {
    this.sampleCookie = null
    alert(`Cookie cleared. Cookie name: 'sample' - Cookie value: ${this.sampleCookie}`)
    this.inputTarget.value = ''
  }
}
