# useTargetMutation

`useTargetMutation` tracks when targets are added and removed to your controller.

It adds two new behaviors to your Stimulus controller for each target you specify: `[target]TargetAdded` and `[target]TargetRemoved`, which will get triggered when targets get added to your
controller, either by adding the `data-[controller]-target="[target]"`/`data-target="[controller].[target]"` to an existing element in the controller's scope, or by adding a new element with those
attributes to the controller's scope.

`[target]TargetAdded` and `[target]TargetRemoved` only receive one parameter, the target node that was added or removed.

## Reference

```javascript
useTargetMutation(controller, options)
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Default value&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
|-----------------------|-------------|---------------------|
| `debug` | Whether to log debug information. See [debug](debug.md) for more information on the debugging tools| false|
| `targets` | An array of target names to track for mutations | all targets |

```js
export default class extends Controller {

  static targets = ["location", "content", "view"]

  connect() {
    useTargetMutation(this)
  }

  locationTargetAdded(element) {
    console.log('A new location was added!')
  }

  locationTargetRemoved(element) {
    console.log('A location was removed!')
  }
  
  contentTargetAdded(element) {
    console.log('A content target was added!')
  }

  contentTargetRemoved(element) {
    console.log('A content target was removed!')
  }
  
  viewTargetAdded(element) {
    console.log('A view target was added!')
  }

  viewTargetRemoved(element) {
    console.log('A view target was removed!')
  }

}
```

## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useTargetMutation } from 'stimulus-use'

export default class extends Controller {

  static targets = ["location", "content", "view"];

  connect() {
    useTargetMutation(this, { targets: ["location"] }) // only track mutations of "location" target
  }

  locationTargetAdded(element) {
    // triggered when a locationTarget is added
  }

  locationTargetRemoved(element) {
    // triggered when a locationTarget is removed
  }
}
```


**Extending a controller**

```js
import { TargetMutationController } from 'stimulus-use'

export default class extends TargetMutationController {

  static targets = ["location"]

  locationTargetAdded(element) {
    // triggered when a locationTarget is added
  }

  locationTargetRemoved(element) {
    // triggered when a locationTarget is removed
  }

}
```
