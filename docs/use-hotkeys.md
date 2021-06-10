# useHotkeys

Adds one new behavior to your Stimulus controller : `useHotkeys`

This behavior can be used to register hotkeys using the [hotkeys-js](https://wangchujiang.com/hotkeys/) library. To use it, do the following:

1. Install the hotkeys-js peer dependency:

```bash
$ yarn add hotkeys-js
```

2. Define hotkeys and respective handlers and pass them as an argument to `useHotkeys`.

## Reference

```javascript
useHotkeys(controller)
```

**controller** : a Stimulus Controller (usually `'this'`)

## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useHotkeys } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useHotkeys(this, {
      hotkeys: {
        '/': {
          handler: this.singleKeyHandler.bind(this)
        },
        'cmd+a': {
          handler: this.metaKeyHandler.bind(this)
        },
        f: {
          handler: this.scopeHandler.bind(this),
          options: {
            scope: 'files'
          }
        },
        b: {
          handler: this.inputHandler.bind(this)
        },
        c: {
          handler: this.keyUpHandler.bind(this),
          options: {
            keydown: false,
            keyup: true
          }
        },
        'ctrl-d': {
          handler: this.splitKeyHandler.bind(this),
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
