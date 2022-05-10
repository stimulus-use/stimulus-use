# useIdle

`useIdle` tracks if the user is idle on the page.

Adds two new behaviors to your Stimulus controller: `away` and `back`.

## Reference

```javascript
useIdle(controller, options = {})
```

**controller:** A Stimulus Controller (usually `'this'`)

**options:**


| Option| Description | Default value |
|-----------------------|-------------|---------------------|
| `ms` | Time in milliseconds after which to consider the user idle |`60e3` which translates to `60000` (one minute) |
| `initialState` | Whether to consider the user initially idle | `false` |
| `events` | Array of events to listen on to detect if the user is "active" on the page. | `['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']` |
| `dispatchEvent` | Whether to dispatch `away` and `back` events. | `true` |
|`eventPrefix`| Whether to prefix the name of the dispatched events. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `user:away` <br>- **someString** prefix the event with the given string `someString:away` <br>- **false** to remove prefix  | `true` |

**Basic Example:**

```js
connect() {
  useIdle(this, { ms: 3000 });
}
```
**Example with all options:**

```js
connect() {
  useIdle(this, { ms: 3000, initialState: true, events: ['click'], dispatchEvent: false, eventPrefix: false });
}
```

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useIdle } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIdle(this)
  }

  away(event) {
    alert('Hey, wake up!')
  }

  back(event) {
    alert('Welcome back!')
  }
}
```

**Extending a controller**

```js
import { IdleController } from 'stimulus-use'

export default class extends IdleController {
  away(event) {
    alert('Hey, wake up!')
  }

  back(event) {
    alert('Welcome back!')
  }
}
```


## Events

This module adds `away` and `back` events that you may use to trigger stimulus actions

```html
<div data-controller="user" data-action="user:away->user#logout">
   ...
</div>
 ```


```js
// user_controller.js

export default class extends Controller {

  connect() {
    useIdle(this)
  }

  logout(event) {
    event.preventDefault()
    // do some actions to logout the user
  }
}
```
