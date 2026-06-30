# useLazyLoad

`useLazyLoad` lazily loads an image once it scrolls into the viewport.

It is built on top of the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). The controller element is expected to be an `<img>` whose real source is provided through a `data-[identifier]-src` attribute. The image is only fetched and assigned to the `src` attribute once the element becomes visible.

It adds two new behaviors to your Stimulus controller:

- `loading(src)` triggered when the image starts loading.
- `loaded(src)` triggered when the image has finished loading.

## Reference

```javascript
useLazyLoad(controller, options)
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** : an optional [`IntersectionObserverInit`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#parameters) object (`root`, `rootMargin`, `threshold`). When extending `LazyLoadController` the default is `{ rootMargin: '10%' }`.

**returns** : `[observe, unobserve]`, the two functions used to start and stop observing the element.

This module also adds the following readable state properties to your controller:

| Property | Description |
|-----------|-------------|
| `isLoading` | `true` while the image is being fetched. |
| `isLoaded` | `true` once the image has finished loading. |

## Usage

The controller element must be an `<img>` tag and the image URL must be passed via the `data-[identifier]-src` attribute (it is read through Stimulus' `data.get('src')`). If the attribute is missing, nothing happens.

```html
<img data-controller="image" data-image-src="https://example.com/photo.jpg" alt="A lazily loaded photo">
```

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useLazyLoad } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useLazyLoad(this, { rootMargin: '10%' })
  }

  loading(src) {
    // triggered when the image starts loading
  }

  loaded(src) {
    // triggered when the image has finished loading
  }
}
```

**Extending a controller**

```js
import { LazyLoadController } from 'stimulus-use'

export default class extends LazyLoadController {
  loading(src) {
    // triggered when the image starts loading
  }

  loaded(src) {
    // triggered when the image has finished loading
  }
}
```
