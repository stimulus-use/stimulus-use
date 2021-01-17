# useClickOutside

Adds one new `clickOutside` behavior to your Stimulus controller as well as a new `click:outside` event when ever a click is received outside of the controller element.

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
|`eventPrefix`| Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `card:click:outside` <br>- **someString** prefix the event with the given string `someString:click:outside` <br>- **false** to remove prefix  |true|
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
import { Controller } from 'stimulus'
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

## Events

This module adds a new `click:outside` (prefixed by the controller identifier by default) event that you may use to triggers stimulus actions

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
