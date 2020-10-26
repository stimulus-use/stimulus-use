# useThrottle

`useThrottle` adds the ability to specify an array "throttles" of functions to throttle.

All you need to do is to add a static array of function names `throttles`, as you would define your `targets`. Then call `useThrottle(this)` in your `connect()` callback and your functions are throttled.

## Reference

```javascript
useThrottle(controller, options = {})
```

**controller:** A Stimulus Controller (usually `'this'`)

**options:**

| Option| Description | Default value |
|-----------------------|-------------|---------------------|
| `wait` | The number of milliseconds to wait | `200` |

**Example:**

```js
import { ApplicationController, useThrottle } from 'stimulus-use'

export default class extends ApplicationController {
  static throttles = ['add']

  connect() {
    useThrottle(this, { wait: 100 })
  }

  add() {
    // this function is throttled.
  }

  instant() {
    //this function is not throttled.
  }
}
```