# useClickOutside

Adds one new `clickOutside` behavior to your Stimulus controller as well as a new `click:outside` event when ever a click is received outside of the controller element.

## Reference

```typescript
useClickOutside(controller: Controller, options?: ClickOutsideOptions)
```

- `controller` : a Stimulus Controller (usually `'this'`)
- `options` (optional)
  - `element` : the root element listening for outside click. By default it is the controller element.

**Example :**
```js
connect() {
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

This module adds a new `click:outside` event that you may use to triggers stimulus actions

```html
<div class="modal" data-controller="modal" data-action="click:outside->modal#close" >
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
