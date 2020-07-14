# useClickOutside

Adds one new behavior to your Stimulus controller : `clickOutside`


## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useClickOutside } from 'stimulus-use'

export default class extends Controller {

  connect() {
    useClickOutside(this)
  }

  clickOutside(event) {
    // example to close a modal
    event.preventDefault()
    this.modal.close()
  }
}
```

**Extending a controller**

```js
import { ClickOutsideController } from 'stimulus-use'

export default class extends ClickOutsideController {
  clickOutside(event) {
    // example to close a modal
    event.preventDefault()
    this.modal.close()
  }
}
```
