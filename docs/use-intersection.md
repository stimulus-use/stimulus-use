# useIntersection

Adds 2 new behaviors to your Stimulus controller: `appear` and `disappear`.

This behavior is built on top of the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## Reference

```javascript
useIntersection(controller, options = {})
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option | Description | Default&nbsp;value|
|-----------------------|-------------|---------------------|
| `dispatchEvent` | Whether to dispatch `appear`, `disappear` events or not. | `true` |
| `element` | The root element listening to intersection events. | The controller element|
|`eventPrefix`| Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `card:appear` <br>- **someString** prefix the event with the given string `someString:appear` <br>- **false** to remove prefix  |true|
| `visibleAttribute` | The name of the attribute which gets added to the tracked element when the element is visible | `isVisible` |


Additionally, the following options can also be passed to the `options` object. The following descriptions are from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#parameters):

If options isn't specified, the observer uses the document's viewport as the root, with no margin, and a 0% threshold (meaning that even a one-pixel change is enough to trigger a callback). You can provide any combination of the following options:

| Option | Description | Default&nbsp;value |
|-----------------------|-------------|---------------------|
| `root` | An Element or Document object which is an ancestor of the intended target, whose bounding rectangle will be considered the viewport. Any part of the target not visible in the visible area of the root is not considered visible. | document viewport |
| `rootMargin` | A string which specifies a set of offsets to add to the root's [`bounding_box`](https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box) when calculating intersections, effectively shrinking or growing the root for calculation purposes. The syntax is approximately the same as that for the CSS margin property; see [The intersection root and root margin](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#the_intersection_root_and_root_margin) for more information on how the margin works and the syntax. | `"0px 0px 0px 0px"` |
| `threshold` | Either a single number or an array of numbers between 0.0 and 1.0, specifying a ratio of intersection area to total bounding box area for the observed target. A value of 0.0 means that even a single visible pixel counts as the target being visible. 1.0 means that the entire target element is visible. See [Thresholds](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#thresholds) for a more in-depth description of how thresholds are used.  | ` 0.0` |

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useIntersection } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIntersection(this)
  }

  appear(entry, observer) {
    // callback automatically triggered when the element
    // intersects with the viewport (or root Element specified in the options)
  }

  disappear(entry, observer) {
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

  appear(entry, observer) {
    // ...
  }

  disappear(entry, observer) {
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
  const { controller, entry, observer } = event.detail
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

## Manually calling `observe()` and `unobserve()`

You can manually call `observe()` and `unobserve()` by obtaining references from the `useIntersection()` function call.

`useIntersection()` returns an array with two functions, the first one is the `observe()` and the second one is the `unobserve()` function.

```js
export default class extends Controller {
  connect() {
    const [observe, unobserve] = useIntersection(this)
    this.observe = observe
    this.unobserve = unobserve
  }

  appear() {
    // observe and emit `appear()` callback just once
    this.unobserve()
  }
}
```


## Accessing the `IntersectionObserver` instance

You have the freedom to perform more advanced operations on the observer directly, so you can customize the logic according to your needs. The `IntersectionObserver` instance gets passed in as the second argument to the `appear` and `disappear` callbacks.

```js
export default class extends Controller {
  connect() {
    useIntersection(this)
  }

  appear(entry, observer) {
    // observe and emit `appear()` callback just once
    observer.unobserve(entry.target)
  }
}
```

Alternatively, you can also access the `observer` from the event detail.

## Example

Rails Infinite scroll: https://github.com/adrienpoly/infinite-scroll-stimulus-js


## Polyfill

**Availability:**

https://caniuse.com/#feat=intersectionobserver

**Exisiting polyfill:**

https://github.com/w3c/IntersectionObserver/tree/master/polyfill
