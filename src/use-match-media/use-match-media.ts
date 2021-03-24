import { Controller } from 'stimulus'
import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import { camelize } from '../support/index'

type MediaQueryDefinitions = Record<string, string>

export interface MatchMediaPayload {
  name: string
  media: string
  matches: boolean
  originalEvent?: MediaQueryListEvent
}

export interface MatchMediaOptions extends StimulusUseOptions {
  mediaQueries?: MediaQueryDefinitions
}

const defaultOptions = {
  mediaQueries: {},
  dispatchEvent: false,
  eventPrefix: false,
  debug: false
}

export class UseMatchMedia extends StimulusUse {
  mediaQueries: MediaQueryDefinitions
  matches: Array<MediaQueryList> = []

  constructor(controller: Controller, options: MatchMediaOptions = {}) {
    super(controller, options)

    this.mediaQueries = options.mediaQueries ?? defaultOptions.mediaQueries
    this.dispatchEvent = options.dispatchEvent ?? defaultOptions.dispatchEvent
    this.eventPrefix = options.eventPrefix ?? defaultOptions.eventPrefix
    this.debug = options.debug ?? defaultOptions.debug

    if (!window.matchMedia) {
      console.error('window.matchMedia() is not available')
      return
    }

    this.enhanceController()
    this.observe()
  }

  callback = (event: MediaQueryListEvent) => {
    const name = Object.keys(this.mediaQueries).find(name => this.mediaQueries[name] === event.media)
    if (!name) return

    const { media, matches } = event
    this.changed({ name, media, matches, originalEvent: event })
  }

  changed = (payload: MatchMediaPayload) => {
    const { name } = payload

    if (payload.originalEvent) {
      this.call(camelize(`${name}_changed`), payload)
      this.dispatch('changed', payload)
      this.log(`media query "${name}" changed`, payload)
    }

    if (payload.matches) {
      this.call(camelize(`is_${name}`), payload)
      this.dispatch(`is:${name}`, payload)
    } else {
      this.call(camelize(`not_${name}`), payload)
      this.dispatch(`not:${name}`, payload)
    }
  }

  observe = () => {
    Object.keys(this.mediaQueries).forEach(name => {
      const media = this.mediaQueries[name]
      const match = window.matchMedia(media)

      match.addListener(this.callback)
      this.matches.push(match)

      this.changed({ name, media, matches: match.matches })
    })
  }

  unobserve = () => {
    this.matches.forEach(match => match.removeListener(this.callback))
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

export const useMatchMedia = (controller: Controller, options: MatchMediaOptions = {}) => {
  const observer = new UseMatchMedia(controller, options)
  return [observer.observe, observer.unobserve] as const
}
