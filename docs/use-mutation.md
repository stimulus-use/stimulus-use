# useMutation

`useMutation` tracks mutations that happen to your element, or its subtree, depending on how you configure it.

This controller is a convenience wrapper around [MutationObservers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). 

It adds one new behavior to your Stimulus controller: `mutate`, 
which receives an array of `MutationRecord`s every time the observed elements change according to the configuration.

## Reference

```javascript
useMutation(controller, options)
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

At a minimum, one of childList, attributes, and/or characterData must be true

See https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit

| Option| Description |&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Default value&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
|-----------------------|-------------|---------------------|
| `debug` | Whether to log debug information. See [debug](debug.md) for more information on the debugging tools|false|
| `dispatchEvent` | Whether to dispatch a `mutate` event or not.| `true` |
|`eventPrefix`| Whether to prefix or not the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `card:mutate` <br>- **someString** prefix the event with the given string `someString:mutate` <br>- **false** to remove prefix  |true|
| `element` | The element which the controller will listen for mutation on/under | The controller element|
| `subtree`| Set to true to extend monitoring to the entire subtree of nodes rooted at target. All of the other MutationObserverInit properties are then extended to all of the nodes in the subtree instead of applying solely to the target node. | false |
| `childList`| Set to true to monitor the target node (and, if subtree is true, its descendants) for the addition of new child nodes or removal of existing child nodes. | false |
| `attributes`| Set to true to watch for changes to the value of attributes on the node or nodes being monitored. | The default value is true if either of attributeFilter or attributeOldValue is specified, otherwise the default value is false.|
| `attributeFilter`| An array of specific attribute names to be monitored. If this property isn't included, changes to all attributes cause mutation notifications.
| `attributeOldValue`| Set to true to record the previous value of any attribute that changes when monitoring the node or nodes for attribute changes; see Monitoring attribute values in MutationObserver for details on watching for attribute changes and value recording. | false|
| `characterData`| Set to true to monitor the specified target node (and, if subtree is true, its descendants) for changes to the character data contained within the node or nodes. | The default value is true if characterDataOldValue is specified, otherwise the default value is false.|
| `characterDataOldValue`| Set to true to record the previous value of a node's text whenever the text changes on nodes being monitored. For details and an example, see Monitoring text content changes in MutationObserver. | false |

The `mutate` method defined on your controller will receive an array of type `MutationRecord`, 

See https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord for full usage instructions

You will need to loop over the `entries` to see all the mutations that happened and act on the ones you care about. 

```js
export default class extends Controller {
  connect() {
    useMutation(this, { attributes: true, childList: true, subtree: true })
  }

  mutate(entries) {
    for (const mutation of entries) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
      } else if (mutation.target === this.element) {
        console.log('The root element of this controller was modified.');
      } else if (mutation.type === 'attributes') {
        console.log('The ' + mutation.attributeName + ' attribute was modified.');
      }
    }
  }

}
```

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useMutation } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useMutation(this, { childList: true })
  }

  mutate(entries) {
    // triggered when the observed element is changed
  }
}
```

**Extending a controller**

```js
import { MutationController } from 'stimulus-use'

export default class extends MutationController {

  options = {
    childList: true
  }
  
  mutate(entries) {
    // triggered when the observed element is changed
  }

}
```

## Controlling observation

`useMutation()` returns an array with two functions, the first one is the `observe()` and the second one is the `unobserve()` function. You can use them to manually start and stop observing the element.

```js
import { Controller } from '@hotwired/stimulus'
import { useMutation } from 'stimulus-use'

export default class extends Controller {
  connect() {
    const [observe, unobserve] = useMutation(this, { childList: true })
    this.observe = observe
    this.unobserve = unobserve
  }

  mutate(entries) {
    // stop observing once the first mutation happened
    this.unobserve()
  }
}
```

When extending the `MutationController`, the `observe()` and `unobserve()` functions are exposed directly on the controller instance instead (e.g. `this.unobserve()`).

## Events

When `dispatchEvent` is enabled (the default), this module dispatches a `mutate` event (prefixed by the controller identifier by default, e.g. `modal:mutate`) every time a mutation occurs. The `event.detail` contains the `entries` array of `MutationRecord`s.

See [events](events.md) for more information on the event prefix behavior.

```html
<div data-controller="modal" data-action="modal:mutate->modal#mutate">
  ...
</div>
```

