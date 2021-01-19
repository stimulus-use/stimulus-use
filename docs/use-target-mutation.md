# useTargetMutation

`useTargetMutation` tracks when targets are added and removed to your controller.

It adds three new behaviors to your Stimulus controller for each target you specify:

- `[target]TargetAdded`  triggered when targets get added to your controller, either by adding the target attribute to an existing element in the controller's scope, or by adding a new element with those attributes to the controller's scope.
- `[target]TargetRemoved` triggered when targets get removed from your controller, either by removing the target attribute from an existing element in the controller's scope, or by removing an existing element with those attributes to the controller's scope.
- `[target]TargetChanged` triggered when the contents of a target change, adding text/elements to its subtree.

`[target]TargetAdded`, `[target]TargetRemoved`, and  `[target]TargetChanged` only receive one parameter, the target node that was added, removed, or changed.

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

  locationTargetChanged(element) {
    console.log('A location was changed!')
  }

  contentTargetAdded(element) {
    console.log('A content target was added!')
  }

  contentTargetRemoved(element) {
    console.log('A content target was removed!')
  }

  contentTargetChanged(element) {
    console.log('A content target was changed!')
  }

  viewTargetAdded(element) {
    console.log('A view target was added!')
  }

  viewTargetRemoved(element) {
    console.log('A view target was removed!')
  }

  viewTargetChanged(element) {
    console.log('A view target was changed!')
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

  locationTargetChanged(element) {
    // triggered when a locationTarget is changed
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

  locationTargetChanged(element) {
    // triggered when a locationTarget is removed
  }

}
```
**Extending a controller with options **

```js
import { TargetMutationController } from 'stimulus-use'

export default class extends TargetMutationController {

  static targets = ["location", "view", "content"]
  static options = { targets: ["location"] }

  locationTargetAdded(element) {
    // triggered when a locationTarget is added
  }

  locationTargetRemoved(element) {
    // triggered when a locationTarget is removed
  }

  locationTargetChanged(element) {
    // triggered when a locationTarget is removed
  }

}
```
