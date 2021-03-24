import { Controller } from 'stimulus'
import { StimulusUse, StimulusUseOptions } from '../stimulus-use'
import { camelize } from '../support/index'

type MediaQueryDefinitions = Record<string, string>

export interface MatchMediaPayload {
  name: string
  media: string
  matches: boolean
  originalEvent: Event
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

    this.enhanceController()
    this.observe()
  }

  callback = (event: MediaQueryListEvent) => {
    const query = Object.keys(this.mediaQueries).find(name => this.mediaQueries[name] === event.media)

    if (!query) return

    const payload: MatchMediaPayload = {
      name: query,
      media: event.media,
      matches: event.matches,
      originalEvent: event
    }

    this.call(camelize(`${query}_changed`), payload)
    this.dispatch('changed', payload)
    this.log(`media query "${query}" changed`, payload)

    if (payload.matches) {
      this.call(camelize(`is_${query}`), payload)
      this.dispatch(`is:${query}`, payload)
    } else {
      this.call(camelize(`not_${query}`), payload)
      this.dispatch(`not:${query}`, payload)
    }
  }

  observe = () => {
    const matches = this.matches
    Object.values(this.mediaQueries).forEach(query => {
      const match = window.matchMedia(query)
      match.addListener(this.callback)
      matches.push(match)

      // TODO: invoke initial callback
      // const event = new MediaQueryListEvent({ media: query, matches: match.matches })
      // this.callback(event)
    })
  }

  unobserve = () => {
    this.matches.forEach((match) => match.removeListener(this.callback))
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
