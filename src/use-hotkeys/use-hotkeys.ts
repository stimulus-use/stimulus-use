import { Controller } from '@hotwired/stimulus'
import hotkeys, { KeyHandler, HotkeysEvent } from 'hotkeys-js'
import { StimulusUse, StimulusUseOptions } from '../stimulus-use'

// from https://github.com/jaywcjlove/hotkeys/blob/0a8c8bc1d6579e6d89a735d3573239fcf138b0e6/index.d.ts#L13-L20
type Options = {
  scope?: string
  element?: HTMLElement | null
  keyup?: boolean | null
  keydown?: boolean | null
  splitKey?: string
}

type HotkeyDefinition = {
  handler: KeyHandler
  options: Options
}

type SimpleHotkeyDefinition = (KeyHandler | HTMLElement)[]

export interface HotkeyDefinitions {
  [hotkey: string]: HotkeyDefinition | SimpleHotkeyDefinition
}

export interface HotkeysOptions extends StimulusUseOptions {
  hotkeys?: HotkeyDefinitions
  filter?: (e: KeyboardEvent) => boolean
}

export class UseHotkeys extends StimulusUse {
  controller: Controller
  hotkeysOptions: HotkeysOptions
  registrations: { hotkey: string; scope: string; callback: KeyHandler }[] = []

  constructor(controller: Controller, hotkeysOptions: HotkeysOptions) {
    super(controller, hotkeysOptions)
    this.controller = controller
    this.hotkeysOptions = hotkeysOptions
    this.enhanceController()
    this.bind()
  }

  bind = () => {
    for (const [hotkey, definition] of Object.entries(this.hotkeysOptions.hotkeys as any)) {
      const options = (definition as HotkeyDefinition).options
      const handler = (definition as HotkeyDefinition).handler.bind(this.controller)
      const callback = (e: KeyboardEvent, hotkeysEvent: HotkeysEvent) => handler(e, hotkeysEvent)

      hotkeys(hotkey, options, callback)
      this.registrations.push({ hotkey, scope: options?.scope || 'all', callback })
    }
  }

  unbind = () => {
    this.registrations.forEach(({ hotkey, scope, callback }) => hotkeys.unbind(hotkey, scope, callback))
    this.registrations = []
  }

  private enhanceController() {
    if (this.hotkeysOptions.filter) {
      hotkeys.filter = this.hotkeysOptions.filter
    }

    const controllerDisconnect = this.controller.disconnect.bind(this.controller)

    const disconnect = () => {
      this.unbind()
      controllerDisconnect()
    }

    Object.assign(this.controller, { disconnect })
  }
}

const convertSimpleHotkeyDefinition = (definition: SimpleHotkeyDefinition): HotkeyDefinition => {
  return {
    handler: definition[0] as KeyHandler,
    options: {
      element: definition[1] as HTMLElement
    }
  }
}

const coerceOptions = (options: HotkeysOptions | HotkeyDefinitions): HotkeysOptions => {
  if (!options.hotkeys) {
    const hotkeys = {}
    const { filter, ...definitions } = options as HotkeysOptions

    Object.entries(definitions as HotkeyDefinitions).forEach(([hotkey, definition]) => {
      Object.defineProperty(hotkeys, hotkey, {
        value: convertSimpleHotkeyDefinition(definition as SimpleHotkeyDefinition),
        writable: false,
        enumerable: true
      })
    })

    options = {
      hotkeys,
      filter
    }
  }

  return options
}

export const useHotkeys = (controller: Controller, options: HotkeysOptions | HotkeyDefinitions) => {
  return new UseHotkeys(controller, coerceOptions(options))
}
