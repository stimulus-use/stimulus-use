# useResize

Adds one new behavior to your Stimulus controller : `resize`

This behavior is built on top of the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Reference

```javascript
useResize(controller, options = {})
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Default value&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
|-----------------------|-------------|---------------------|
| `dispatchEvent` | Whether to dispatch a `resize` event or not.| `true` |
| `element` | The root element being obsered for resize.| The controller element|
|`eventPrefix`| Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `card:resize` <br>- **someString** prefix the event with the given string `someString:resize` <br>- **false** to remove prefix  |true|


## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useResize } from 'stimulus-use'

export default class extends Controller {
  static targets = ['width']

  connect() {
    useResize(this)
  }

  resize({ width }) {
    this.widthTarget.textContent = width
  }
}
```

**Extending a controller**

```js
import { ResizeController } from 'stimulus-use'

export default class extends ResizeController {
  static targets = ['width']

  resize({ width }) {
    this.widthTarget.textContent = width
  }
}
```

## Polyfill

ResizeObserver is quite widely supported by modern browsers [can I use](https://caniuse.com/#feat=resizeobserver).
To support older browsers such as IE11 you need a polyfill.

https://github.com/juggle/resize-observer
