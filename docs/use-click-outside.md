# useClickOutside

Adds a `clickOutside` behavior to your Stimulus controller. Whenever a click (or touch) is received outside of the controller element, `useClickOutside` reacts in two independent ways:

- it calls the controller's **`clickOutside(event)` method**, if you have defined one, and
- it dispatches a **`click:outside` event** (prefixed with the controller identifier by default) that you can wire up to Stimulus actions, handy to notify _other_ controllers.

You can use either or both. The method is the simplest option when the controller reacts to its own outside clicks; the event is meant for communicating with other controllers.

## Reference

```javascript
useClickOutside(controller, options = {})
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Default value&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
|-----------------------|-------------|---------------------|
| `dispatchEvent` | Whether to dispatch a `click:outside` event or not.| `true` |
| `element` | The root element listening for outside click.| The controller element|
|`eventPrefix`| Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br/>- **true** prefix the event with the controller identifier `card:click:outside` <br/>- **someString** prefix the event with the given string `someString:click:outside` <br/>- **false** to remove prefix  |true|
| `events` | Array of events to listen on to detect if the user clicks outside of the component.| `['click', 'touchend']` |
| `onlyVisible` | Triggers click outside only to elements that are partially visible with in the viewport.| `true` |

**Example :**

```js
connect() {
  // passing a custom target as the root element.
  useClickOutside(this, { element: this.contentTarget })
}
```

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useClickOutside } from 'stimulus-use'

export default class extends Controller {

  connect() {
    useClickOutside(this)
  }

  clickOutside(event) {
    // example to close a modal
    event.preventDefault()
    this.modal.close()
  }
}
```

**Extending a controller**

```js
import { ClickOutsideController } from 'stimulus-use'

export default class extends ClickOutsideController {
  clickOutside(event) {
    // example to close a modal
    event.preventDefault()
    this.modal.close()
  }
}
```

## Controlling observation

`useClickOutside` returns an `[observe, unobserve]` tuple so you can start and stop listening for outside clicks manually. Observation starts automatically when the mixin is called and is cleaned up automatically when the controller disconnects. When extending `ClickOutsideController`, the same functions are available as `this.observe()` and `this.unobserve()`.

```js
connect() {
  const [observe, unobserve] = useClickOutside(this)
  // later: unobserve() to pause, observe() to resume
}
```

## Events

This module dispatches a `click:outside` event (prefixed by the controller identifier by default) that you may use to trigger Stimulus actions, typically to notify _another_ controller that a click happened outside this element.

```html
<div class="modal" data-controller="modal" data-action="modal:click:outside->modal#close" >
  ...
</div>
```

```js
// modal_controller.js
export default class extends Controller {
  connect() {
    useClickOutside(this)
  }

  close(event) {
    event.preventDefault()
    this.modal.close()
  }
}
```

### Where to place the `data-action`

The event is dispatched **on the controller's root element** (or on the element passed via the `element` option) and bubbles **up** the DOM. This means the `data-action` must live on that same root element, as in the example above, or on an ancestor. It will **not** reach descendant elements.

🚫 This does not work, because the event bubbles up and never reaches the inner element:

```html
<div data-controller="header-menu">
  <span data-action="header-menu:click:outside->header-menu#close"></span>
</div>
```

✅ If you need to listen from an element that is not the controller root (a nested element, or an entirely different controller), bind the action at the document or window level with `@document` / `@window`:

```html
<div data-controller="header-menu">
  <span data-action="header-menu:click:outside@document->header-menu#close"></span>
</div>
```

If the controller only needs to react to its _own_ outside clicks, you usually don't need the event at all, just define a `clickOutside(event)` method (see [Usage](#usage) above), which is always called regardless of where any `data-action` is placed.
