# useIdle

`useIdle` tracks if the user is idle on the page.

Adds two new behaviors to your Stimulus controller: `away` and `back`.


## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useIdle } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIdle(this)
  }

  away() {
    alert('Hey, wake up!')
  }

  back() {
    alert('Welcome back!')
  }
}
```

**Extending a controller**

```js
import { IdleController } from 'stimulus-use'

export default class extends IdleController {
  away() {
    alert('Hey, wake up!')
  }

  back() {
    alert('Welcome back!')
  }
}
```


**Options**

The available options and their default values are listed below:

| Option| Description | Default value |
|-----------------------|-------------|---------------------|
| `ms` | Time in milliseconds after which to consider the user idle |`60e3` which translates to `60000` (one minute) |
| `initialState` | Whether to consider the user initially idle | `false` |
| `events` | Array of events to listen on to detect if the user is "active" on the page. | `['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']` |


If you don't want to use the defaults you can call `useIdle` like this:

```js
import { Controller } from 'stimulus'
import { useIdle } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIdle(this, 3000, true, ['click']);
  }

  // ...
}

```
