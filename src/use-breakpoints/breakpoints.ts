const bootstrapBreakpoints: Record<string, number> = {
  'xs': 0,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200,
  'xxl': 1400
}

const tailwindBreakpoints: Record<string, number> = {
  'xs': 0,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
}

export default {
  default: bootstrapBreakpoints,
  bootstrap: bootstrapBreakpoints,
  tailwind: tailwindBreakpoints
}
