# useIntersection

Adds 2 new behaviors to your Stimulus controller : `appear` and `disappear`.

This behavior is built on top of the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## Reference

```javascript
useIntersection(controller, options = {})
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default&nbsp;value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|-----------------------|-------------|---------------------|
| `dispatchEvent` | Whether to dispatch `appear`, `disappear` events or not. | `true` |
| `element` | The root element listening to intersection events. | The controller element|
|`eventPrefix`| Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `card:appear` <br>- **someString** prefix the event with the given string `someString:appear` <br>- **false** to remove prefix  |true|
| `visibleAttribute` | The name of the attribute which gets added to the tracked element when the element is visible | `isVisible` |

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useIntersection } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIntersection(this)
  }

  appear(entry) {
    // callback automatically triggered when the element
    // intersects with the viewport (or root Element specified in the options)
  }

  disappear(entry) {
    // callback automatically triggered when the element
    // leaves the viewport (or root Element specified in the options)
  }
}
```

**Extending a controller**

```js
import { IntersectionController } from 'stimulus-use'

export default class extends IntersectionController {
  options = {
    element: this.element, // default
  }

  appear(entry) {
    // ...
  }

  disappear(entry) {
    // ...
  }
}
```


## Events

This module adds two new events `appear` and `disapear` event that you may use to triggers Stimulus Actions.

For example, to count all visible elements on a page we could listen to individual appear/disappear events to update a counter

```js
import { Controller } from '@hotwired/stimulus'
import { useIntersection } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIntersection(this, { eventPrefix: false })
  }

  increase() { /* ... */ }
  decrease() { /* ... */ }
}
```

```html
<div
  class="modal"
  data-controller="counter"
  data-action="appear@window->counter#increase disappear@window->counter#decrease"
>
</div>
```

Since the `data-controller` and the `data-action` are on the same element you can even leave out the `@window` because you don't need to wait for the event to bubble up the DOM tree to the `window`. The event gets dispatched on the controller element (if not overridden by the `element` option).

```html
<div
  class="modal"
  data-controller="counter"
  data-action="appear->counter#increase disappear->counter#decrease"
>
</div>
```

### Event Details

Get the emitting controller and entry object for an appear event

```js
count(event) {
  const { controller, entry } = event.detail
}
```

## Helper functions

If you are tracking multiple events in your controller you might find these helper functions handy:

| Helper | Description |
| --- | --- |
| `this.isVisible()` / `this.allVisible()` | Returns `true` if **all** of the tracked elements are visible. |
| `this.noneVisible()` | Returns `true` if **none** of the tracked elements are visible. |
| `this.oneVisible()` | Returns `true` if **exactly one** of the tracked elements is visible. |
| `this.atLeastOneVisible()` | Returns `true` if **at least one** of the tracked elements is visible. |

### Using Helper functions

```js
import { Controller } from '@hotwired/stimulus'
import { useIntersection } from 'stimulus-use'

export default class extends Controller {
  static targets = [ 'menu' ]

  connect() {
    useIntersection(this)
  }

  appear() {
    if (this.atLeastOneVisible()) {
      this.menuTarget.show()
    }
  }

  disappear() {
    if (this.noneVisible()) {
      this.menuTarget.hide()
    }
  }
}
```

## Example

Rails Infinite scroll: https://github.com/adrienpoly/infinite-scroll-stimulus-js


## Polyfill

**Availability:**

https://caniuse.com/#feat=intersectionobserver

**Exisiting polyfill:**

https://github.com/w3c/IntersectionObserver/tree/master/polyfill
