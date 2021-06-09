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
          handler: 'singleKeyHandler'
        },
        'cmd+a': {
          handler: 'metaKeyHandler'
        },
        f: {
          handler: 'scopeHandler',
          options: {
            scope: 'files'
          }
        },
        b: {
          handler: 'inputHandler'
        },
        c: {
          handler: 'keyUpHandler',
          options: {
            keydown: false,
            keyup: true
          }
        },
        'ctrl-d': {
          handler: 'splitKeyHandler',
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
