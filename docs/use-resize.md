# useResize

Adds one new behavior to your Stimulus controller : `resize`

This behavior is built on top of the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).


## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useResize } from 'stimulus-use'

export default class extends Controller {

  connect() {
    useResize(this)
  }

  resize({ width }) {
    this.widthTarget.textContent = width
  }
}
```

**Extending a controller**

```js
import { ResizeController } from 'stimulus-use'

export default class extends ResizeController {
  resize({ width }) {
    this.widthTarget.textContent = width
  }
}
```

