# useDispatch

Adds a `dispatch` helper function to emit custom events. Useful to communicate between different controllers.

## Reference

#### Mixin

```js
useDispatch(controller, options = {})
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Default value&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
|-----------------------|-------------|---------------------|
| `element` | The element the event will be emitted from.| The controller element|
| `eventPrefix` | Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `item:add` <br>- **someString** prefix the event with the given string `someString:add` <br>- **false** to remove prefix  |true|
| `bubbles` | Whether the event should bubble.| true|
| `cancelable` | Whether the event is cancelable.| true|



#### The dispatch function
Once the useDispatch mixin is applied, your controller has a new `this.dispatch` function available you may use to emit custom events.

```js
dispatch(eventName, detail = {})
```
| Param| Description |
|-----------------------|-------------|
| `eventName` | a mandatory string for the name of the event to emit.|
| `detail` | A payload object that will be passed to throught the event and available for the receiver with `event.detail` |

## Usage

```js
// item_controller.js
import { Controller } from 'stimulus'
import { useDispatch } from 'stimulus-use'

export default class extends Controller {
  connect() {
    usedispatch(this)
  }

  add() {
    // dispatch a custom event item:add
    this.dispatch("add")
  }
}
```

## Bubbling events

The emitted event sent by the `dispatch` function will bubble up the tree of the DOM.
Therefore all parent elements can listen to it directly.

```html
<div data-controller="reciever" data-action="emitter:add->reciever#update">
  <div data-controller="emitter" data-action="click->emitter#add" ></div>
</div>
```

If both are at the same level or if the reciever controller is even nested within the controller, you should listen to event with @window to catch it.

```html
<div data-controller="reciever" data-action="emitter:add@window->reciever#update"></div>
<div data-controller="emitter" data-action="click->emitter#add" ></div>
```

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
import { useDispatch } from 'stimulus-use'

export default class extends Controller {
  connect() {
    usedispatch(this)
  }

  add() {
    this.dispatch('add', { quantity: 1 })
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
    return this.data.get('counter')
  }
}
```
