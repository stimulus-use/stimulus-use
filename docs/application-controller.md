# useApplication

This is a supercharged Stimulus Controller. You can extend all of your Stimulus controllers from this one and access a few handy functions everywhere.

## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useApplication } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useApplication(this)
  }
}
```

**Extending a controller**

```js
// greet_controller.js
import { ApplicationController } from 'stimulus-use'

export default class extends ApplicationController {

  connect() {
    this.isPreview // true/false if it is a Turbolinks preview
    this.dispatch("hello") // helper to dispatch a custom event "greet:hello" to other Stimulus controllers
  }
}
```

## Functions

**`dispatch(name, eventArgs)`**: helper function to dispatch events to other Stimulus controllers

**`metaValue(name)`**: return the value of a meta attribute

**Getters**

**`isPreview`**: return true/false whether the current page is a Turbolinks preview. [Use case for playing animations with Turbolinks](https://dev.to/adrienpoly/animations-with-turbolinks-and-stimulus-4862)

**`csrfToken`**: return the csrf token if any


## Example building a cart counter with the dispatch helper

The HTML markup. See the custom event `item:add` that the cart controller is listening to

```html
<div data-controller="cart"
     data-action="item:add->cart#refreshTotal"
     data-cart-counter="0">

  <button data-controller="item" data-action="item#add">
    Add
  </button>

  <div>
    <span>No of items : </span>
    <span data-target="cart.counterView">0</span>
  </div>
</div>
```

The item controller dispatching the event

```js
//item_controller.js
import { ApplicationController } from 'stimulus-use'

export default class extends ApplicationController {
  add() {
    this.dispatch('add', { detail: { quantity: 1 } })
  }
}
```

The cart controller receiving the event

```js
//cart_controller.js
import { ApplicationController } from 'stimulus-use'

export default class extends ApplicationController {
  static targets = ['counterView']

  refreshTotal(e) {
    this.counter += e.detail.quantity
    console.log(e.detail.controller) // the emitting item_controller
  }

  renderCounter() {
    this.counterViewTarget.textContent = this.counter
  }

  set counter(value) {
    this.data.set('counter', value)
    this.renderCounter()
  }

  get counter() {
    return parseInt(this.data.get('counter'))
  }
}
```
