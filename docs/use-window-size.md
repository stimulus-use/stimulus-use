# useWindowSize

Adds one new behavior to your Stimulus controller : `resize`

This behavior is built on top of the `resize` event on the `window` object.

## Reference

```javascript
useWindowSize(controller)
```

**controller** : a Stimulus Controller (usually `'this'`)

## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useWindowSize } from 'stimulus-use'

export default class extends Controller {
  static targets = ['width']

  connect() {
    useWindowSize(this)
  }

  resize({ width, height, event }) {
    this.widthTarget.textContent = width
  }
}

```

**Extending a controller**

```js
import { ResizeController } from 'stimulus-use'

export default class extends WindowSizeController {
  static targets = ['width']

  resize({ width, height, event }) {
    this.widthTarget.textContent = width
  }
}
```
