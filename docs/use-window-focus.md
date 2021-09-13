# useWindowFocus

`useWindowFocus` tracks if the window is focused or not.

Adds two new behaviors to your Stimulus controller: `focus` and `unfocus`.

## Reference

```javascript
useWindowFocus(controller, options)
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Default value&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
|-----------------------|-------------|---------------------|
| `dispatchEvent` | Whether to dispatch a `window-focus:focus` event or not.| `true` |
|`eventPrefix`| Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `application:visible` <br>- **someString** prefix the event with the given string `someString:invisible` <br>- **false** to remove prefix  |true|
| `debug` | Whether to log debug information. See [debug](debug.md) for more information on the debugging tools|false|
| `interval` | The interval in ms to check if the window is focused or not. | `200` |

**Example :**

A typical use case would be to pause a video when the user navigate tabs. While [`use-visibility`](use-visibility.md) just checks if the window might be visible `useWindowFocus` actually checks if the window is focused or not.

```js
// video_controller.js

export default class extends Controller {
  connect() {
    useWindowFocus(this)
    this.player = new VideoPlayer()
  }

  focus() {
    this.player.play()
  }

  unfocus() {
    this.player.pause()
  }
}
```

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useWindowFocus } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useWindowFocus(this)
  }

  focus() {
    // triggered when the window is focused
  }

  unfocus() {
    // triggered when the window is unfocused
  }
}
```

**Extending a controller**

```js
import { WindowFocusController } from 'stimulus-use'

export default class extends WindowFocusController {
  focus() {
    // triggered when the window is focused
  }

  unfocus() {
    // triggered when the window is unfocused
  }
}
```

## Events

This module adds two new events `focus` and `unfocus` (prefixed by the controller identifier by default) event that you may use to triggers Stimulus actions.

```html
<div class="player" data-controller="player" data-action="focus@document->player#play unfocus@document->player#pause">
  ...
</div>
```

```js
// application_controller.js

export default class extends Controller {
  connect() {
    useWindowFocus(this, { eventPrefix: false })
  }
}
```
