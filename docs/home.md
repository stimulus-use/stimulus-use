<p align="center">
  <img src="assets/stimulus-use-logo.png" width="500" srcset="assets/stimulus-use-logo@2x.png 2x, assets/stimulus-use-logo@3x.png 3x" />
</p>

<p align="center">
  <b>A collection of composable behaviors for your Stimulus Controllers</b></br>
</p>

<br />

- **New lifecycle behaviors**: adds new standard behaviors to your Stimulus controllers.
- **Composable**: compose at will different behaviors in a single controller.
- **Modular**: built as ES6 modules, just import what you need and tree shaking will remove the rest.
- **Typscript**: Types available, better autocompletion.
- **Tiny**: 1k gzip
- **MIT Licensed**: free for personal and commercial use.

## Getting Started

npm
```bash
npm i stimulus-use
```

yarn
```bash
yarn add stimulus-use
```

## Modules and Controllers

Sets of controllers arround the `Observer APIs`
- **Observers**
  - [`useIntersection`, `IntersectionController`](./docs/use-intersection.md) &mdash; tracks the element's intersection and adds `appear`, `disapear` callbacks to your controller.
  - [`useResize`, `ResizeController`](./docs/use-resize.md) &mdash; tracks the element's size and adds a new lifecyle callback 'resized'.

- **Application**
  - [`useApplication, ApplicationController`](./docs/application-controller.md) &mdash; supercharged controller for your application.


## Extend or compose

Stimulus use can be used in two maners: extending or composing

**Extending**

You can create your stimulus from a pre-build Stimulus-use controller that offers the new behavior you are looking for. This method is perfectly suited when you only need a single behavior for your controller

```js
import { IntersectionController } from 'stimulus-use'

export default class extends IntersectionController {
  appear(entry) {
    // triggered when the element appears within the viewport
  }
}
```

**Composing**

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

  resized({ height, width }) {
    // trigered when the element is resized
  }
}
```



