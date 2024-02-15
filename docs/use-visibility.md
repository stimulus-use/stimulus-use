# useVisibility

`useVisibility` tracks the visibility state of the page.

Adds two new behaviors to your Stimulus controller: `visible` and `invisible`.

## Reference

```javascript
useVisibility(controller, options)
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Default value&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
|-----------------------|-------------|---------------------|
| `dispatchEvent` | Whether to dispatch `visible`, `invisible` events or not. | `true` |
|`eventPrefix`| Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `application:visible` <br>- **someString** prefix the event with the given string `someString:invisible` <br>- **false** to remove prefix  |true|
| `debug` | Whether to log debug information. See [debug](debug.md) for more information on the debugging tools|false|

**Example :**

A typical use case would be to pause a video when the user navigate tabs.

```js
// video_controller.js

export default class extends Controller {
  connect() {
    useVisibility(this)
    this.player = new VideoPlayer()
  }

  visible() {
    this.player.play()
  }

  invisible() {
    this.player.pause()
  }
}
```

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useVisibility } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useVisibility(this)
  }

  visible() {
    // triggered when the page is visible
  }

  invisible() {
    // triggered when the page is invisible
  }
}
```

**Extending a controller**

```js
import { VisibilityController } from 'stimulus-use'

export default class extends VisibilityController {
  visible() {
    // triggered when the page is visible
  }

  invisible() {
    // triggered when the page is invisible
  }
}
```

## Events

This module adds two new events `visible` and `invisible` (prefixed by the controller identifier by default) event that you may use to triggers Stimulus actions

```html
<div class="player" data-controller="player" data-action="visible@document->player#play invisible@document->player#pause">
  ...
</div>
```

```js
// application_controller.js

export default class extends Controller {

  connect() {
    useVisibility(this, { eventPrefix: false })
  }
}
```
