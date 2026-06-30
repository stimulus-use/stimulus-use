# useWindowResize

Adds one new behavior to your Stimulus controller : `windowResize`

This behavior is built on top of the `resize` event on the `window` object.

## Reference

```javascript
useWindowResize(controller)
```

**controller** : a Stimulus Controller (usually `'this'`)

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useWindowResize } from 'stimulus-use'

export default class extends Controller {
  static targets = ['width']

  connect() {
    useWindowResize(this)
  }

  windowResize({ width, height, event }) {
    this.widthTarget.textContent = width
  }
}

```

**Extending a controller**

```js
import { WindowResizeController } from 'stimulus-use'

export default class extends WindowResizeController {
  static targets = ['width']

  windowResize({ width, height, event }) {
    this.widthTarget.textContent = width
  }
}
```

## Controlling observation

`useWindowResize` returns an `[observe, unobserve]` tuple so you can start and stop observing manually. Observation starts automatically when the mixin is called and is cleaned up automatically when the controller disconnects. When extending `WindowResizeController`, the same functions are available as `this.observe()` and `this.unobserve()`.

```js
connect() {
  const [observe, unobserve] = useWindowResize(this)
  // later: unobserve() to pause, observe() to resume
}
```
