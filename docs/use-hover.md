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
import { Controller } from '@hotwired/stimulus'
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

## Controlling observation

`useHover` returns an `[observe, unobserve]` tuple so you can start and stop observing manually. Observation starts automatically and is cleaned up when the controller disconnects. When extending `HoverController`, the same functions are available as `this.observe()` and `this.unobserve()`.

```js
import { Controller } from '@hotwired/stimulus'
import { useHover } from 'stimulus-use'

export default class extends Controller {
  connect() {
    const [observe, unobserve] = useHover(this, { element: this.element })
    this.observe = observe
    this.unobserve = unobserve
  }
}
```



## Callbacks

This module adds two new callbacks `mouseEnter` and `mouseLeave` that you may use to triggers stimulus actions

For example to add an 'active' class when the user moves the mouse over an element: 

```js
import { Controller } from '@hotwired/stimulus'
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

## Events

In addition to the callbacks, this module dispatches two events, `mouseEnter` and `mouseLeave` (prefixed by the controller identifier by default), that you may use to trigger Stimulus actions. See [Events](events.md) for more information on event names and prefixes.

```html
<div data-controller="card" data-action="card:mouseEnter->card#highlight card:mouseLeave->card#reset">
  ...
</div>
```

