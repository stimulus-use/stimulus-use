# useBackgroundQueue

`useBackgroundQueue` adds the ability to specify an array of functions to be called during a browser's idle periods. Internally, it uses the [`window.requestIdleCallback()` APIs](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

All you need to do is to add a static array of function names `queue`, as you would define your `targets`. Then call `useBackgroundQueue(this)` in your `connect()` callback and your functions will be executed during a browser's idle periods. Functions are generally called in first-in-first-out order.

## Reference

```javascript
useBackgroundQueue(controller, options = {})
```

**controller:** A Stimulus Controller (usually `'this'`)

**options:**

| Option    | Description | Default value |
|-----------|-------------|---------------|
| `maxWait` | The number of milliseconds after which a task to execute the callback s queued in the event loop. See [parameters](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback#parameters) for more information. | `undefined` |

**Example:**

```js
import { ApplicationController, useBackgroundQueue } from 'stimulus-use'

export default class extends ApplicationController {
  static queue = ['load']

  connect() {
    useBackgroundQueue(this)
  }

  load() {
    // this function will be called during a browser's idle periods
  }
}
```

## Per function `maxWait` option

If you need to set a different wait option for each function, you can specify it within the `queue` array like so:

```js
export default class extends ApplicationController {
  static debounces = [
    'load',
    {
      name: 'activate',
      wait: 500
    }
  ]

  connect() {
    useBackgroundQueue(this, { maxWait: 100 })
  }

  load() {
    // this function will be called with a max wait time of 100ms.
  }

  activate() {
    // this function will be called with a max wait time of 500ms.
  }
}
```
