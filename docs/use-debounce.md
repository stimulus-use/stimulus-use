# useDebounce

`useDebounce` adds the ability to specify an array "debounces" of functions to debounce.

All you need to do is to add a static array of function names `debounces`, as you would define your `targets`. Then call `useDebounce(this)` in your `connect()` callback and your functions are debounced.

## Reference

```javascript
useDebounce(controller, options = {})
```

**controller:** A Stimulus Controller (usually `'this'`)

**options:**

| Option     | Description                                                                        | Default value |
|------------|------------------------------------------------------------------------------------|---------------|
| `wait`     | The number of milliseconds to wait                                                 | `200`         |
| `leading`  | Whether your function is called on the leading edge of the timeout (immediately)   | `false`       |
| `trailing` | Whether your function is called on the trailing edge of the timeout (after `wait`) | `true`        |

By default a debounced function runs only on the trailing edge (`leading: false`, `trailing: true`). Set `leading: true` to also run it immediately, or use `{ leading: true, trailing: false }` for a leading-edge-only debounce. If both `leading` and `trailing` are `false`, the function is never called.

**Example:**

```js
import { ApplicationController, useDebounce } from 'stimulus-use'

export default class extends ApplicationController {
  static debounces = ['add']

  connect() {
    useDebounce(this)
  }

  add() {
    // this function is debounced.
  }

  instant() {
    //this function is not debounced.
  }
}
```

## Per function options

If you need to set a different wait or leading edge option for each function, you can specify it within the `debounces` array like so :

```js
export default class extends ApplicationController {
  static debounces = [
    'click',
    {
      name: 'fetch',
      wait: 500
    },
    {
      name: 'duplicate',
      leading: true
    },
    {
      name: 'search',
      leading: true,
      trailing: false
    }
  ]

  connect() {
    useDebounce(this, { wait: 100 })
  }

  click() {
    // this function is debounced only on the trailing edge with a wait time of 100ms.
  }

  fetch() {
    // this function is debounced only on the trailing edge with a wait time of 500ms.
  }

  duplicate() {
    // this function is debounced on both the leading and trailing edges with a wait time of 100ms.
  }

  search() {
    // this function is debounced on the leading edge only (runs immediately, no trailing call) with a wait time of 100ms.
  }

  instant() {
    //this function is not debounced.
  }
}
```
