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
| `debug` | Whether to log debug information. See [debug](debug.md) for more information on the debuging tools|false|
| `element` | The element which the controller will listen for hover on  | The controller element|
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
import { Controller } from 'stimulus'
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

