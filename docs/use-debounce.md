# useDebounce

`useDebounce` adds the ability to specify an array "debounces" of functions to debounce.

All you need to do is to add a static array of function names `debounces`, as you would define your `targets`. Then call `useDebounce(this)` in your `connect()` callback and your functions are debounced.

## Reference

```javascript
useDebounce(controller, options = {})
```

**controller:** A Stimulus Controller (usually `'this'`)

**options:**

| Option| Description | Default value |
|-----------------------|-------------|---------------------|
| `wait` | The number of milliseconds to wait | `200` |

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

## Per function wait option

If you need to set a different wait option for each function, you can specify it within the `debounces` array like so :

```js
export default class extends ApplicationController {
  static debounces = [
    'click',
    {
      name: 'fetch',
      wait: 500
    }
  ]

  connect() {
    useDebounce(this, { wait: 100 })
  }

  click() {
    // this function is debounced with a wait time of 100ms.
  }

  fetch() {
    // this function is debounced with a wait time of 500ms.
  }

  instant() {
    //this function is not debounced.
  }
}
```
