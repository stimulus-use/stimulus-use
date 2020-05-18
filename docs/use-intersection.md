# useIntersection

Adds 2 new behaviors to your Stimulus controller : `appear` and `disappear`.

This behavior is built on top of the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)


## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useIntersection } from 'stimulus-use'

export default class extends Controller {
  options = {
    threshold: 0, // default
  }

  connect() {
    useIntersection(this, this.options)
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
    threshold: 0, // default
  }

  appear(entry) {
    // ...
  }

  disappear(entry) {
    // ...
  }
}
```

## Options

The options object passed into the IntersectionObserver() constructor let you control the circumstances under which the observer's callback is invoked. It has the following fields:

**root**

The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.

**rootMargin**

Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.

**threshold**

Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.


## Polyfill

**Availability:**

https://caniuse.com/#feat=intersectionobserver

**Exisiting polyfill:**

https://github.com/w3c/IntersectionObserver/tree/master/polyfill