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
| `box` | The [box model](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#box) the observation is based on. One of `content-box`, `border-box` or `device-pixel-content-box`. Use `border-box` to also be notified when padding or borders change.| `content-box` |
| `dispatchEvent` | Whether to dispatch a `resize` event or not.| `true` |
| `element` | The root element being observed for resize.| The controller element|
|`eventPrefix`| Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `card:resize` <br>- **someString** prefix the event with the given string `someString:resize` <br>- **false** to remove prefix  |true|


## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
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

## Controlling observation

`useResize` returns an `[observe, unobserve]` tuple so you can start and stop observing manually. Observation starts automatically when the mixin is called and is cleaned up automatically when the controller disconnects. When extending `ResizeController`, the same functions are available as `this.observe()` and `this.unobserve()`.

```js
connect() {
  const [observe, unobserve] = useResize(this)
  // later: unobserve() to pause, observe() to resume
}
```

## Events

This module dispatches a `resize` event whenever the observed element is resized (when the `dispatchEvent` option is `true`, which is the default). The event is prefixed by the controller identifier by default, e.g. `card:resize`. See [events](events.md) for more on the prefix behavior.

```html
<div data-controller="card" data-action="card:resize->card#resize">
  ...
</div>
```

The dispatched event carries the controller and the `ResizeObserverEntry` in its `detail`:

```js
resize(event) {
  const { controller, entry } = event.detail
}
```

## Polyfill

ResizeObserver is quite widely supported by modern browsers [can I use](https://caniuse.com/#feat=resizeobserver).
To support older browsers such as IE11 you need a polyfill.

https://github.com/juggle/resize-observer
