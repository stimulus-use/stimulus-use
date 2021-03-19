import { Controller } from 'stimulus'
import { useBreakpoints, Breakpoints } from 'stimulus-use'

export default class extends Controller {
  static targets = ['breakpoint', 'counter']
  static values = { counter: Number }

  connect() {
    useBreakpoints(this, { breakpoints: Breakpoints.default })
    this.counterValue = 0
  }

  breakpointChanged({ breakpoint, width }) {
    this.counterValue += 1
  }

  breakpointXS() {
    this.breakpointTarget.textContent = 'xs'
  }

  breakpointSM() {
    this.breakpointTarget.textContent = 'sm'
  }

  breakpointMD() {
    this.breakpointTarget.textContent = 'md'
  }

  breakpointLG() {
    this.breakpointTarget.textContent = 'lg'
  }

  breakpointXL() {
    this.breakpointTarget.textContent = 'xl'
  }

  breakpointXXL() {
    this.breakpointTarget.textContent = 'xxl'
  }

  breakpoint2XL() {
    this.breakpointTarget.textContent = '2xl'
  }

  counterValueChanged() {
    this.counterTarget.textContent = this.counterValue
  }
}
