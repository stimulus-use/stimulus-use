# useDebounce

`useDebounce` adds the ability to pecify an array "debouces" of function to debounce.

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