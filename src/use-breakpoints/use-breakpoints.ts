import { Controller } from 'stimulus'
import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import Breakpoints from './breakpoints'

export interface BreakpointsPayload {
  breakpoint: string | undefined
  width: number
  originalEvent: Event | undefined
}

export interface BreakpointsOptions extends StimulusUseOptions {
  breakpoints?: Record<string, number>
  callbackPrefix?: string
  changedCallbackName?: string
  callbackName?: Function
  minWidth?: boolean
}

const defaultOptions = {
  breakpoints: Breakpoints.default,
  callbackPrefix: 'breakpoint',
  changedCallbackName: 'breakpointChanged',
  minWidth: true,
  callbackName: (prefix: string, breakpoint: string) => {
    return prefix + breakpoint.toUpperCase()
  },
  eventPrefix: 'breakpoint',
  debug: true
}

export class UseBreakpoints extends StimulusUse {
  currentBreakpoint: string | undefined
  breakpoints: Record<string, number>
  callbackPrefix: string
  changedCallbackName: string
  callbackName: Function
  minWidth: boolean

  constructor(controller: Controller, options: BreakpointsOptions = {}) {
    super(controller, options)

    this.breakpoints = options.breakpoints ?? defaultOptions.breakpoints
    this.callbackPrefix = options.callbackPrefix ?? defaultOptions.callbackPrefix
    this.changedCallbackName = options.changedCallbackName ?? defaultOptions.changedCallbackName
    this.callbackName = options.callbackName ?? defaultOptions.callbackName
    this.eventPrefix = options.eventPrefix ?? defaultOptions.eventPrefix
    this.debug = options.debug ?? defaultOptions.debug
    this.minWidth = options.minWidth ?? defaultOptions.minWidth

    this.enhanceController()
    this.observe()
  }

  callback = (event?: Event) => {
    const { innerWidth } = window
    const width = innerWidth || Infinity

    let currentBreakpoint
    let currentBreakpointValue

    for (const breakpoint in this.breakpoints) {
      const breakpointValue = this.breakpoints[breakpoint]

      if (this.minWidth) {
        if (!currentBreakpointValue) currentBreakpointValue = 0

        if (width >= breakpointValue && breakpointValue >= currentBreakpointValue) {
          currentBreakpoint = breakpoint
          currentBreakpointValue = breakpointValue
        }
      } else {
        if (!currentBreakpointValue) currentBreakpointValue = Infinity

        if (width < breakpointValue && breakpointValue < currentBreakpointValue) {
          currentBreakpoint = breakpoint
          currentBreakpointValue = breakpointValue
        }
      }
    }

    const breakpointChanged = this.currentBreakpoint !== currentBreakpoint

    this.currentBreakpoint = currentBreakpoint

    const payload: BreakpointsPayload = {
      width,
      breakpoint: currentBreakpoint,
      originalEvent: event || undefined
    }

    if (breakpointChanged) this.breakpointChanged(payload)
  }

  breakpointChanged (payload: BreakpointsPayload) {
    this.call(this.changedCallbackName, payload)

    this.log("breakpoint changed", payload)
    this.dispatch("changed", payload)

    if (this.currentBreakpoint) {
      this.call(this.callbackName(this.callbackPrefix, this.currentBreakpoint), payload)

      this.log("breakpoint " + this.currentBreakpoint, payload)
      this.dispatch(this.currentBreakpoint.toLowerCase(), payload)
    }
  }

  observe = () => {
    window.addEventListener('resize', this.callback)
    this.callback()
  }

  unobserve = () => {
    window.removeEventListener('resize', this.callback)
  }

  private enhanceController() {
    const controllerDisconnect = this.controller.disconnect.bind(this.controller)

    const disconnect = () => {
      this.unobserve()
      controllerDisconnect()
    }

    Object.assign(this.controller, { disconnect })
  }
}

export const useBreakpoints = (controller: Controller, options: BreakpointsOptions = {}) => {
  const observer = new UseBreakpoints(controller, options)
  return [observer.observe, observer.unobserve] as const
}
