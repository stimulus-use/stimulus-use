# useHover

Adds 2 new behaviors to your Stimulus controller : `mouseEnter` and `mouseLeave`.

## Reference

```javascript
useHover(controller, options = {})
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default&nbsp;value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|-----------------------|-------------|---------------------|
| `element` | The element which the controller will listen for hover on  | The controller element|
## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useHover } from 'stimulus-use'

export default class extends Controller {

  connect() {
    useHover(this, { element: this.element });
  }

  mouseEnter() {
    // ...
  }

  mouseLeave() {
    // ...
  }
}
```

**Extending a controller**

```js
import { HoverController } from 'stimulus-use'

export default class extends HoverController {

  mouseEnter() {
    // ...
  }

  mouseLeave() {
    // ...
  }
}
```



## Callbacks

This module adds two new callbacks `mouseEnter` and `mouseLeave` that you may use to triggers stimulus actions

For example to add an 'active' class when the user moves the mouse over an element: 

```js
import { Controller } from 'stimulus'
import { useHover } from 'stimulus-use'

export default class extends Controller {
  
  connect() {
    useHover(this, { element: this.element });
  }
  
  mouseEnter() {
    // ...
    this.element.classList.add('active')
  }

  mouseLeave() {
    // ...
    this.element.classList.remove('active')
  }
}
```

