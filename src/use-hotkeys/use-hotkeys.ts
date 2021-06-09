import { Controller } from 'stimulus'
import hotkeys from 'hotkeys-js'

// from https://github.com/jaywcjlove/hotkeys/blob/master/index.d.ts
type Options = {
  scope?: string
  element?: HTMLElement | null
  keyup?: boolean | null
  keydown?: boolean | null
  splitKey?: string
}

type HotkeyDefinition = {
  handler: string
  options: Options
}

export interface HotkeyDefinitions {
  [hotkey: string]: HotkeyDefinition
}

export interface HotkeysOptions {
  hotkeys: HotkeyDefinitions
  filter?: (e: KeyboardEvent) => boolean
}

export const useHotkeys = (controller: Controller, hotkeysOptions: HotkeysOptions) => {
  if (hotkeysOptions.filter) {
    hotkeys.filter = hotkeysOptions.filter
  }

  for (const [hotkey, definition] of Object.entries(hotkeysOptions.hotkeys as any)) {
    hotkeys(hotkey, (definition as HotkeyDefinition).options, (e: KeyboardEvent) =>
      (controller as { [key: string]: any })[(definition as HotkeyDefinition).handler](e)
    )
  }
}
