import { Controller } from 'stimulus'
import { useBreakpoints, Breakpoints } from 'stimulus-use'

export default class extends Controller {
  static targets = ['breakpoint', 'counter']
  static values = { counter: Number }

  connect() {
    useBreakpoints(this)
    this.counterValue = 0
  }

  breakpointChanged({ breakpoint, previousBreakpoint, width }) {
    this.counterValue += 1
  }

  breakpointXS({ previousBreakpoint }) {
    this.breakpointTarget.textContent = `xs (from ${previousBreakpoint})`
  }

  breakpointSM({ previousBreakpoint }) {
    this.breakpointTarget.textContent = `sm (from ${previousBreakpoint})`
  }

  breakpointMD({ previousBreakpoint }) {
    this.breakpointTarget.textContent = `md (from ${previousBreakpoint})`
  }

  breakpointLG({ previousBreakpoint }) {
    this.breakpointTarget.textContent = `lg (from ${previousBreakpoint})`
  }

  breakpointXL({ previousBreakpoint }) {
    this.breakpointTarget.textContent = `xl (from ${previousBreakpoint})`
  }

  breakpointXXL({ previousBreakpoint }) {
    this.breakpointTarget.textContent = `xxl (from ${previousBreakpoint})`
  }

  breakpoint2XL({ previousBreakpoint }) {
    this.breakpointTarget.textContent = `2xl (from ${previousBreakpoint})`
  }

  counterValueChanged() {
    this.counterTarget.textContent = this.counterValue
  }
}
