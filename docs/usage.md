## Usage

Stimulus-use can be used in two manners: extending or composing

#### Extending

You can create your stimulus from a pre-build Stimulus-use controller that offers the new behavior you are looking for. This method is perfectly suited when you only need a single behavior for your controller

```js
import { IntersectionController } from 'stimulus-use'

export default class extends IntersectionController {
  appear(entry) {
    // triggered when the element appears within the viewport
  }
}
```

#### Composing

When you need multiple behaviors or you are already extending your controller from another one. You can easily add new behavior with the `use` functions.

```js
import { Controller } from 'stimulus'
import { useIntersection, useResize } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIntersection(this)
    useResize(this)
  }

  appear(entry) {
    // triggered when the element appears within the viewport
  }

  resize({ height, width }) {
    // trigered when the element is resized
  }
}
```