# useHotkeys

Adds one new behavior to your Stimulus controller : `hotkeysmemo`

This behavior can be used to register hotkeys using the [hotkeys-js](https://wangchujiang.com/hotkeys/) library. To use it, do the following:

1. Install the hotkeys-js peer dependency:

```bash
$ yarn add hotkeys-js
```

2. Define hotkeys and respective handlers in a static `hotkeys` object.

## Reference

```javascript
bindHotkeys(controller)
unbindHotkeys(controller)
```

**controller** : a Stimulus Controller (usually `'this'`)

## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { bindHotkeys, unbindHotkeys } from 'stimulus-use'

export default class extends Controller {
  static hotkeys = {'cmd+a': 'handler'}

  connect() {
    bindHotkeys(this)
  }

  disconnect() {
    unbindHotkeys(this)
  }

  handler(e) {
    // ...
  }
}
```
