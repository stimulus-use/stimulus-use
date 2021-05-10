type BreakpointDefinitions = Record<string, number>

const bootstrapBreakpoints: BreakpointDefinitions = {
  'xs': 0,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200,
  'xxl': 1400
}

const tailwindBreakpoints: BreakpointDefinitions = {
  'xs': 0,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
}

let defaultBreakpoints: BreakpointDefinitions = bootstrapBreakpoints;

const setBreakpoints = (breakpoints: BreakpointDefinitions) => {
  defaultBreakpoints = breakpoints
}

export default {
  bootstrap: bootstrapBreakpoints,
  tailwind: tailwindBreakpoints,
  get default(): BreakpointDefinitions {
    return defaultBreakpoints
  },
  set default(breakpoints: BreakpointDefinitions) {
    setBreakpoints(breakpoints)
  }
}
