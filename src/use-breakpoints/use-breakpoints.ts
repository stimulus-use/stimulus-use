import { Controller } from 'stimulus'
import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import Breakpoints from './breakpoints'

export interface BreakpointsPayload {
  width: number
  breakpoint: string | undefined
  breakpointChanged: boolean
  event?: Event
}

export interface BreakpointsOptions extends StimulusUseOptions {
  breakpoints?: Record<string, number>
  callbackPrefix?: string
  changedCallbackName?: string
  callbackName?: Function
}

const defaultOptions = {
  breakpoints: Breakpoints.default,
  eventPrefix: true,
  callbackPrefix: 'breakpoint',
  changedCallbackName: 'breakpointChanged',
  callbackName: (prefix: string, breakpoint: string) => {
    return prefix + breakpoint.toUpperCase()
  }
}

export class UseBreakpoints extends StimulusUse {
  currentBreakpoint: string | undefined
  breakpoints: Record<string, number>
  eventPrefix: boolean | string
  callbackPrefix: string
  changedCallbackName: string
  callbackName: Function

  constructor(controller: Controller, options: BreakpointsOptions = {}) {
    super(controller, options)

    this.breakpoints = options.breakpoints ?? defaultOptions.breakpoints
    this.callbackPrefix = options.callbackPrefix ?? defaultOptions.callbackPrefix
    this.changedCallbackName = options.changedCallbackName ?? defaultOptions.changedCallbackName
    this.callbackName = options.callbackName ?? defaultOptions.callbackName
    this.eventPrefix = options.eventPrefix ?? defaultOptions.eventPrefix

    this.enhanceController()
    this.observe()
  }

  callback = (event?: Event) => {
    const { innerWidth } = window
    const width = innerWidth || Infinity

    let currentBreakpoint

    for (const breakpoint in this.breakpoints) {
      const breakpointValue = this.breakpoints[breakpoint]

      if (width >= breakpointValue) {
        currentBreakpoint = breakpoint
      }
    }

    const breakpointChanged = this.currentBreakpoint !== currentBreakpoint

    const payload: BreakpointsPayload = {
      width,
      breakpoint: currentBreakpoint,
      breakpointChanged,
      event
    }

    if (breakpointChanged) this.call(this.changedCallbackName, payload)
    if (currentBreakpoint) this.call(this.callbackName(this.callbackPrefix, currentBreakpoint), payload)

    this.currentBreakpoint = currentBreakpoint
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
