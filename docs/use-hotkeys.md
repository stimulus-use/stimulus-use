# useHotkeys

The `useHotkeys` behavior can be used to register hotkeys using the [hotkeys-js](https://wangchujiang.com/hotkeys-js/) library. To use it, do the following:

1. Install the `hotkeys-js` peer dependency:

```bash
yarn add hotkeys-js
```

```bash
bin/importmap pin stimulus-use/hotkeys
bin/importmap pin hotkeys-js
```

2. Define hotkeys and respective handlers and pass them as an argument to `useHotkeys`.

## Importing the behavior

>[!WARNING] Note
> `stimulus-use` version `0.52.0` changed the way how this behavior needs to be imported in your application.

```diff
- import { useHotkeys } from "stimulus-use"
+ import { useHotkeys } from "stimulus-use/hotkeys"
```

**Also, please add `hotkeys-js` as a npm dependency to your application if you haven't added it yet, version `0.52.0` removed it as a dependency.**

## Reference

```javascript
useHotkeys(controller, options)
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** : Hotkey definitions, in simple or advanced format (see examples below)

*simple:*

```typescript
{ [hotkey: string]: [handler: KeyHandler, element: HTMLElement] }
```

*advanced:*
```typescript
{
  hotkeys?: {
    [hotkey: string]: {
      handler: Keyhandler
      options: {
        scope?: string
        element?: HTMLElement
        keyup?: boolean
        keydown?: boolean
        splitKey?: string
      }
    }
  }
  filter?: (e: KeyboardEvent) => boolean
}
```

## Usage

### Simple Hotkey Definition
```js
import { Controller } from '@hotwired/stimulus'
import { useHotkeys } from 'stimulus-use/hotkeys'

export default class extends Controller {
  connect() {
    useHotkeys(this, {
      '/': [this.singleKeyHandler],
      'cmd+a': [this.metaKeyHandler],
      b: [this.inputHandler],
      e: [this.inputHandler, this.inputTarget]
    })
  }
}
```


### Advanced Hotkey Definition
```js
import { Controller } from '@hotwired/stimulus'
import { useHotkeys } from 'stimulus-use/hotkeys'

export default class extends Controller {
  connect() {
    useHotkeys(this, {
      hotkeys: {
        '/': {
          handler: this.singleKeyHandler
        },
        'cmd+a': {
          handler: this.metaKeyHandler
        },
        f: {
          handler: this.scopeHandler,
          options: {
            scope: 'files'
          }
        },
        b: {
          handler: this.inputHandler
        },
        c: {
          handler: this.keyUpHandler,
          options: {
            keydown: false,
            keyup: true
          }
        },
        'ctrl-d': {
          handler: this.splitKeyHandler,
          options: {
            splitKey: '-'
          }
        }
      },
      filter: this.filter
    })
  }

  singleKeyHandler(e) {
    // ...
  }
}
```
